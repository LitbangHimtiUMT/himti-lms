export const AuthBrandPanel = () => {
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
            Belajar mandiri, dinilai AI.
          </h2>
          <p className="mt-3.5 max-w-[440px] text-sm leading-[1.7] text-white/[0.82] lg:text-[15px]">
            Materi mandiri HIMTI dengan evaluasi otomatis. Kerjakan tugas,
            dapat feedback langsung, lanjut ke modul berikutnya.
          </p>

          <div className="mt-8 max-w-[440px] rounded-[20px] border border-white/20 bg-white/10 p-5 backdrop-blur-md max-lg:hidden lg:px-[22px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75">
                Evaluasi AI
              </span>
              <span className="rounded-full bg-white px-[11px] py-1 text-[13px] font-semibold text-[#3966bf]">
                85 &middot; Lulus
              </span>
            </div>
            <h4 className="mt-3 text-[15.5px] font-semibold">
              Modul 3 &mdash; REST API &amp; Integrasi
            </h4>
            <p className="mt-1.5 text-[13.5px] leading-[1.65] text-white/[0.85]">
              &ldquo;Struktur endpoint sudah benar. Perhatikan penamaan
              resource agar konsisten dengan kaidah REST.&rdquo;
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.22]">
              <i className="block h-full w-[85%] rounded-full bg-white" />
            </div>
          </div>
        </div>

        <div className="text-[12.5px] text-white/60 max-lg:hidden">
          &copy; 2026 HIMTI UMT &middot; Learning Management System
        </div>
      </div>
    </div>
  );
};
