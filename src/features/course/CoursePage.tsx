import {
  BookOpen,
  CheckCircle,
  Lock,
  Send,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Award,
  AlertTriangle,
  Play,
  RotateCcw,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Bookmark
} from "lucide-react";
import { courseModules } from "./courseData";
import { renderMarkdown } from "./utils/markdownUtils";
import { useCourse } from "./hooks/useCourse";
import { Link } from "react-router-dom";

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function CoursePage() {
  const {
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
  } = useCourse();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-850 flex flex-col font-sans selection:bg-[#3966bf]/20 selection:text-slate-900">
      {/* ============================================
          TOP HEADER
          ============================================ */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 py-3.5 flex justify-between items-center transition-all shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/courses"
            className="flex items-center gap-1 p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors text-xs font-semibold"
            title="Kembali ke Katalog Kursus"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline ml-0.5">Katalog</span>
          </Link>

          <span className="text-slate-200 hidden sm:inline">|</span>

          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
            title="Tampilkan Silabus"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>

          {isSidebarCollapsed && (
            <button
              onClick={() => {
                setIsSidebarCollapsed(false);
                localStorage.setItem("himti_sidebar_collapsed", "false");
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#3966bf]/10 hover:bg-[#3966bf]/20 border border-[#3966bf]/20 text-[#3966bf] hover:text-[#3966bf]/80 rounded-xl transition-all"
              title="Tampilkan Silabus"
            >
              <PanelLeftOpen className="w-4 h-4" />
              <span className="text-xs font-semibold">Tampilkan Silabus</span>
            </button>
          )}

          <div>
            <h1 className="text-md md:text-lg font-bold text-slate-900 tracking-tight">Fundamental JavaScript</h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Web Development Course</p>
          </div>
        </div>

        {/* Course Progress Panel */}
        <div className="hidden lg:flex items-center gap-4 bg-slate-50/80 backdrop-blur-md border border-slate-200/80 py-1.5 px-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-gradient-to-tr from-[#3966bf]/10 to-[#fda802]/10 border border-[#3966bf]/15 text-[#3966bf]">
              <Award className="w-4 h-4 text-[#3966bf]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider leading-none mb-1">Progres Kelas</span>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-28 bg-slate-250/80 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#3966bf] to-[#fda802] h-full rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
                <span className="text-xs font-black text-slate-800">{progressPercent}%</span>
              </div>
            </div>
          </div>
          <span className="text-slate-200 font-normal">|</span>
          <div className="text-xs font-bold text-slate-600 flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider leading-none mb-1">Status</span>
            <div className="mt-0.5">
              <span className="text-emerald-600 font-black">{Object.keys(completedModules).length}</span>
              <span className="text-slate-400 font-semibold">/{totalModules} Modul</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-xl transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Progres</span>
          </button>

          <button
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ============================================
          MAIN WRAPPER LAYOUT
          ============================================ */}
      <div className="flex-1 flex relative">

        {/* ============================================
            LEFT PANEL: MODULE LIST SIDEBAR
            ============================================ */}
        {/* Backdrop for mobile */}
        {leftSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-all"
            onClick={() => setLeftSidebarOpen(false)}
          />
        )}
        <aside className={`fixed md:sticky top-[69px] bottom-0 left-0 bg-white border-r border-slate-200 p-5 flex flex-col gap-4 z-40 md:z-10 transition-all duration-300 transform ${isSidebarCollapsed
            ? "md:w-0 md:p-0 md:border-r-0 md:overflow-hidden md:translate-x-0"
            : "w-80"
          } ${leftSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}>
          <div className="flex justify-between items-center md:mb-1">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">Silabus Modul</h2>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-[#3966bf]/10 border border-[#3966bf]/25 rounded-full text-[10px] font-black text-[#3966bf] uppercase">
                {unlockedModules.length} / {totalModules} Terbuka
              </span>
              <button
                className="hidden md:flex p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
                onClick={() => {
                  setIsSidebarCollapsed(true);
                  localStorage.setItem("himti_sidebar_collapsed", "true");
                }}
                title="Sembunyikan Silabus"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
              <button className="md:hidden text-slate-400 hover:text-slate-600" onClick={() => setLeftSidebarOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Syllabus Items */}
          <div className="space-y-2 flex-1 overflow-y-auto pr-1">
            {courseModules.map((module, index) => {
              const isUnlocked = unlockedModules.includes(module.id);
              const isCompleted = !!completedModules[module.id];
              const isActive = index === activeModuleIndex;

              return (
                <button
                  key={module.id}
                  disabled={!isUnlocked}
                  onClick={() => {
                    setActiveModuleIndex(index);
                    setEvalResult(null);
                    setLeftSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 ${isActive
                      ? "bg-[#3966bf]/5 border-[#3966bf] text-[#3966bf] font-bold shadow-md shadow-[#3966bf]/5"
                      : isUnlocked
                        ? "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                        : "bg-slate-100/50 border-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      {isCompleted ? (
                        <div className="p-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        </div>
                      ) : isActive ? (
                        <div className="p-1 rounded-lg bg-[#3966bf]/10 border border-[#3966bf]/25 text-[#3966bf] animate-pulse">
                          <BookOpen className="w-4 h-4 text-[#3966bf] animate-pulse" />
                        </div>
                      ) : isUnlocked ? (
                        <div className="p-1 rounded-lg bg-slate-100 border border-slate-200">
                          <Play className="w-4 h-4 text-slate-500" />
                        </div>
                      ) : (
                        <div className="p-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-300">
                          <Lock className="w-4 h-4 text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#3966bf] uppercase tracking-wide block">Modul 0{module.order}</span>
                      <span className="text-sm font-semibold leading-snug line-clamp-2 mt-0.5">{module.title.replace(/^Modul \d+:\s*/i, "")}</span>
                    </div>
                  </div>
                  {isCompleted && (
                    <span className="text-[10px] font-black px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-md flex-shrink-0 self-start mt-0.5">
                      {completedModules[module.id].score}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* ============================================
            CENTER CONTENT: MODULE MAIN ARTICLE
            ============================================ */}
        <main ref={mainScrollRef} className="flex-1 flex flex-col items-center px-4 md:px-8 py-8 overflow-y-auto max-w-5xl mx-auto w-full transition-all">

          <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 md:p-10 flex-grow shadow-sm flex flex-col gap-6">

            {/* Navigation top bar */}
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 mb-6">
              <div>
                <span className="px-2.5 py-1 bg-[#3966bf]/10 border border-[#3966bf]/25 text-[#3966bf] font-extrabold rounded-lg text-xs tracking-wider uppercase">
                  Modul 0{activeModule.order}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight select-text mt-1">{activeModule.title}</h2>
            </div>

            {/* Render Markdown Content Dynamically */}
            <article ref={contentRef} className="prose prose-slate max-w-none prose-h1:hidden text-slate-700 selection:bg-[#3966bf]/20">
              {renderMarkdown(activeModule.markdown)}
            </article>

            {/* Navigation Prev & Next Modules */}
            <div className="flex justify-between items-center border-t border-slate-200 pt-8 mt-12 gap-4 flex-wrap">
              <button
                onClick={handlePrevModule}
                disabled={activeModuleIndex === 0}
                className="flex items-center gap-2 text-xs md:text-sm font-semibold px-4 py-2.5 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-xl transition-all disabled:opacity-20 disabled:pointer-events-none shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Sebelumnya
              </button>

              <button
                onClick={handleNextModule}
                disabled={activeModuleIndex === courseModules.length - 1 || !unlockedModules.includes(courseModules[activeModuleIndex + 1]?.id)}
                className="flex items-center gap-2 text-xs md:text-sm font-semibold px-5 py-2.5 bg-[#3966bf] hover:bg-[#3966bf]/90 text-white rounded-xl transition-all disabled:opacity-25 disabled:pointer-events-none shadow-md shadow-[#3966bf]/10"
              >
                Selanjutnya <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ============================================
              AI EVALUATOR INTERACTIVE PANEL
              ============================================ */}
          <section className="mt-8 w-full bg-white border border-slate-200 rounded-3xl p-5 md:p-10 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3966bf] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3966bf]"></span>
              </span>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">Evaluasi Mandiri (AI Evaluator)</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-6">
              Jawab tantangan kode di bawah ini untuk memvalidasi tingkat pemahaman Anda. Jawaban dikaji secara dinamis berdasarkan parameter penilaian dosen. Nilai ambang batas kelulusan adalah <strong className="text-[#3966bf] font-bold">75</strong> untuk membuka modul pelajaran berikutnya.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Pertanyaan Evaluasi</span>
              <p className="text-slate-800 font-semibold leading-relaxed text-sm md:text-base">{activeModule.question}</p>
            </div>

            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs text-slate-500 font-semibold uppercase tracking-wider">Jawaban JavaScript Anda</span>
                </label>
                <textarea
                  className="textarea textarea-bordered bg-slate-50 border-slate-200 focus:border-[#3966bf] focus:outline-none w-full min-h-[160px] font-mono text-sm leading-relaxed text-slate-850 rounded-2xl p-4 shadow-sm"
                  placeholder="Masukkan block kode JS atau teks jawaban..."
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  disabled={isLoading}
                ></textarea>
              </div>

              <div className="flex justify-between items-center gap-4 flex-wrap">
                <div className="text-xs text-slate-600 max-w-md leading-normal">
                  <strong className="text-slate-500 font-semibold">Parameter Kelulusan:</strong> {activeModule.criteria}
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 text-xs md:text-sm font-bold px-6 py-3 bg-gradient-to-r from-[#3966bf] to-[#3966bf]/90 hover:from-[#3966bf]/90 hover:to-[#3966bf]/80 text-white rounded-2xl transition-all shadow-md active:scale-95 disabled:pointer-events-none disabled:opacity-40"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> <span>Mengoreksi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> <span>Kirim Jawaban</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* AI Evaluator Output Result */}
            {evalResult && (
              <div className={`mt-6 p-5 rounded-2xl border transition-all duration-300 ${evalResult.isPassed
                  ? "bg-emerald-50 border-emerald-250 text-emerald-800"
                  : "bg-rose-50 border-rose-250 text-rose-800"
                }`}>
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${evalResult.isPassed ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                      }`}>
                      {evalResult.isPassed ? "LULUS" : "TIDAK LULUS"}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">Hasil Koreksi HIMTI AI</h4>
                  </div>
                  <div className="text-lg md:text-xl font-black">
                    Nilai: <span className={evalResult.isPassed ? "text-emerald-600" : "text-rose-600"}>{evalResult.score}</span>
                  </div>
                </div>
                <div className="prose prose-slate max-w-none text-xs md:text-sm leading-relaxed text-slate-800 selection:bg-[#3966bf]/20">
                  {renderMarkdown(evalResult.feedback)}
                </div>
              </div>
            )}
          </section>
        </main>

        {/* ============================================
            RIGHT PANEL: TABLE OF CONTENTS (TOC)
            ============================================ */}
        {/* Backdrop for mobile */}
        {rightSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-all"
            onClick={() => setRightSidebarOpen(false)}
          />
        )}
        <aside className={`fixed lg:sticky top-[69px] bottom-0 right-0 w-72 bg-white border-l border-slate-200 p-6 flex flex-col gap-5 z-40 lg:z-10 transition-all duration-300 transform ${rightSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}>
          <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Daftar Isi Modul</h2>
            <button className="lg:hidden text-slate-400 hover:text-slate-600" onClick={() => setRightSidebarOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 pr-1 py-1">
            {tocList.length === 0 ? (
              <p className="text-xs text-slate-400 italic mt-2 select-none">Tidak ada sub-materi di halaman ini.</p>
            ) : (
              tocList.map((item, idx) => {
                const isActive = activeTOC === item.anchor;
                return (
                  <a
                    key={idx}
                    href={`#${item.anchor}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setRightSidebarOpen(false);
                      const target = document.getElementById(item.anchor);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className={`block py-2 px-3 transition-all text-xs border-l-2 leading-relaxed rounded-r-lg ${item.level === 3 ? "ml-4" : ""
                      } ${isActive
                        ? "border-[#3966bf] bg-[#3966bf]/5 text-[#3966bf] font-bold shadow-sm shadow-[#3966bf]/5"
                        : "border-slate-100 hover:border-slate-350 hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                      }`}
                  >
                    {item.text}
                  </a>
                );
              })
            )}
          </div>

          {/* Module Completion Status Badge */}
          <div className="mt-auto border-t border-slate-150 pt-4 flex flex-col gap-2.5 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold">Status Modul:</span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                completedModules[activeModule.id] 
                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" 
                  : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
              }`}>
                {completedModules[activeModule.id] ? "Selesai" : "Belum Selesai"}
              </span>
            </div>
            {completedModules[activeModule.id] && (
              <div className="text-xs flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Skor Evaluasi:</span>
                <span className="font-black text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded-md text-[11px]">
                  {completedModules[activeModule.id].score}
                </span>
              </div>
            )}
          </div>
         </aside>
      </div>

      {/* Reset Progress Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setShowResetModal(false)}
          />
          
          {/* Modal Content */}
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl relative z-10 transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Ulangi Progres Belajar?</h3>
                <p className="text-xs text-slate-500 font-medium">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Apakah Anda yakin ingin mengulang progres belajar dari awal? Semua modul yang telah terbuka dan nilai evaluasi yang sudah diselesaikan akan dihapus secara permanen.
            </p>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleResetProgress}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-200"
              >
                Ya, Reset Progres
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
