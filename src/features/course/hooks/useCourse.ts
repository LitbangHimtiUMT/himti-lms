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

export function useCourse() {
  const { courseId = "javascript" } = useParams<{ courseId: string }>();
  
  const courseInfo = coursesCatalogData[courseId] || coursesCatalogData.javascript;
  const courseModules = courseInfo.modules;

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
  const tocList = extractTOC(activeModule.markdown);
  const contentRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLElement>(null);

  const unlockedKey = `himti_unlocked_${courseId}`;
  const completedKey = `himti_completed_${courseId}`;

  // Load progress from localStorage on mount or when courseId changes
  useEffect(() => {
    const savedUnlocked = localStorage.getItem(unlockedKey);
    const savedCompleted = localStorage.getItem(completedKey);

    if (savedUnlocked) {
      setUnlockedModules(JSON.parse(savedUnlocked));
    } else {
      setUnlockedModules(["modul-1"]);
    }
    if (savedCompleted) {
      setCompletedModules(JSON.parse(savedCompleted));
    } else {
      setCompletedModules({});
    }
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
  const progressPercent = Math.round((unlockedModules.length / totalModules) * 100);

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
    progressPercent,
    showResetModal,
    setShowResetModal,
    courseInfo,
    courseModules,
  };
}
