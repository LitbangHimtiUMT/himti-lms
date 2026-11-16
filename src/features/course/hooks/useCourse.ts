import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { coursesCatalogData } from "../courseData";
import { extractTOC } from "../utils/markdownUtils";
import { API_ENDPOINT } from "../../../core/configs/app";
import { request } from "../../../core/libs/api/config";

interface CourseEvaluationResult {
  score: number;
  feedback: string;
  isPassed: boolean;
}

// Progress readers: localStorage values are untrusted input (hand-edited,
// written by another version, or corrupted). A bad value falls back to
// fresh progress and never throws: there is no error boundary, so a throw
// here whitescreens the whole page. Entries that fail shape validation
// are dropped; valid ones are kept, mirroring the defensive reader in
// CourseCatalogPage.
const readUnlockedModules = (key: string): string[] => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return ["modul-1"];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return ["modul-1"];
    const ids = parsed.filter((item): item is string => typeof item === "string");
    return ids.length > 0 ? ids : ["modul-1"];
  } catch {
    return ["modul-1"];
  }
};

const readCompletedModules = (
  key: string
): Record<string, { score: number; feedback: string }> => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const valid: Record<string, { score: number; feedback: string }> = {};
    for (const [moduleId, entry] of Object.entries(parsed)) {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
      const { score, feedback } = entry as { score?: unknown; feedback?: unknown };
      if (typeof score !== "number" || !Number.isFinite(score)) continue;
      if (typeof feedback !== "string") continue;
      valid[moduleId] = { score, feedback };
    }
    return valid;
  } catch {
    return {};
  }
};

// The evaluation endpoint returns the AI model's parsed JSON verbatim,
// with no shape validation server-side. A malformed 200 (missing or
// mistyped fields) must fail the evaluation like any other error —
// never reach the render path, where a non-string feedback or a
// non-number score crashes the page.
const isEvaluationResult = (data: unknown): data is CourseEvaluationResult => {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  const { score, feedback, isPassed } = data as {
    score?: unknown;
    feedback?: unknown;
    isPassed?: unknown;
  };
  return (
    typeof score === "number" &&
    Number.isFinite(score) &&
    typeof feedback === "string" &&
    typeof isPassed === "boolean"
  );
};

