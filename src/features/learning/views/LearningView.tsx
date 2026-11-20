import { useAtom } from "jotai";
import { Menu } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "../../_global/components/Shimer";
import { EmptyState } from "../../_global/components/Empty";
import { QueryErrorState } from "../../_global/components/QueryErrorState";
import { LearningSidebarAtom } from "../../_global/store";
import { useDetailModule } from "../../dashboard/hooks/modules/useModules";
import { useDetailClass } from "../../class/hooks/useClasses";
import { useCertificateEligibility } from "../../certificates/hooks/useCertificateEligibility";
import { LearningModuleContent } from "../components/LearningModuleContent";
import { NavigationModule } from "../components/NavigationModule";
import { ModuleDTO } from "../../../core/model/modules";

export const LearningDashboardView = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(LearningSidebarAtom);
  const [searchParams] = useSearchParams();

  const moduleIdQs = searchParams.get("moduleId") || "";

  const { data: module, isLoading, isFetching, isError, refetch } =
    useDetailModule(moduleIdQs);

  // Skeleton only before the first load: switching modules refetches
  // with the previous module still cached, so it stays on screen.
  const isLoadingModule = isLoading || (isFetching && !module?.data);

  const { data: classes } = useDetailClass();
  const total = classes?.data?.total;

  // Approval meter, separate from module progress: only the
  // participant's own eligibility decides the claim. Non-participants
  // get a 403 from the endpoint, so the meter hides itself on error.
  const { data: eligibility } = useCertificateEligibility(classes?.data?.id);

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

        {/* Progress bar */}
        {total && (
          <div className="px-6 pt-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>
                {total.completed} dari {total.module} modul selesai
              </span>
              <span>{total.precentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full"
                style={{ width: `${total.precentage}%` }}
              ></div>
            </div>
            {eligibility?.data && (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5">
                  Tugas disetujui {eligibility.data.approvedAssignments}/
                  {eligibility.data.totalAssignments}
                </p>
                {eligibility.data.totalAssignments > 0 &&
                  eligibility.data.approvedAssignments ===
                    eligibility.data.totalAssignments &&
                  eligibility.data.classCompleted === false && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Semua tugas disetujui. Menunggu mentor menandai kelas
                      selesai.
                    </p>
                  )}
              </>
            )}
          </div>
        )}

        {/* Di dalam div Main Content (sebelum div penutup) */}
        {isLoadingModule ? (
          <>
            <div className="p-6 pb-24 flex flex-col gap-5">
              <Skeleton width="100%" height="50px" />
              <Skeleton width="100%" height="600px" />
              <Skeleton width="100%" height="300px" />
            </div>
          </>
        ) : isError && !module ? (
          <QueryErrorState
            description={[
              "Failed to load module.",
              "Please check your connection and try again.",
            ]}
            onRetry={refetch}
          />
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
