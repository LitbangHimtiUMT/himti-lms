import { PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";
import { CONFIG_APP } from "../../../core/configs/app";
import { DashboardNavbar } from "../../dashboard/components/navbar";
import { GeneralSidebar } from "../../dashboard/components/sidebar/GeneralSidebar";
import { useMenus } from "../hooks/useMenus";

interface LearningRootProps extends PropsWithChildren {
  withSidebar?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const LearningRoot: React.FC<LearningRootProps> = ({
  withSidebar = true,
  collapsed = false,
  onToggleCollapse,
  children,
}) => {
  const menu = useMenus();
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
  if (!token) return <Navigate to={"/sign-in"} />;

  return (
    <div className="bg-gray-100">
      <DashboardNavbar onToggleCollapse={onToggleCollapse} />
      <div className="flex relative min-h-screen">
        {withSidebar && (
          <GeneralSidebar
            isFetching={menu.isFetching}
            items={menu.menus}
            collapsed={collapsed}
          />
        )}
        {/* Main Content */}
        <div
          className={`
            flex-1 flex flex-col min-w-0
            transition-all duration-300 ease-in-out
            ${
              withSidebar
                ? collapsed
                  ? "lg:ml-[76px]"
                  : "lg:ml-[260px]"
                : ""
            }
          `}
        >
          <main className="flex-1 mx-4 mb-4 rounded-lg m-4 lg:m-6 lg:mt-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
