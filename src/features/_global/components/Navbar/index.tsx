import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AuthSection } from "./AuthSection";
import { Group, GroupResponsive } from "./Group";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-slate-200 bg-white/75 backdrop-blur-lg backdrop-saturate-150">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6">
        <Link
          to="/"
          className="justify-self-start"
          aria-label="Beranda HIMTI LMS"
        >
          <img src="/HIMTI.png" alt="HIMTI" className="h-9 w-auto" />
        </Link>
        <Group />
        <div className="flex items-center justify-end gap-2">
          <div className="hidden lg:block">
            <AuthSection />
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors duration-200 hover:bg-slate-100 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <GroupResponsive isOpen={isOpen} onNavigate={() => setIsOpen(false)} />
    </header>
  );
};
