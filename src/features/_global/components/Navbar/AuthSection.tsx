import DefaultImage from "@core/assets/default-photo.svg";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { CONFIG_APP } from "../../../../core/configs/app";
import { useProfile } from "../../../profile/useProfile";
import { LogoutConfirmation } from "../../../dashboard/components/navbar/LogoutConfirmation";
import { Skeleton } from "../Shimer";

interface AuthSectionProps {
  direction?: "row" | "column";
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  direction = "row",
}) => {
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
  const { data: profile, isFetching } = useProfile();
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const role = profile?.data?.isMentor
    ? "Mentor"
    : profile?.data?.role || "unknown";

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open ]);

  const photo = !profile?.data?.photo || isFetching ? DefaultImage : profile?.data?.photo;

  return (
    <>
      {token || isFetching ? (
        isFetching ? (
          <div
            className={`flex items-center gap-2 ${
              direction === "row" ? "" : "flex-col"
            }`}
          >
            <Skeleton width="8rem" height="0.8rem" />
            <Skeleton width="2rem" height="2rem" borderRadius="100%" />
            <Skeleton height="1.8rem" width="5rem" />
          </div>
        ) : direction === "row" ? (
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center gap-2.5 rounded-full py-[5px] pl-[5px] pr-2.5 transition-colors duration-200 hover:bg-slate-100"
              onClick={() => setOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={open}
            >
              <img
                src={photo}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = DefaultImage)
                }
                alt="Profile"
                className="h-8 w-8 rounded-full border border-slate-200 object-cover"
              />
              <span className="text-sm font-semibold text-slate-900">
                {profile?.data?.name || "unknown"}
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-500 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[220px] rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.10),0_2px_8px_rgba(15,23,42,0.05)]">
                <div className="mb-1.5 border-b border-slate-100 px-3 py-2.5">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {profile?.data?.name || "unknown"}
                  </p>
                  <p className="text-xs text-slate-500">{role}</p>
                </div>
                <Link
                  to="/dashboard/enrolled-class"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>
                <button
                  className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
                  onClick={() => {
                    setOpen(false);
                    setShow((prev) => !prev);
                  }}
                >
                  <LogOut size={17} />
                  Keluar
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center gap-2.5 px-3">
              <img
                src={photo}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = DefaultImage)
                }
                alt="Profile"
                className="h-8 w-8 rounded-full border border-slate-200 object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {profile?.data?.name || "unknown"}
                </p>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
            </div>
            <Link
              to="/dashboard/enrolled-class"
              className="flex items-center gap-2.5 rounded-xl px-3 py-3 text-[15px] font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <button
              className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100"
              onClick={() => setShow((prev) => !prev)}
            >
              <LogOut size={17} />
              Keluar
            </button>
          </div>
        )
      ) : (
        <div
          className={`flex items-center gap-2 ${
            direction === "row" ? "flex-row" : "w-full flex-col"
          }`}
        >
          <Link
            to="/sign-in"
            className={`flex h-10 items-center justify-center rounded-2xl px-[18px] text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100 ${
              direction === "row" ? "" : "w-full border border-slate-200"
            }`}
          >
            Masuk
          </Link>
          <Link
            to="/sign-up"
            className={`flex h-10 items-center justify-center rounded-2xl bg-[#3966bf] px-[18px] text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#2b4f9c] ${
              direction === "row" ? "" : "w-full"
            }`}
          >
            Daftar
          </Link>
        </div>
      )}
      <LogoutConfirmation onHide={() => setShow((prev) => !prev)} show={show} />
    </>
  );
};
