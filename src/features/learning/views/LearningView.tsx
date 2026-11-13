import { useAtom } from "jotai";
import { Menu } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "../../_global/components/Shimer";
import { EmptyState } from "../../_global/components/Empty";
import { LearningSidebarAtom } from "../../_global/store";
import { useDetailModule } from "../../dashboard/hooks/modules/useModules";
import { LearningModuleContent } from "../components/LearningModuleContent";
import { NavigationModule } from "../components/NavigationModule";
import { ModuleDTO } from "../../../core/model/modules";

export const LearningDashboardView = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(LearningSidebarAtom);
  const [searchParams] = useSearchParams();

  const moduleIdQs = searchParams.get("moduleId") || "";

  const { data: module, isFetching } = useDetailModule(moduleIdQs);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Mobile header */}
        <div className="md:hidden p-4 flex items-center">
          <Menu
            size={24}
            className="text-gray-500 cursor-pointer mr-4"
            onClick={toggleSidebar}
          />
          <h1 className="text-xl font-bold">Learning Dashboard</h1>
        </div>

        {/* Di dalam div Main Content (sebelum div penutup) */}
        {isFetching ? (
          <>
            <div className="p-6 pb-24 flex flex-col gap-5">
              <Skeleton width="100%" height="50px" />
              <Skeleton width="100%" height="600px" />
              <Skeleton width="100%" height="300px" />
            </div>
          </>
        ) : module ? (
          <LearningModuleContent module={module?.data as ModuleDTO} />
        ) : (
          <EmptyState
            variant="discovery"
            description="Select a module from the sidebar to start learning."
          />
        )}

        {/* Fixed Navigation Buttons */}
        {module && <NavigationModule />}
      </div>
    </>
  );
};
