import { Poppins } from "../../_global/components/Text";
import { FaStar } from "react-icons/fa";

export const Testimonials = () => {
  return (
    <div className="relative bg-white py-20 border-t border-slate-100 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2b6394]/5 rounded-full blur-3xl pointer-events-none -mr-40" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        <div className="text-center max-w-2xl flex flex-col gap-2 mb-12">
          <Poppins className="text-[#2b6394] font-bold text-xs uppercase tracking-widest">Testimoni Alumni</Poppins>
          <h2 className="text-3xl font-extrabold text-slate-900">Apa Kata Mereka Yang Telah Bergabung?</h2>
          <Poppins className="text-slate-650 text-sm">Cerita sukses dari alumni HIMTI LMS yang kini berkarir di bidang teknologi industri digital.</Poppins>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Card 1 */}
          <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4">
              <div className="text-yellow-500 flex gap-1">
                <FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} />
              </div>
              <Poppins className="text-slate-650 italic text-sm leading-relaxed">
                "Materi Javascript di HIMTI LMS sangat lengkap dan gampang dipahami pemula. Mentornya sangat sabar membimbing saat ada error dalam pengerjaan projek modul."
              </Poppins>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/50">
              <div className="w-10 h-10 rounded-full bg-[#2b6394] text-white flex items-center justify-center font-bold text-xs">AR</div>
              <div>
                <Poppins className="font-bold text-xs text-slate-800">Ahmad Riyadi</Poppins>
                <Poppins className="text-[10px] text-slate-450">Frontend Developer at Techindo</Poppins>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4">
              <div className="text-yellow-500 flex gap-1">
                <FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} />
              </div>
              <Poppins className="text-slate-650 italic text-sm leading-relaxed">
                "Kurikulum UI/UX bener-bener membantu saya beralih karir. Belajar figma Auto Layout, wireframing, sampai testing dijelaskan secara runtut dengan studi kasus riil."
              </Poppins>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/50">
              <div className="w-10 h-10 rounded-full bg-[#f1c857] text-slate-900 flex items-center justify-center font-bold text-xs">SN</div>
              <div>
                <Poppins className="font-bold text-xs text-slate-800">Siti Nurhaliza</Poppins>
                <Poppins className="text-[10px] text-slate-450">Junior UI/UX Designer</Poppins>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4">
              <div className="text-yellow-500 flex gap-1">
                <FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} />
              </div>
              <Poppins className="text-slate-650 italic text-sm leading-relaxed">
                "Sebagai mahasiswa UMT, adanya HIMTI LMS membantu banget melengkapi skill di luar perkuliahan reguler. Sertifikatnya juga berguna saat apply magang industri."
              </Poppins>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/50">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">BP</div>
              <div>
                <Poppins className="font-bold text-xs text-slate-800">Budi Pratama</Poppins>
                <Poppins className="text-[10px] text-slate-450">Informatics Student UMT</Poppins>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
