import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Search, Lock, ChevronRight, BookOpen, Layers, Zap } from "lucide-react";
import { CONFIG_APP } from "../../core/configs/app";
import {
  courseCatalog,
  CATEGORY_LABELS,
  type CourseCategory,
  type CourseCatalogItem,
} from "./catalogData";

// ============================================
// LEVEL BADGE COLOR
// ============================================
const LEVEL_COLORS = {
  Pemula: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Menengah: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Lanjutan: "bg-rose-500/10 text-rose-600 border-rose-500/20",
};

const CATEGORY_COLORS: Record<string, string> = {
  "web-dev": "bg-[#3966bf]/10 text-[#3966bf] border-[#3966bf]/20",
  "mobile-dev": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  cybersecurity: "bg-red-500/10 text-red-600 border-red-500/20",
  networking: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  "ui-ux": "bg-pink-500/10 text-pink-600 border-pink-500/20",
};

// ============================================
// COURSE CARD COMPONENT
// ============================================
const CourseCard = ({ course }: { course: CourseCatalogItem }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!course.isAvailable) return;
    const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
    if (!token) {
      toast.warning("Kamu harus login terlebih dahulu untuk mengakses materi mandiri ini!");
      navigate(`/sign-in?return=${encodeURIComponent(course.path)}`);
      return;
    }
    navigate(course.path);
  };

  return (
    <div
      className={`group relative bg-white border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col ${course.isAvailable
          ? "border-slate-200 hover:border-[#3966bf]/40 hover:shadow-lg hover:shadow-[#3966bf]/5 cursor-pointer"
          : "border-slate-200 opacity-60 cursor-not-allowed"
        }`}
      onClick={handleClick}
    >
      {/* Thumbnail Image Header */}
      <div className="relative h-40 overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${course.isAvailable ? "group-hover:scale-105" : "grayscale"
            }`}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Coming Soon badge */}
        {!course.isAvailable && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-800/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
            <Lock className="w-2.5 h-2.5" />
            Segera Hadir
          </div>
        )}

        {/* Live badge for available courses */}
        {course.isAvailable && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Tersedia
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Category + Level */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[course.category]
              }`}
          >
            {course.categoryLabel}
          </span>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${LEVEL_COLORS[course.level]
              }`}
          >
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-black text-slate-900 leading-snug line-clamp-2 group-hover:text-[#3966bf] transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {course.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold pt-1 border-t border-slate-100 mt-auto">
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            {course.moduleCount} Modul
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            AI Evaluator
          </span>
        </div>
  
        {/* CTA Button */}
        {course.isAvailable && (
          <button className="w-full mt-1 flex items-center justify-center gap-2 text-xs font-bold py-2.5 bg-gradient-to-r from-[#3966bf] to-[#3966bf]/90 group-hover:from-[#f1c857]/90 group-hover:to-[#2b6394] text-white rounded-2xl transition-all duration-300 shadow-md shadow-[#3966bf]/15 active:scale-95">
            <Zap className="w-3.5 h-3.5" />
            Mulai Belajar
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================
// MAIN CATALOG PAGE
// ============================================
export default function CourseCatalogPage() {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = Object.entries(CATEGORY_LABELS) as [CourseCategory, string][];

  const filtered = courseCatalog.filter((c) => {
    const matchCategory = activeCategory === "all" || c.category === activeCategory;
    const matchSearch =
      searchQuery.trim() === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const availableCount = courseCatalog.filter((c) => c.isAvailable).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        {/* Unsplash Background Image with low opacity for light theme */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06] pointer-events-none"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop')" 
          }}
        />
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-[#3966bf]/8 to-[#fda802]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-[300px] h-[300px] bg-gradient-to-tr from-[#fda802]/8 to-[#3966bf]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto">

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Materi Mandiri{" "}
              <span className="bg-gradient-to-r from-[#f1c857] to-[#2b6394] bg-clip-text text-transparent">
                Berkualitas
              </span>
              <br />
              untuk Mahasiswa HIMTI
            </h1>

            <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-xl">
              Tingkatkan skillmu dengan kurikulum terstruktur, konten modul mendalam, dan evaluasi mandiri bertenaga AI.{" "}
              <strong className="text-slate-700">{availableCount} materi mandiri</strong> sudah tersedia dan terus bertambah.{" "}
              Materi mandiri dipelajari sendiri tanpa bimbingan mentor, tugas, dan sertifikat — berbeda dari Kelas.
            </p>

            {/* Search bar */}
            <div className="relative w-full max-w-md mt-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari materi mandiri (mis. JavaScript, React, Flutter...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#3966bf] focus:outline-none rounded-2xl text-sm text-slate-700 placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CATEGORY FILTER TABS
          ============================================ */}
      <div className="sticky flex justify-center top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${activeCategory === key
                    ? "bg-[#3966bf] text-white border-[#3966bf] shadow-md shadow-[#3966bf]/20"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#3966bf]/40 hover:text-[#3966bf]"
                  }`}
              >
                {label}
                {key !== "all" && (
                  <span className={`ml-1.5 text-[10px] font-black ${activeCategory === key ? "opacity-70" : "opacity-50"}`}>
                    ({courseCatalog.filter((c) => c.category === key).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================
          COURSE GRID
          ============================================ */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="text-5xl">🔍</div>
            <p className="text-slate-500 text-sm font-medium">
              Tidak ada materi mandiri yang cocok dengan pencarian "<strong>{searchQuery}</strong>"
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="text-xs font-bold text-[#3966bf] underline-offset-2 underline"
            >
              Reset pencarian
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-slate-400 font-semibold">
                Menampilkan <span className="text-slate-700 font-black">{filtered.length}</span> materi mandiri
                {activeCategory !== "all" && ` di kategori "${CATEGORY_LABELS[activeCategory]}"`}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ============================================
          LOGIN NOTICE BANNER
          ============================================ */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-16">
        <div className="bg-gradient-to-r from-[#3966bf]/8 to-[#fda802]/8 border border-[#3966bf]/15 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#3966bf]/10 rounded-2xl border border-[#3966bf]/20 shrink-0">
              <Lock className="w-5 h-5 text-[#3966bf]" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm md:text-base">Akses Materi Mandiri Memerlukan Login</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Daftarkan akun HIMTI-mu secara gratis untuk mulai belajar dan melacak progres di semua materi mandiri.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/sign-in"
              className="px-5 py-2 text-xs font-bold bg-white border border-slate-200 hover:border-[#3966bf]/40 text-slate-700 hover:text-[#3966bf] rounded-xl transition-all"
            >
              Masuk
            </a>
            <a
              href="/sign-up"
              className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-[#3966bf] to-[#3966bf]/90 text-white rounded-xl shadow-md shadow-[#3966bf]/20 hover:from-[#3966bf]/90 hover:to-[#fda802] transition-all"
            >
              Daftar Gratis →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
