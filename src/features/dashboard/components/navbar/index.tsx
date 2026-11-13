import DefaultImage from "@core/assets/default-photo.svg";
import { useAtom } from "jotai";
import { Menu, PanelLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useMenus } from "../../../_global/hooks/useMenus";
import { Skeleton } from "../../../_global/components/Shimer";
import { useProfile } from "../../../profile/useProfile";
import { sidebarAtom } from "../sidebar/store";

interface DashboardNavbarProps {
  onToggleCollapse?: () => void;
  withSidebar?: boolean;
  collapsed?: boolean;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  onToggleCollapse,
  withSidebar = false,
  collapsed = false,
}) => {
  const { data: profile, isFetching } = useProfile();
  const role = profile?.data?.isMentor
    ? "Mentor"
    : profile?.data?.role || "unknown";

  const location = useLocation();
  const { menus } = useMenus();
  const [, setSidebarShow] = useAtom(sidebarAtom);

  const title = menus
    .flatMap((group) => group.items)
    .find(
      (item) =>
        item.path !== "/" && location.pathname.includes(item.path)
    )?.name;

  return (
    <nav
      className={`sticky top-0 z-50 h-16 border-b border-slate-200 bg-white transition-all duration-300 ${
        withSidebar ? (collapsed ? "lg:ml-[76px]" : "lg:ml-[260px]") : ""
      }`}
    >
      <div className="flex h-full items-center gap-3.5 px-6">
        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          onClick={() => setSidebarShow((prev) => !prev)}
          aria-label="Buka sidebar"
        >
          <Menu size={19} />
        </button>
        {onToggleCollapse && (
          <button
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 lg:flex"
            onClick={onToggleCollapse}
            title="Rampingkan sidebar"
            aria-label="Rampingkan sidebar"
          >
            <PanelLeft size={19} />
          </button>
        )}
        {title && (
          <h2 className="truncate text-base font-semibold text-slate-900">
            {title}
          </h2>
        )}
        <div className="ml-auto flex items-center gap-3">
          {isFetching ? (
            <Skeleton width="4rem" height="1rem" />
          ) : (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {role}
            </span>
          )}
          <div className="flex items-center gap-2.5">
            {isFetching ? (
              <>
                <Skeleton width="8rem" height="0.8rem" />
                <Skeleton width="2rem" height="2rem" borderRadius="100%" />
              </>
            ) : (
              <>
                <p className="max-w-[140px] truncate text-sm font-semibold text-slate-900">
                  {profile?.data?.name || "unknown"}
                </p>
                <img
                  src={
                    !profile?.data?.photo || isFetching
                      ? DefaultImage
                      : profile?.data?.photo
                  }
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = DefaultImage)
                  }
                  alt="Profile"
                  className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
