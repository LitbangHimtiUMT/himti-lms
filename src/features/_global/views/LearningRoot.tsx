import { PropsWithChildren } from "react";

import { useAtomValue } from "jotai";
import { Navigate } from "react-router-dom";
import { CONFIG_APP } from "../../../core/configs/app";
import { DashboardNavbar } from "../../dashboard/components/navbar";
import { GeneralSidebar } from "../../dashboard/components/sidebar/GeneralSidebar";
import { sidebarAtom } from "../../dashboard/components/sidebar/store";

interface LearningRootProps extends PropsWithChildren {
  withSidebar?: boolean;
}

export const LearningRoot: React.FC<LearningRootProps> = ({
  withSidebar = true,
  children,
}) => {
  // const { data: profile } = useProfile();
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
  const sidebarOpen = useAtomValue(sidebarAtom);
  if (!token) return <Navigate to={"/sign-in"} />;

  return (
    <div className="bg-gray-100">
      <DashboardNavbar />
      <div className="flex relative min-h-screen">
        {withSidebar && (
          <GeneralSidebar
            items={[
              {
                title: "Master",
                items: [
                  {
                    id: 1.0,
                    name: "My Class",
                    path: "/dashboard/my-class",
                  },
                  {
                    id: 1.1,
                    name: "Enrolled Class",
                    path: "/dashboard/enrolled-class",
                  },
                ],
              },
            ]}
          />
        )}
        {/* Main Content */}
        <div
          className={`
            flex-1 flex flex-col min-w-0
            transition-all duration-300 ease-in-out
            ${sidebarOpen ? "lg:ml-80" : "lg:ml-0"}
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
