import { Check } from "lucide-react";

export type AuthBrandVariant = "signin" | "signup" | "forgot";

interface AuthBrandPanelProps {
  variant: AuthBrandVariant;
}

const COPY: Record<AuthBrandVariant, { headline: string; subline: string }> = {
  signin: {
    headline: "Lanjutkan belajarmu.",
    subline:
      "Masuk dan lanjut dari modul terakhir yang kamu kerjakan. Progresmu tersimpan dengan aman.",
  },
  signup: {
    headline: "Mulai belajar hari ini.",
    subline:
      "Satu akun untuk semua materi mandiri, kelas, dan evaluasi AI. Gratis, tanpa kartu kredit.",
  },
  forgot: {
    headline: "Tenang, akunmu aman.",
    subline:
      "Reset password cuma butuh beberapa menit. Kode verifikasi dikirim ke email yang terdaftar.",
  },
};

const GLASS_CLASS =
  "mt-8 max-w-[440px] rounded-[20px] border border-white/20 bg-white/10 p-5 backdrop-blur-md max-lg:hidden lg:px-[22px]";
const LABEL_CLASS =
  "text-xs font-semibold uppercase tracking-[0.1em] text-white/75";

const ResumeCard = () => (
  <div className={GLASS_CLASS}>
    <div className="flex items-center justify-between">
      <span className={LABEL_CLASS}>Lanjutkan Belajar</span>
      <span className="rounded-full bg-white px-[11px] py-1 text-[13px] font-semibold text-[#3966bf]">
        67%
      </span>
    </div>
    <h4 className="mt-3 text-[15.5px] font-semibold">
      Modul 3 &mdash; REST API &amp; Integrasi
    </h4>
    <p className="mt-1.5 text-[13.5px] leading-[1.65] text-white/[0.85]">
      2 dari 3 tugas selesai. Satu langkah lagi menuju evaluasi modul.
    </p>
    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.22]">
      <i className="block h-full w-[67%] rounded-full bg-white" />
    </div>
  </div>
);

const PERKS = [
  "4 materi mandiri siap dipelajari",
  "Evaluasi AI di setiap modul",
  "Sertifikat setelah lulus kelas",
];

const PerksCard = () => (
  <div className={GLASS_CLASS}>
    <span className={LABEL_CLASS}>Yang Kamu Dapatkan</span>
    <ul className="mt-4 flex flex-col gap-[11px]">
      {PERKS.map((perk) => (
        <li
          key={perk}
          className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-white/[0.92]"
        >
          <Check size={17} strokeWidth={2.5} className="mt-[2px] shrink-0" />
          {perk}
        </li>
      ))}
    </ul>
  </div>
);

const RESET_STEPS = [
  "Masukkan email yang terdaftar",
  "Masukkan kode OTP 6 digit",
  "Buat password baru",
];

const StepsCard = () => (
  <div className={GLASS_CLASS}>
    <span className={LABEL_CLASS}>Cara Reset Password</span>
    <ol className="mt-4 flex flex-col gap-[13px]">
      {RESET_STEPS.map((step, index) => (
        <li
          key={step}
          className="flex items-center gap-3 text-[13.5px] leading-[1.5] text-white/[0.92]"
        >
          <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-white/[0.28] bg-white/[0.16] text-[12.5px] font-semibold">
            {index + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  </div>
);

export const AuthBrandPanel = ({ variant }: AuthBrandPanelProps) => {
  const copy = COPY[variant];

  return (
    <div className="relative flex-1 overflow-hidden bg-[linear-gradient(148deg,#2b4f9c_0%,#3966bf_52%,#4d7ad4_100%)] p-8 text-white lg:flex-[1.02] lg:p-12">
      <span className="pointer-events-none absolute -right-[120px] -top-[140px] h-[420px] w-[420px] rounded-full bg-white/[0.14] blur-[70px]" />
      <span className="pointer-events-none absolute -bottom-[100px] -left-[80px] h-[320px] w-[320px] rounded-full bg-[rgba(20,40,90,0.35)] blur-[70px]" />
      <span className="pointer-events-none absolute -bottom-[260px] -right-[180px] h-[560px] w-[560px] rounded-full border border-white/[0.14] max-lg:hidden" />

      <div className="relative z-[1] flex h-full flex-col">
        <div>
          <img src="/HIMTI.png" alt="HIMTI" className="h-10 w-auto" />
        </div>

        <div className="py-6 lg:my-auto lg:py-12">
          <h2 className="max-w-[480px] text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] lg:text-[clamp(30px,3.4vw,40px)]">
            {copy.headline}
          </h2>
          <p className="mt-3.5 max-w-[440px] text-sm leading-[1.7] text-white/[0.82] lg:text-[15px]">
            {copy.subline}
          </p>

          {variant === "signin" && <ResumeCard />}
          {variant === "signup" && <PerksCard />}
          {variant === "forgot" && <StepsCard />}
        </div>

        <div className="text-[12.5px] text-white/60 max-lg:hidden">
          &copy; 2026 HIMTI UMT &middot; Learning Management System
        </div>
      </div>
    </div>
  );
};
