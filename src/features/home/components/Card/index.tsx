import { ReactNode } from "react";
import { Poppins } from "../../../_global/components/Text";

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({ description, icon, title }) => {
  return (
    <div className="group relative w-full h-64 rounded-2xl overflow-hidden bg-white border border-slate-200/80 hover:border-[#2b6394]/50 hover:shadow-[0_8px_30px_rgba(43,99,148,0.08)] transition-all duration-300 flex flex-col justify-between p-6 cursor-pointer">
      {/* Background Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f1c857]/5 to-[#2b6394]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Top Border Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f1c857] to-[#2b6394] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="flex flex-col gap-4 relative z-10">
        {/* Icon wrapper */}
        <div className="w-12 h-12 rounded-xl bg-[#2b6394]/10 border border-[#2b6394]/20 text-[#2b6394] group-hover:bg-[#2b6394] group-hover:text-white group-hover:border-[#2b6394] flex items-center justify-center transition-all duration-300">
          {icon}
        </div>
        
        <Poppins className="font-bold text-lg text-slate-800 group-hover:text-[#2b6394] transition-colors duration-200">
          {title}
        </Poppins>
        
        <Poppins
          className="text-sm text-slate-550 group-hover:text-slate-650 leading-relaxed overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {description}
        </Poppins>
      </div>

      <div className="w-full flex items-center justify-end relative z-10">
        <span className="text-xs text-[#2b6394] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Lihat Kelas →
        </span>
      </div>
    </div>
  );
};
