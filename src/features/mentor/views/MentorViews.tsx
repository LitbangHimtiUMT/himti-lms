import { Poppins } from "../../_global/components/Text";
import MentorGrid from "../components/MentorGrid";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export const MentorViews = () => {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <div className="relative min-h-[520px] flex items-center justify-center overflow-hidden">
        {/* Unsplash Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f2d]/90 via-[#1a3a5c]/80 to-[#2b6394]/70" />

        {/* Decorative blur orbs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#f1c857]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2b6394]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Fade to page bg at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8fafc] to-transparent" />

        {/* Hero Content */}
        <div className="relative md:pt-2 z-10 flex flex-col items-center text-center gap-5 px-6 py-24 max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Kenali{" "}
            <span className="bg-gradient-to-r from-[#f1c857] to-[#fdd878] bg-clip-text text-transparent">
              Mentor Kami
            </span>
          </h1>

          <Poppins className="text-gray-200 text-sm md:text-base max-w-xl leading-relaxed">
            Belajar langsung dari para profesional berpengalaman di bidang
            teknologi informasi. Mentor kami siap membimbing perjalanan belajarmu
            dari dasar hingga mahir.
          </Poppins>

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <Link
              to="/class"
              className="group px-6 py-3 rounded-full bg-gradient-to-r from-[#f1c857] to-[#e8b830] text-slate-900 font-semibold text-sm flex items-center gap-2 shadow-lg hover:shadow-[#f1c857]/30 hover:scale-[1.02] transition-all duration-300"
            >
              Mulai Belajar
              <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300"
            >
              Beranda
            </Link>
          </div>
        </div>
      </div>

      {/* ─── MENTOR GRID SECTION ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        {/* Section heading */}
        <div className="text-center mb-12 mt-4">
          <p className="text-[#2b6394] font-bold text-xs uppercase tracking-widest mb-2">
            Tim Pengajar
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-[#2b6394] to-[#f1c857] bg-clip-text text-transparent">
              Expert Instructors
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto">
            Para mentor kami adalah praktisi industri yang telah berpengalaman di bidangnya masing-masing.
          </p>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#2b6394]" />
            <div className="w-2 h-2 rounded-full bg-[#f1c857]" />
            <div className="h-px w-12 bg-gradient-to-r from-[#2b6394] to-transparent" />
          </div>
        </div>

        <MentorGrid />
      </div>
    </div>
  );
};
