import { useState } from "react";
import { FaChevronDown, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { Poppins } from "@features/_global/components/Text";

interface FAQItem {
  question: string;
  answer: string;
}

const FaqComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      question: "Bagaimana cara mendaftar kelas di HIMTI LMS?",
      answer:
        "Anda dapat mendaftar dengan membuat akun terlebih dahulu melalui halaman Sign Up, lalu masuk ke katalog kelas, pilih kelas yang Anda minati, dan klik tombol 'Daftar Kelas'.",
    },
    {
      question: "Apakah materi kelas dapat diakses selamanya?",
      answer:
        "Ya, setelah Anda terdaftar di suatu kelas, Anda dapat mengakses seluruh materi modul, video tutorial, dan tugas kapan saja tanpa batasan waktu.",
    },
    {
      question: "Bagaimana cara mendapatkan sertifikat kelulusan?",
      answer:
        "Sertifikat kelulusan akan diterbitkan secara otomatis setelah Anda menyelesaikan seluruh materi modul kelas dan mengumpulkan tugas akhir yang divalidasi oleh mentor kelas.",
    },
    {
      question: "Apakah saya bisa berinteraksi langsung dengan mentor?",
      answer:
        "Tentu saja. Kami menyediakan ruang diskusi khusus di setiap kelas di mana Anda dapat mengajukan pertanyaan dan berdiskusi langsung dengan mentor serta peserta kelas lainnya.",
    },
  ];

  return (
    <div className="py-20">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Side: Contact Support Card */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
          <div className="bg-gradient-to-br from-[#4C76A3] to-[#203D5D] rounded-2xl p-8 shadow-xl shadow-blue-900/10 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            <Poppins className="text-yellow-300 font-bold text-xs uppercase tracking-wider mb-2">
              Butuh Bantuan?
            </Poppins>
            <h3 className="text-2xl font-bold text-white mb-4">
              Punya Pertanyaan Lain?
            </h3>
            <Poppins className="text-slate-200 text-sm leading-relaxed mb-6">
              Tim support kami siap membantu menjawab kebingungan Anda seputar pendaftaran kelas, metode belajar, dan kemitraan.
            </Poppins>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/#"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-450 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-emerald-600/20"
              >
                <FaWhatsapp size={18} />
                Hubungi via WhatsApp
              </a>
              <a
                href="mailto:support@himtiumt.org"
                className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all duration-200"
              >
                <FaEnvelope size={15} />
                Kirim Email Kami
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Accordion FAQ */}
        <div className="w-full lg:w-2/3">
          <div className="mb-6">
            <Poppins className="text-[#2b6394] font-bold text-xs uppercase tracking-widest mb-1">
              FAQ LIST
            </Poppins>
            <h2 className="text-3xl font-extrabold text-slate-800">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                  openIndex === index 
                    ? "border-[#2b6394]/50 bg-[#2b6394]/5 shadow-[0_8px_25px_rgba(43,99,148,0.03)]" 
                    : "border-slate-200 bg-white hover:border-[#2b6394]/45"
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <button
                  className="w-full text-left p-5 flex justify-between items-center bg-transparent"
                >
                  <span className={`font-semibold text-sm md:text-base transition-colors duration-200 ${openIndex === index ? "text-[#2b6394]" : "text-slate-700"}`}>
                    {faq.question}
                  </span>
                  <FaChevronDown
                    className={`w-4 h-4 text-gray-450 transition-transform duration-300 ${
                      openIndex === index ? "transform rotate-180 text-[#2b6394]" : "transform rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="p-5 pt-0 text-sm md:text-base text-slate-500 border-t border-slate-100 leading-relaxed bg-transparent">
                    <Poppins className="text-sm md:text-base text-slate-650 leading-relaxed">
                      {faq.answer}
                    </Poppins>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqComponent;
