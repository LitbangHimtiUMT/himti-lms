import { Poppins } from "../../_global/components/Text";
import FaqComponent from "../components/FaqComponent";

export const FaqViews = () => {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      {/* Sleek Banner */}
      <div className="relative pt-28 pb-16 md:pt-22 md:pb-16 bg-slate-900 border-b border-slate-800 overflow-hidden">
        {/* Unsplash Background Image with dark overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none mix-blend-luminosity"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')" 
          }}
        />
        {/* Sleek gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-900/85 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center gap-4 relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-2">
            Frequently Asked Questions
          </h1>
          <Poppins className="text-slate-200 text-sm md:text-base max-w-xl">
            Temukan jawaban cepat atas pertanyaan yang sering diajukan mengenai kelas, program, dan platform belajar HIMTI LMS.
          </Poppins>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FaqComponent />
      </div>
    </div>
  );
};
