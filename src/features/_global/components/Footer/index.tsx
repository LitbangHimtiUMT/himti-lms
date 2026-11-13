import { Menus } from "../../config";
import { Link, useLocation } from "react-router-dom";
import { Poppins } from "../Text";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const location = useLocation();

  return (
    <footer className="relative bg-gradient-to-r from-[#4C76A3] to-[#203D5D] text-gray-100 pt-16 pb-8 border-t border-blue-900/40 overflow-hidden">
      {/* Decorative backdrop light glow */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Info */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <img src="/HIMTI.png" className="w-16 h-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]" alt="HIMTI Logo" />
              <div>
                <Poppins className="text-white font-bold text-lg leading-tight tracking-wider">HIMTI UMT</Poppins>
                <Poppins className="text-xs text-yellow-500 font-medium">Learning Management System</Poppins>
              </div>
            </div>
            <Poppins className="text-sm text-slate-200 leading-relaxed max-w-sm mt-2">
              Himpunan Mahasiswa Teknologi Informasi Universitas Muhammadiyah Tangerang. Wadah kolaborasi dan akselerasi keahlian IT masa depan.
            </Poppins>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:text-slate-900 hover:bg-[#f1c857] hover:border-[#f1c857] transition-all duration-300 hover:-translate-y-1">
                <FaFacebookF size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:text-slate-900 hover:bg-[#f1c857] hover:border-[#f1c857] transition-all duration-300 hover:-translate-y-1">
                <FaInstagram size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:text-slate-900 hover:bg-[#f1c857] hover:border-[#f1c857] transition-all duration-300 hover:-translate-y-1">
                <FaLinkedinIn size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:text-slate-900 hover:bg-[#f1c857] hover:border-[#f1c857] transition-all duration-300 hover:-translate-y-1">
                <FaYoutube size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="col-span-6 md:col-span-3 flex flex-col gap-4">
            <Poppins className="text-white font-semibold tracking-wider text-sm uppercase border-l-2 border-yellow-500 pl-3">Navigasi</Poppins>
            <ul className="flex flex-col gap-2.5 mt-2">
              {Menus.map((item, index) => (
                <li key={index}>
                  <Link to={item.to} className="group flex items-center gap-2 text-sm text-slate-200 hover:text-white transition-colors duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 scale-0 group-hover:scale-100 transition-all duration-300" />
                    <Poppins className={`transition-all duration-200 ${location.pathname === item.to ? "font-semibold text-yellow-500" : "font-normal"}`}>
                      {item.name}
                    </Poppins>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info / Campus */}
          <div className="col-span-6 md:col-span-2 flex flex-col gap-4">
            <Poppins className="text-white font-semibold tracking-wider text-sm uppercase border-l-2 border-yellow-500 pl-3">Kontak</Poppins>
            <div className="flex flex-col gap-3 mt-2 text-sm text-slate-200">
              <Poppins className="hover:text-white transition-colors">info@himtiumt.org</Poppins>
              <Poppins className="hover:text-white transition-colors">Tangerang, Banten, Indonesia</Poppins>
              <Poppins className="hover:text-white transition-colors">UMT Cikokol Campus</Poppins>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
            <Poppins className="text-white font-semibold tracking-wider text-sm uppercase border-l-2 border-yellow-500 pl-3">Langganan</Poppins>
            <Poppins className="text-xs text-slate-200 leading-relaxed mt-2">
              Dapatkan update info kelas dan bootcamp terbaru dari HIMTI LMS.
            </Poppins>
            <div className="flex w-full mt-2 rounded-lg overflow-hidden border border-white/20 focus-within:border-yellow-500/80 transition-all duration-300 bg-white/10">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-transparent text-sm px-3 py-2 w-full focus:outline-none text-white placeholder-slate-300" 
              />
              <button className="bg-yellow-600 hover:bg-yellow-400 text-gray-900 text-xs px-4 font-semibold transition-colors duration-200">
                Kirim
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-2 text-xs text-slate-300">
          <Poppins>© {new Date().getFullYear()} HIMTI UMT. All Rights Reserved.</Poppins>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
