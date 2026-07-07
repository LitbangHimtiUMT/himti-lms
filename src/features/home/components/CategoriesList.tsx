import { BiWorld } from "react-icons/bi";
import { TbDeviceMobileCode } from "react-icons/tb";
import { GrNetwork } from "react-icons/gr";
import { MdOutlineDesignServices, MdSecurity } from "react-icons/md";
import { Poppins } from "../../_global/components/Text";
import { Link } from "react-router-dom";

export const CategoriesList = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 my-6">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
        
        {/* Card 1: Web Development (Wider - Col Span 3) */}
        <div className="group md:col-span-3 h-80 rounded-3xl bg-white border border-slate-200/85 hover:border-[#2b6394]/45 hover:shadow-[0_15px_40px_rgba(43,99,148,0.06)] transition-all duration-300 grid grid-cols-12 overflow-hidden cursor-pointer">
          <div className="col-span-7 flex flex-col justify-between p-6">
            <div className="flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#2b6394]/10 border border-[#2b6394]/20 text-[#2b6394] group-hover:bg-[#2b6394] group-hover:text-white flex items-center justify-center transition-all duration-300">
                <BiWorld size={22} />
              </div>
              <Poppins className="font-bold text-lg md:text-xl text-slate-800 group-hover:text-[#2b6394] transition-colors duration-200">
                Web Development
              </Poppins>
              <Poppins className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-3">
                Kombinasikan HTML, CSS, JavaScript, serta framework mutakhir seperti React, NextJS, atau Laravel untuk membangun ekosistem web modern.
              </Poppins>
            </div>
            <Link to="/class" className="text-xs text-[#2b6394] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Lihat Kelas →</Link>
          </div>
          <div className="col-span-5 p-4 flex items-center justify-center">
            <div className="w-full h-5/6 rounded-2xl overflow-hidden shadow-md border border-slate-100 group-hover:scale-[1.03] transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80" 
                alt="Web Dev Illustration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Mobile Development (Wider - Col Span 3) */}
        <div className="group md:col-span-3 h-80 rounded-3xl bg-white border border-slate-200/85 hover:border-[#2b6394]/45 hover:shadow-[0_15px_40px_rgba(43,99,148,0.06)] transition-all duration-300 grid grid-cols-12 overflow-hidden cursor-pointer">
          <div className="col-span-7 flex flex-col justify-between p-6">
            <div className="flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#2b6394]/10 border border-[#2b6394]/20 text-[#2b6394] group-hover:bg-[#2b6394] group-hover:text-white flex items-center justify-center transition-all duration-300">
                <TbDeviceMobileCode size={22} />
              </div>
              <Poppins className="font-bold text-lg md:text-xl text-slate-800 group-hover:text-[#2b6394] transition-colors duration-200">
                Mobile Development
              </Poppins>
              <Poppins className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-3">
                Kembangkan aplikasi mobile berkinerja tinggi untuk iOS & Android menggunakan Flutter atau React Native dengan user experience premium.
              </Poppins>
            </div>
            <Link to="/class" className="text-xs text-[#2b6394] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Lihat Kelas →</Link>
          </div>
          <div className="col-span-5 p-4 flex items-center justify-center">
            <div className="w-full h-5/6 rounded-2xl overflow-hidden shadow-md border border-slate-100 group-hover:scale-[1.03] transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400&q=80" 
                alt="Mobile Dev Illustration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Network Engineer (Col Span 2) */}
        <div className="group md:col-span-2 h-[370px] rounded-3xl bg-white border border-slate-200/85 hover:border-[#2b6394]/45 hover:shadow-[0_15px_40px_rgba(43,99,148,0.06)] transition-all duration-300 flex flex-col justify-between p-5 cursor-pointer">
          <div className="flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#2b6394]/10 border border-[#2b6394]/20 text-[#2b6394] group-hover:bg-[#2b6394] group-hover:text-white flex items-center justify-center transition-all duration-300">
              <GrNetwork size={18} />
            </div>
            <Poppins className="font-bold text-lg text-slate-800 group-hover:text-[#2b6394] transition-colors duration-200">Network Engineer</Poppins>
            <Poppins className="text-xs text-slate-500 leading-relaxed line-clamp-3">
              Pahami protokol jaringan, arsitektur server cloud, routing, switching, dan keamanan siber dasar.
            </Poppins>
          </div>
          
          <div className="h-28 my-2 rounded-xl overflow-hidden border border-slate-100 shadow-sm group-hover:scale-[1.02] transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=400&q=80" 
              alt="Network Illustration" 
              className="w-full h-full object-cover"
            />
          </div>

          <Link to="/class" className="text-xs text-[#2b6394] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Lihat Kelas →</Link>
        </div>

        {/* Card 4: UI UX Design (Col Span 2) */}
        <div className="group md:col-span-2 h-[370px] rounded-3xl bg-white border border-slate-200/85 hover:border-[#2b6394]/45 hover:shadow-[0_15px_40px_rgba(43,99,148,0.06)] transition-all duration-300 flex flex-col justify-between p-5 cursor-pointer">
          <div className="flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#2b6394]/10 border border-[#2b6394]/20 text-[#2b6394] group-hover:bg-[#2b6394] group-hover:text-white flex items-center justify-center transition-all duration-300">
              <MdOutlineDesignServices size={20} />
            </div>
            <Poppins className="font-bold text-lg text-slate-800 group-hover:text-[#2b6394] transition-colors duration-200">UI UX Design</Poppins>
            <Poppins className="text-xs text-slate-500 leading-relaxed line-clamp-3">
              Kuasai metodologi design thinking, prototyping Figma, usability testing, dan prinsip interaksi digital.
            </Poppins>
          </div>
          
          <div className="h-28 my-2 rounded-xl overflow-hidden border border-slate-100 shadow-sm group-hover:scale-[1.02] transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=400&q=80" 
              alt="UI UX Illustration" 
              className="w-full h-full object-cover"
            />
          </div>

          <Link to="/class" className="text-xs text-[#2b6394] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Lihat Kelas →</Link>
        </div>

        {/* Card 5: Cyber Security (Col Span 2) */}
        <div className="group md:col-span-2 h-[370px] rounded-3xl bg-white border border-slate-200/85 hover:border-[#2b6394]/45 hover:shadow-[0_15px_40px_rgba(43,99,148,0.06)] transition-all duration-300 flex flex-col justify-between p-5 cursor-pointer">
          <div className="flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#2b6394]/10 border border-[#2b6394]/20 text-[#2b6394] group-hover:bg-[#2b6394] group-hover:text-white flex items-center justify-center transition-all duration-300">
              <MdSecurity size={20} />
            </div>
            <Poppins className="font-bold text-lg text-slate-800 group-hover:text-[#2b6394] transition-colors duration-200">Cyber Security</Poppins>
            <Poppins className="text-xs text-slate-500 leading-relaxed line-clamp-3">
              Pelajari mekanisme enkripsi data, eksploitasi celah keamanan web, pertahanan server, dan kerentanan sistem.
            </Poppins>
          </div>
          
          <div className="h-28 my-2 rounded-xl overflow-hidden border border-slate-100 shadow-sm group-hover:scale-[1.02] transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=400&q=80" 
              alt="Cyber Security Illustration" 
              className="w-full h-full object-cover"
            />
          </div>

          <Link to="/class" className="text-xs text-[#2b6394] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Lihat Kelas →</Link>
        </div>

      </div>
    </div>
  );
};