export function useCourse() {
  const { courseId } = useParams<{ courseId: string }>();

  // An unknown courseId used to silently load the JavaScript course while
  // storing progress under the bogus id. Surface it instead: the page
  // renders NotFound when there is no such course.
  const courseInfo = courseId ? coursesCatalogData[courseId] : undefined;
  const courseModules = courseInfo?.modules ?? [];

  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [unlockedModules, setUnlockedModules] = useState<string[]>(["modul-1"]);
  const [completedModules, setCompletedModules] = useState<Record<string, { score: number; feedback: string }>>({});
  const [studentAnswer, setStudentAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [evalResult, setEvalResult] = useState<{ score: number; feedback: string; isPassed: boolean } | null>(null);

  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  // Responsive sidebar toggles
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState<boolean>(false);
  const [activeTOC, setActiveTOC] = useState<string>("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem("himti_sidebar_collapsed") === "true";
  });

  const activeModule = courseModules[activeModuleIndex];
  const tocList = extractTOC(activeModule?.markdown ?? "");
  const contentRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLElement>(null);

  const unlockedKey = `himti_unlocked_${courseId}`;
  const completedKey = `himti_completed_${courseId}`;

  // Load progress from localStorage on mount or when courseId changes
  useEffect(() => {
    setUnlockedModules(readUnlockedModules(unlockedKey));
    setCompletedModules(readCompletedModules(completedKey));
    setActiveModuleIndex(0);
    setEvalResult(null);
  }, [courseId, unlockedKey, completedKey]);

  // Save progress to localStorage whenever it changes
  const saveProgress = (newUnlocked: string[], newCompleted: typeof completedModules) => {
    localStorage.setItem(unlockedKey, JSON.stringify(newUnlocked));
    localStorage.setItem(completedKey, JSON.stringify(newCompleted));
    setUnlockedModules(newUnlocked);
    setCompletedModules(newCompleted);
  };

  // Set default placeholder answer when module changes
  useEffect(() => {
    setStudentAnswer("");
    setEvalResult(null);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0 });
    }
  }, [activeModuleIndex, activeModule]);

  // TOC active scroll highlight listener
  useEffect(() => {
    const mainEl = mainScrollRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      const headings = mainEl.querySelectorAll("h2, h3");
      let currentActive = "";
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top < 200) {
          currentActive = heading.id;
        }
      });
      setActiveTOC(currentActive);
    };

    mainEl.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, [activeModuleIndex]);

  const handleNextModule = () => {
    if (activeModuleIndex < courseModules.length - 1) {
      const nextId = courseModules[activeModuleIndex + 1].id;
      if (unlockedModules.includes(nextId)) {
        setActiveModuleIndex(activeModuleIndex + 1);
      } else {
        toast.warning("Modul berikutnya masih terkunci! Selesaikan evaluasi modul ini dahulu.");
      }
    }
  };

  const handlePrevModule = () => {
    if (activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
    }
  };

  const handleEvaluationSuccess = ({ score, feedback, isPassed }: { score: number; feedback: string; isPassed: boolean }) => {
    setIsLoading(false);
    setEvalResult({ score, feedback, isPassed });

    if (isPassed) {
      toast.success(`Selamat! Nilai Anda ${score}. Modul berikutnya terbuka! 🎉`);
      setStudentAnswer("");

      const newCompleted = {
        ...completedModules,
        [activeModule.id]: { score, feedback }
      };

      const nextIndex = activeModuleIndex + 1;
      let newUnlocked = [...unlockedModules];
      if (nextIndex < courseModules.length) {
        const nextModuleId = courseModules[nextIndex].id;
        if (!newUnlocked.includes(nextModuleId)) {
          newUnlocked.push(nextModuleId);
        }
      }

      saveProgress(newUnlocked, newCompleted);
    } else {
      toast.error(`Nilai Anda ${score}. Butuh minimal 75 untuk membuka modul berikutnya. Coba lagi! 💪`);
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModule) return;
    if (!studentAnswer.trim()) {
      toast.error("Tolong tulis jawaban Anda terlebih dahulu!");
      return;
    }

    setIsLoading(true);
    setEvalResult(null);

    const payload = {
      moduleId: activeModule.id,
      moduleTitle: activeModule.title,
      question: activeModule.question,
      criteria: activeModule.criteria,
      answer: studentAnswer.trim()
    };

    try {
      const data = await request.post<CourseEvaluationResult>(
        API_ENDPOINT.courseEvaluate
      )(payload);

      if (!isEvaluationResult(data)) {
        throw new Error("Evaluation returned an unexpected response shape");
      }

      handleEvaluationSuccess({
        score: data.score,
        feedback: data.feedback,
        isPassed: data.isPassed
      });

    } catch (err: any) {
      console.error("Backend API error during evaluation:", err);
      setIsLoading(false);

      toast.error("Evaluasi gagal. Silakan coba lagi.");
    }
  };

  const handleResetProgress = () => {
    localStorage.removeItem(unlockedKey);
    localStorage.removeItem(completedKey);
    setUnlockedModules(["modul-1"]);
    setCompletedModules({});
    setActiveModuleIndex(0);
    setEvalResult(null);
    setShowResetModal(false);
    toast.info("Progres belajar berhasil di-reset.");
  };

  const totalModules = courseModules.length;
  const completedCount = Object.keys(completedModules).length;
  const progressPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return {
    activeModuleIndex,
    setActiveModuleIndex,
    unlockedModules,
    completedModules,
    studentAnswer,
    setStudentAnswer,
    isLoading,
    evalResult,
    setEvalResult,
    leftSidebarOpen,
    setLeftSidebarOpen,
    rightSidebarOpen,
    setRightSidebarOpen,
    activeTOC,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    activeModule,
    tocList,
    contentRef,
    mainScrollRef,
    handleNextModule,
    handlePrevModule,
    handleSubmitAnswer,
    handleResetProgress,
    totalModules,
    completedCount,
    progressPercent,
    showResetModal,
    setShowResetModal,
    courseInfo,
    courseModules,
  };
}
