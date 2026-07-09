import { Poppins } from "../../_global/components/Text";
import { CategoriesList } from "../components/CategoriesList";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGraduationCap, FaUsers, FaCertificate } from "react-icons/fa";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Testimonials } from "../components/Testimonials";

export const HomeViews = () => {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen overflow-hidden relative">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f1c857]/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute top-[40vh] left-0 w-[400px] h-[400px] bg-[#2b6394]/10 rounded-full blur-3xl pointer-events-none -ml-40" />

      {/* Background Image from Unsplash (Fades smoothly to merge with the background) */}
      <div className="absolute top-0 left-0 right-0 h-[650px] overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.09]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f8fafc] to-transparent" />
      </div>

      {/* Hero Section */}
      <div className="relative pt-28 pb-16 md:pt-22 md:pb-28 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <div className="flex flex-col gap-4 md:gap-6 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
            Explore Courses & Start Your{" "}
            <span className="bg-gradient-to-r from-[#f1c857] to-[#2b6394] bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h1>
          
          <Poppins className="text-slate-650 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Temukan potensi terbaikmu dan mulailah belajar bersama kami. Dapatkan akses materi eksklusif, bimbingan mentor berpengalaman, dan sertifikasi resmi dari HIMTI UMT.
          </Poppins>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            to="/class"
            className="group px-6 py-3 rounded-full bg-gradient-to-r from-[#f1c857] to-[#2b6394] hover:opacity-95 text-white font-semibold text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(43,99,148,0.15)] hover:shadow-[0_4px_30px_rgba(43,99,148,0.25)] transition-all duration-300"
          >
            Mulai Belajar Sekarang
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/courses"
            className="px-6 py-3 rounded-full bg-white hover:bg-gray-100 border border-slate-200 text-slate-700 font-semibold text-sm transition-all duration-200 shadow-sm"
          >
            Lihat Course
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 max-w-4xl w-full mt-10 md:mt-24 px-4 md:px-6 py-6 md:py-8 rounded-3xl bg-white/70 border border-slate-200/60 shadow-[0_20px_50px_rgba(43,99,148,0.06)] backdrop-blur-xl relative z-20">
          
          {/* Stat 1 */}
          <div className="group flex items-start gap-4 p-4 md:p-3 lg:p-4 rounded-2xl hover:bg-slate-50/80 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f1c857]/20 to-[#f1c857]/5 text-[#f1c857] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <FaGraduationCap size={24} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-3xl font-black text-slate-800 tracking-tight">20+</span>
              <Poppins className="text-sm font-bold text-slate-700">Kelas Aktif</Poppins>
              <Poppins className="text-xs text-slate-400 mt-0.5">Kurikulum siap industri</Poppins>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="group flex items-start gap-4 p-4 md:p-3 lg:p-4 rounded-2xl hover:bg-slate-50/80 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2b6394]/20 to-[#2b6394]/5 text-[#2b6394] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <FaUsers size={22} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-3xl font-black text-slate-800 tracking-tight">500+</span>
              <Poppins className="text-sm font-bold text-slate-700">Siswa Aktif</Poppins>
              <Poppins className="text-xs text-slate-400 mt-0.5">Komunitas IT kolaboratif</Poppins>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="group flex items-start gap-4 p-4 md:p-3 lg:p-4 rounded-2xl hover:bg-slate-50/80 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <FaCertificate size={20} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-3xl font-black text-slate-800 tracking-tight">100%</span>
              <Poppins className="text-sm font-bold text-slate-700">Tersertifikasi</Poppins>
              <Poppins className="text-xs text-emerald-650 mt-0.5 font-medium">Validasi langsung UMT</Poppins>
            </div>
          </div>
        </div>

      </div> {/* Close Hero Section */}

      {/* SVG Curve Divider (Smooth transition to white background below) */}
      <div className="relative w-full overflow-hidden leading-none z-10 bg-[#f8fafc] -mt-12">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 text-white fill-current">
          <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,110 1200,90 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* Categories / Catalog Grid Section */}
      <div className="relative bg-white pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-10 pt-4">
          <Poppins className="text-[#2b6394] font-bold text-xs uppercase tracking-widest">Kategori Pilihan</Poppins>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Kuasai Bidang IT Terpopuler</h2>
        </div>
        <CategoriesList />
      </div>

      {/* SECTION 1: Why Choose Us (Kenapa Memilih Kami) */}
      <WhyChooseUs />

      {/* SECTION 2: Alumni Testimonials (Testimoni Alumni) */}
      <Testimonials />
    </div>
  );
};
