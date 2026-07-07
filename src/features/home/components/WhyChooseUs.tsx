import { Poppins } from "../../_global/components/Text";
import { Link } from "react-router-dom";
import { FaLaptopCode, FaHandsHelping, FaAward } from "react-icons/fa";

export const WhyChooseUs = () => {
  return (
    <div className="relative bg-slate-50 py-20 border-t border-slate-100 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#f1c857]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <Poppins className="text-[#2b6394] font-bold text-xs uppercase tracking-widest">Keunggulan Kami</Poppins>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Belajar Lebih Terarah & Bersertifikat Resmi
            </h2>
            <Poppins className="text-slate-650 leading-relaxed text-sm md:text-base">
              HIMTI LMS menyediakan kurikulum komprehensif yang dirancang oleh akademisi UMT bersama praktisi profesional industri IT untuk menyiapkan karir teknologi Anda.
            </Poppins>
            
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-[#2b6394]/10 flex items-center justify-center text-[#2b6394]">
                  <FaLaptopCode size={18} />
                </div>
                <div>
                  <Poppins className="font-bold text-slate-800 text-sm md:text-base mb-1">Kurikulum Praktis & Studi Kasus Riil</Poppins>
                  <Poppins className="text-xs md:text-sm text-slate-500">Materi disesuaikan dengan kebutuhan industri terkini dengan proyek nyata.</Poppins>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f1c857]/15 flex items-center justify-center text-[#f1c857]">
                  <FaHandsHelping size={18} />
                </div>
                <div>
                  <Poppins className="font-bold text-slate-800 text-sm md:text-base mb-1">Mentoring Interaktif</Poppins>
                  <Poppins className="text-xs md:text-sm text-slate-500">Dapatkan feedback tugas langsung dan diskusi berkala bersama mentor kelas.</Poppins>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <FaAward size={18} />
                </div>
                <div>
                  <Poppins className="font-bold text-slate-800 text-sm md:text-base mb-1">Sertifikat Kelulusan Resmi</Poppins>
                  <Poppins className="text-xs md:text-sm text-slate-500">Gunakan sertifikat kelulusan digital untuk meningkatkan daya saing portofolio Anda.</Poppins>
                </div>
              </div>
            </div>
          </div>

          {/* Right Graphics Mockup */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f1c857]/10 to-[#2b6394]/10 rounded-3xl blur-2xl transform rotate-6 scale-95 pointer-events-none" />
            <div className="relative bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl max-w-md w-full flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <Poppins className="text-xs font-semibold text-slate-400">Bootcamp Dashboard</Poppins>
              </div>
              
              {/* Visual Placeholder Content representing interactive learning */}
              <div className="flex flex-col gap-4">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2b6394] text-white flex items-center justify-center font-bold text-sm">JS</div>
                    <div>
                      <Poppins className="font-bold text-xs text-slate-800">Javascript Algorithm</Poppins>
                      <Poppins className="text-[10px] text-slate-440">Modul 4: Asynchronous ES6</Poppins>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-bold">Progress 75%</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f1c857] text-slate-900 flex items-center justify-center font-bold text-sm">UI</div>
                    <div>
                      <Poppins className="font-bold text-xs text-slate-800">UI/UX Figma Design</Poppins>
                      <Poppins className="text-[10px] text-slate-440">Modul 2: Auto Layout 3.0</Poppins>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Lulus</span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Terdaftar pada 4 kelas aktif</span>
                  <Link to="/class" className="text-[#2b6394] font-bold hover:underline">Lihat Semua →</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
