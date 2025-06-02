import { Menu } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ModuleDTO } from "../../../core/model/modules";
import { Button } from "../../_global/components/Button";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { convertQueryParamsToObject } from "../../_global/helper";
import { useDetailClass } from "../../class/hooks/useClasses";
import { YoutubeEmbed } from "../../dashboard/components/modules/detail-modules/EmbededYoutube";
import { useDetailModule } from "../../dashboard/hooks/modules/useModules";
import { AssignmentView } from "./AssignmentView";
import { useAtom } from "jotai";
import { DarkModeAtom, LearningSidebarAtom } from "../../_global/store";
import { Skeleton } from "../../_global/components/Shimer";
import { useCompletedModules } from "../hooks/useCompleted";

export const LearningDashboardView = () => {
  const [darkMode] = useAtom(DarkModeAtom);
  const [sidebarOpen, setSidebarOpen] = useAtom(LearningSidebarAtom);
  const [searchParams, setSearchParams] = useSearchParams();

  const queries = convertQueryParamsToObject(searchParams.toString());
  const moduleIdQs = searchParams.get("moduleId") || "";

  const { data: classess } = useDetailClass();
  const [modules, setModules] = useState(
    classess?.data?.sessions.map((item) => ({
      ...item,
      isOpen: false,
    }))
  );

  const mutation = useCompletedModules();
  
  const { data: module, isFetching } = useDetailModule(moduleIdQs);
  
  const handleCompleteModule = useCallback(async () => {
    mutation.mutateAsync({
      moduleId: module?.data?.id || "",
    });
  }, [mutation, module?.data?.id]);
  useEffect(() => {
    setModules(
      classess?.data?.sessions.map((item) => ({ ...item, isOpen: false }))
    );
  }, [classess?.data?.sessions]);

  const handleClickModule = (moduleId: string) => {
    setSearchParams({
      ...queries,
      moduleId,
    });
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Add these helper functions near the top of your component
  const findCurrentModuleIndex = () => {
    if (!modules || !moduleIdQs) return { sessionIndex: -1, moduleIndex: -1 };

    for (let sessionIndex = 0; sessionIndex < modules.length; sessionIndex++) {
      const session = modules[sessionIndex];
      for (
        let moduleIndex = 0;
        moduleIndex < session.modules.length;
        moduleIndex++
      ) {
        if (session.modules[moduleIndex].id === moduleIdQs) {
          return { sessionIndex, moduleIndex };
        }
      }
    }
    return { sessionIndex: -1, moduleIndex: -1 };
  };

  const getNextModule = () => {
    const { sessionIndex, moduleIndex } = findCurrentModuleIndex();
    if (sessionIndex === -1 || moduleIndex === -1) return null;

    const currentSession = modules?.[sessionIndex];
    const nextModuleIndex = moduleIndex + 1;

    // Check if there's a next module in current session
    if (nextModuleIndex < (currentSession?.modules.length as number)) {
      return currentSession?.modules[nextModuleIndex];
    }

    // Check if there's a next session
    if (sessionIndex + 1 < (modules?.length || 0)) {
      const nextSession = modules?.[sessionIndex + 1];
      if ((nextSession?.modules.length as number) > 0) {
        return nextSession?.modules[0];
      }
    }

    return null; // No next module
  };

  const getPreviousModule = () => {
    const { sessionIndex, moduleIndex } = findCurrentModuleIndex();
    if (sessionIndex === -1 || moduleIndex === -1) return null;

    const currentSession = modules?.[sessionIndex];
    const prevModuleIndex = moduleIndex - 1;

    // Check if there's a previous module in current session
    if (prevModuleIndex >= 0) {
      return currentSession?.modules[prevModuleIndex];
    }

    // Check if there's a previous session
    if (sessionIndex - 1 >= 0) {
      const prevSession = modules?.[sessionIndex - 1];
      if ((prevSession?.modules.length as number) > 0) {
        return prevSession?.modules[prevSession.modules.length - 1];
      }
    }

    return null; // No previous module
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
          <div className="p-6 pb-24">
            {" "}
            {/* Tambahkan pb-24 untuk spacing di bawah */}
            <h1 className="text-2xl font-bold mb-2">{module?.data?.name}</h1>
            <div className="p-3">
              <ConditionNode condition={!!module?.data?.youtubeId}>
                <div>
                  <YoutubeEmbed videoId={module?.data?.youtubeId || ""} />
                </div>
              </ConditionNode>
              <div
                className={`prose max-w-none dark:prose-invert prose-base`}
                dangerouslySetInnerHTML={{
                  __html: module?.data?.textModule || "",
                }}
              />
            </div>
            <ConditionNode condition={!!module?.data?.assignment}>
              <AssignmentView modules={module?.data as ModuleDTO} />
            </ConditionNode>
          </div>
        ) : null}

        {/* Fixed Navigation Buttons */}
        {module && (
          <div
            className={`fixed bottom-0 transition-all duration-300 ${
              sidebarOpen ? "md:left-64" : "md:left-20"
            } left-0 right-0 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } p-4 border-t shadow-lg flex justify-end gap-4`}
          >
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                const prevModule = getPreviousModule();
                if (prevModule) {
                  handleClickModule(prevModule.id);
                }
              }}
              disabled={!getPreviousModule()}
            >
              Previous
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={async() => {
                await handleCompleteModule()
                const nextModule = getNextModule();
                if (nextModule) {
                  handleClickModule(nextModule.id);
                }
              }}
              disabled={!getNextModule()}
            >
              {mutation.isPending ? 'Loading...' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
