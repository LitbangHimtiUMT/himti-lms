import React from "react";
import { ISidebarItemProps } from "./types";
import { Link, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { Award, BookOpen, Folder, Home } from "lucide-react";
import { sidebarAtom } from "./store";
import { useScreen } from "../../../_global/hooks/useScreen";

const ITEM_ICONS: Record<string, React.ElementType> = {
  "/": Home,
  "/dashboard/my-class": Folder,
  "/dashboard/enrolled-class": BookOpen,
  "/dashboard/certificates": Award,
};

export const SidebarItem: React.FC<ISidebarItemProps> = ({
  items,
  title,
  collapsed = false,
}) => {
  const location = useLocation();
  const [, setShow] = useAtom(sidebarAtom);
  const screen = useScreen();

  const mobile = !screen.lg && !screen.xl && !screen["2xl"];

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <p
          className={`px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 ${
            collapsed ? "lg:hidden" : ""
          }`}
        >
          {title}
        </p>
      )}
      <div className="flex flex-col gap-0.5">
        {items?.map((item) => {
          const isActive =
            location.pathname.includes(item.path) && item.path !== "/";
          const Icon = ITEM_ICONS[item.path] ?? BookOpen;
          return (
            <Link
              to={item.path}
              key={item.id}
              onClick={() => mobile && setShow(false)}
              title={collapsed ? item.name : undefined}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-[#eef3fc] font-semibold text-[#3966bf]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              } ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
            >
              {isActive && (
                <span className="absolute -left-4 bottom-[9px] top-[9px] w-[3px] rounded-r bg-[#3966bf]" />
              )}
              <Icon size={20} className="shrink-0" />
              <span className={collapsed ? "lg:hidden" : ""}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
