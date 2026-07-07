import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { courseModules } from "../courseData";
import { extractTOC } from "../utils/markdownUtils";
import { API_ENDPOINT } from "../../../core/configs/app";

export function useCourse() {
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

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedUnlocked = localStorage.getItem("himti_unlocked_modules");
    const savedCompleted = localStorage.getItem("himti_completed_modules");

    if (savedUnlocked) {
      setUnlockedModules(JSON.parse(savedUnlocked));
    }
    if (savedCompleted) {
      setCompletedModules(JSON.parse(savedCompleted));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  const saveProgress = (newUnlocked: string[], newCompleted: typeof completedModules) => {
    localStorage.setItem("himti_unlocked_modules", JSON.stringify(newUnlocked));
    localStorage.setItem("himti_completed_modules", JSON.stringify(newCompleted));
    setUnlockedModules(newUnlocked);
    setCompletedModules(newCompleted);
  };

  // Set default placeholder answer when module changes
  useEffect(() => {
    setStudentAnswer("");
    setEvalResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      const response = await fetch(API_ENDPOINT.courseEvaluate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errMsg = "Gagal menghubungi server";
        try {
          const errData = await response.json();
          if (errData && errData.message) {
            errMsg = errData.message;
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      handleEvaluationSuccess({
        score: data.score,
        feedback: data.feedback,
        isPassed: data.isPassed
      });

    } catch (err: any) {
      console.error("Backend API error during evaluation:", err);
      setIsLoading(false);
      
      let displayMessage = "Gagal terhubung ke API Back-End. Pastikan server backend Anda berjalan!";
      
      if (err.message && err.message !== "Gagal menghubungi server" && err.message !== "Failed to fetch") {
        const msg = err.message.toLowerCase();
        if (msg.includes("evaluation error") || msg.includes("bad control character") || msg.includes("json")) {
          displayMessage = "Terjadi kesalahan format saat AI memproses evaluasi. Silakan coba kirim ulang jawaban Anda.";
        } else if (msg.includes("replicate api token") || msg.includes("not configured")) {
          displayMessage = "Layanan evaluasi AI belum dikonfigurasi di server backend (Token API tidak ditemukan).";
        } else if (msg.includes("replicate prediction failed") || msg.includes("failed to get output")) {
          displayMessage = "Gagal mendapatkan respons evaluasi dari model AI. Silakan coba beberapa saat lagi.";
        } else {
          displayMessage = `Evaluasi gagal: ${err.message}`;
        }
      }
      
      toast.error(displayMessage);
    }
  };

  const handleResetProgress = () => {
    localStorage.removeItem("himti_unlocked_modules");
    localStorage.removeItem("himti_completed_modules");
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
  };
}
