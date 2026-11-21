import { useAtom } from "jotai";
import { Menu } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "../../_global/components/Shimer";
import { EmptyState } from "../../_global/components/Empty";
import { QueryErrorState } from "../../_global/components/QueryErrorState";
import { DarkModeAtom, LearningSidebarAtom } from "../../_global/store";
import { useDetailModule } from "../../dashboard/hooks/modules/useModules";
import { useDetailClass } from "../../class/hooks/useClasses";
import { useCertificateEligibility } from "../../certificates/hooks/useCertificateEligibility";
import { LearningModuleContent } from "../components/LearningModuleContent";
import { NavigationModule } from "../components/NavigationModule";
import { ModuleDTO } from "../../../core/model/modules";

export const LearningDashboardView = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(LearningSidebarAtom);
  const [darkMode] = useAtom(DarkModeAtom);
  const [searchParams] = useSearchParams();

  const moduleIdQs = searchParams.get("moduleId") || "";

  const { data: module, isLoading, isFetching, isError, refetch } =
    useDetailModule(moduleIdQs);

  // Skeleton only before the first load: switching modules refetches
  // with the previous module still cached, so it stays on screen.
  const isLoadingModule = isLoading || (isFetching && !module?.data);

  const {
    data: classes,
    isLoading: isLoadingClass,
    isFetching: isFetchingClass,
  } = useDetailClass();
  // Skeleton only before the first load: a background refetch keeps
  // the loaded progress bar instead of collapsing it.
  const isLoadingProgress =
    isLoadingClass || (isFetchingClass && !classes?.data);
  const total = classes?.data?.total;

  // Approval meter, separate from module progress: only the
  // participant's own eligibility decides the claim. Non-participants
  // get a 403 from the endpoint, so the meter hides itself on error.
  const { data: eligibility, isLoading: isEligibilityLoading } =
    useCertificateEligibility(classes?.data?.id);

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

        {/* Progress bar: same px-6 pt-6 slot as the real one, so
            the content below does not jump when the class query
            lands. The meter line gets its own skeleton while the
            eligibility query loads (it hides on 403, so a wrong
            guess there would be worse than a brief skeleton). */}
        {isLoadingProgress ? (
          <div className="px-6 pt-6">
            <div className="flex justify-between mb-1">
              <Skeleton
                width="10rem"
                height="1.25rem"
                tone={darkMode ? "dark" : "light"}
              />
              <Skeleton
                width="2.5rem"
                height="1.25rem"
                tone={darkMode ? "dark" : "light"}
              />
            </div>
            <Skeleton
              width="100%"
              height="0.5rem"
              borderRadius="9999px"
              tone={darkMode ? "dark" : "light"}
            />
            <Skeleton
              width="12rem"
              height="1.25rem"
              className="mt-1.5"
              tone={darkMode ? "dark" : "light"}
            />
          </div>
        ) : (
          total && (
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
              {eligibility?.data ? (
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
              ) : isEligibilityLoading ? (
                <Skeleton
                  width="12rem"
                  height="1.25rem"
                  className="mt-1.5"
                  tone={darkMode ? "dark" : "light"}
                />
              ) : null}
            </div>
          )
        )}

        {/* Di dalam div Main Content (sebelum div penutup) */}
        {isLoadingModule ? (
          <>
            {/* Same wrapper as LearningModuleContent below
                (md:p-6 p-4 pb-48): title 32px, video aspect-video
                (the real iframe is h-72 on mobile and ~600px+ on
                desktop — aspect-video lands 201px on a phone, 87px
                short of the real 288px, but the old 600px block was
                312px too tall there), then prose text lines. */}
            <div className="md:p-6 p-4 pb-48">
              <Skeleton
                width="66%"
                height="2rem"
                className="mb-2"
                tone={darkMode ? "dark" : "light"}
              />
              <div className="md:p-3 p-0">
                <Skeleton
                  width="100%"
                  height="auto"
                  aspectRatio="16 / 9"
                  tone={darkMode ? "dark" : "light"}
                />
                <div className="mt-4 space-y-2">
                  <Skeleton
                    width="100%"
                    height="1.5rem"
                    tone={darkMode ? "dark" : "light"}
                  />
                  <Skeleton
                    width="100%"
                    height="1.5rem"
                    tone={darkMode ? "dark" : "light"}
                  />
                  <Skeleton
                    width="83%"
                    height="1.5rem"
                    tone={darkMode ? "dark" : "light"}
                  />
                  <Skeleton
                    width="100%"
                    height="1.5rem"
                    tone={darkMode ? "dark" : "light"}
                  />
                  <Skeleton
                    width="60%"
                    height="1.5rem"
                    tone={darkMode ? "dark" : "light"}
                  />
                </div>
              </div>
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
