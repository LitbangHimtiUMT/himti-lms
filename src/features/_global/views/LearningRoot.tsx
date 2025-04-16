import { PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";
import { CONFIG_APP } from "../../../core/configs/app";
import { DashboardNavbar } from "../../dashboard/components/navbar";
import { DashboardSidebar } from "../../dashboard/components/sidebar";

interface LearningRootProps extends PropsWithChildren {
  withSidebar?: boolean;
}

export const LearningRoot: React.FC<LearningRootProps> = ({
  withSidebar = true,
  children,
}) => {
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
  if (!token) return <Navigate to={"/sign-in"} />;

  return (
    <div className="bg-gray-100">
      {/* Sidebar */}
      <DashboardNavbar />

      <div className="flex relative min-h-screen">
        {withSidebar && <DashboardSidebar />}
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 mx-4 mb-4 overflow-x-hidden rounded-lg m-4 lg:m-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
