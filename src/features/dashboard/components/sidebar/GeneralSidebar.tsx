import DefaultImage from "@core/assets/default-photo.svg";
import clsx from "clsx";
import { useAtom } from "jotai";
import { LogOut, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../../../_global/components/Shimer";
import { useScreen } from "../../../_global/hooks/useScreen";
import { useProfile } from "../../../profile/useProfile";
import { LogoutConfirmation } from "../navbar/LogoutConfirmation";
import { SidebarItem } from "./SidebarItem";
import { sidebarAtom } from "./store";
import { ISidebarProps } from "./types";

export const GeneralSidebar: React.FC<ISidebarProps> = ({
  items,
  isLoading,
  collapsed = false,
}) => {
  const [show, setShow] = useAtom(sidebarAtom);
  const handleShow = () => setShow((prev) => !prev);
  const [showLogout, setShowLogout] = useState(false);
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const screen = useScreen();

  const mobile = !screen.lg && !screen.xl && !screen["2xl"];

  useEffect(() => {
    if (mobile) {
      setShow(false);
    }
  }, []);

  const role = profile?.data?.isMentor
    ? "Mentor"
    : profile?.data?.role || "unknown";

  return (
    <>
      {/* BACKDROP untuk mobile */}
      <div
        className={clsx(
          "fixed inset-0 z-[996] bg-black bg-opacity-40 transition-opacity duration-300 lg:hidden",
          show ? "visible opacity-100" : "invisible opacity-0"
        )}
        onClick={handleShow}
      ></div>

      {/* SIDEBAR */}
      <aside
        className={clsx(
          "fixed left-0 top-0 z-[997] flex h-screen flex-col bg-white px-4 py-5 transition-all duration-300",
          show ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:border-r lg:border-slate-200",
          collapsed ? "w-full lg:w-[76px] lg:px-3" : "w-full lg:w-[260px]"
        )}
      >
        <div
          className={`flex items-center justify-between px-2 pb-[22px] pt-[2px] ${
            collapsed ? "lg:justify-center lg:px-0" : ""
          }`}
        >
          <img
            src="/HIMTI.png"
            alt="HIMTI"
            className={`h-9 w-auto object-contain ${
              collapsed ? "lg:h-7" : ""
            }`}
          />
          {/* Mobile only: the open sidebar covers the navbar toggle,
              so without this the only way to hide it is a menu tap. */}
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            onClick={handleShow}
            aria-label="Tutup sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            // One group, like the real menu below: title 16px +
            // 4 item rows of 40px (mentor has 4 items, non-mentor
            // 3 — 4 is the neutral max, the footer is pinned so
            // the extra row shifts nothing below it).
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="px-3">
                  <Skeleton width="6rem" height="1rem" />
                </div>
                <div className="flex flex-col gap-0.5">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} width="100%" height="2.5rem" />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items?.map((group, index) => (
                <SidebarItem
                  items={group.items}
                  key={index}
                  title={group.title}
                  collapsed={collapsed}
                />
              ))}
            </div>
          )}
        </div>

        {/* User Info: while the profile loads, a skeleton in the
            same slot — the old code rendered the real footer with
            the name "unknown" flashing in. Same responsive hiding
            as the real footer when collapsed. */}
        {isProfileLoading ? (
          <div
            className={`mt-4 flex items-center gap-2.5 border-t border-slate-100 pt-4 ${
              collapsed ? "lg:justify-center" : ""
            }`}
          >
            <Skeleton
              width="2.25rem"
              height="2.25rem"
              borderRadius="9999px"
              className="shrink-0"
            />
            <div
              className={`min-w-0 flex-1 ${collapsed ? "lg:hidden" : ""}`}
            >
              <Skeleton width="6rem" height="1.25rem" />
              <Skeleton width="4rem" height="1rem" />
            </div>
            <Skeleton
              width="2.25rem"
              height="2.25rem"
              borderRadius="0.75rem"
              className={`shrink-0 ${collapsed ? "lg:hidden" : ""}`}
            />
          </div>
        ) : (
          <div
            className={`mt-4 flex items-center gap-2.5 border-t border-slate-100 pt-4 ${
              collapsed ? "lg:justify-center" : ""
            }`}
          >
            <img
              src={
                !profile?.data?.photo ? DefaultImage : profile?.data?.photo
              }
              onError={(e) =>
                ((e.target as HTMLImageElement).src = DefaultImage)
              }
              alt="Profile"
              className="h-9 w-9 shrink-0 rounded-full border border-slate-200 object-cover"
            />
            <div className={`min-w-0 flex-1 ${collapsed ? "lg:hidden" : ""}`}>
              <p className="truncate text-[13px] font-semibold text-slate-900">
                {profile?.data?.name || "unknown"}
              </p>
              <p className="truncate text-xs text-slate-500">{role}</p>
            </div>
            <button
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 ${
                collapsed ? "lg:hidden" : ""
              }`}
              onClick={() => setShowLogout((prev) => !prev)}
              title="Keluar"
              aria-label="Keluar"
            >
              <LogOut size={19} />
            </button>
          </div>
        )}
      </aside>
      <LogoutConfirmation
        onHide={() => setShowLogout((prev) => !prev)}
        show={showLogout}
      />
    </>
  );
};
