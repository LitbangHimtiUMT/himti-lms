import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SessionDTO } from "../../../core/model/classes";
import { Button } from "../../_global/components/Button";
import { convertQueryParamsToObject } from "../../_global/helper";
import { DarkModeAtom, LearningSidebarAtom } from "../../_global/store";
import { useDetailClass } from "../../class/hooks/useClasses";
import { useDetailModule } from "../../dashboard/hooks/modules/useModules";
import { useCompletedModules } from "../hooks/useCompleted";

export const NavigationModule = () => {
  const { data: classess } = useDetailClass();
  const [sessions, setSessions] = useState<
    Array<SessionDTO & { isOpen: boolean }>
  >(
    (classess?.data?.sessions || []).map((item) => ({
      ...item,
      isOpen: false,
    }))
  );
  const [darkMode] = useAtom(DarkModeAtom);
  const mutation = useCompletedModules();
  const [searchParams, setSearchParams] = useSearchParams();
  const moduleIdQs = searchParams.get("moduleId") || "";
  const [sidebarOpen] = useAtom(LearningSidebarAtom);

  const { data: module } = useDetailModule(moduleIdQs);

  const queries = convertQueryParamsToObject(searchParams.toString());

  // Add these helper functions near the top of your component
  const findCurrentModuleIndex = () => {
    if (!sessions || !moduleIdQs) return { sessionIndex: -1, moduleIndex: -1 };

    for (let sessionIndex = 0; sessionIndex < sessions.length; sessionIndex++) {
      const session = sessions[sessionIndex];
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

    const currentSession = sessions?.[sessionIndex];
    const nextModuleIndex = moduleIndex + 1;

    // Check if there's a next module in current session
    if (nextModuleIndex < (currentSession?.modules.length as number)) {
      return currentSession?.modules[nextModuleIndex];
    }

    // Check if there's a next session
    if (sessionIndex + 1 < (sessions?.length || 0)) {
      const nextSession = sessions?.[sessionIndex + 1];
      if ((nextSession?.modules.length as number) > 0) {
        return nextSession?.modules[0];
      }
    }

    return null; // No next module
  };

  const getPreviousModule = () => {
    const { sessionIndex, moduleIndex } = findCurrentModuleIndex();
    if (sessionIndex === -1 || moduleIndex === -1) return null;

    const currentSession = sessions?.[sessionIndex];
    const prevModuleIndex = moduleIndex - 1;

    // Check if there's a previous module in current session
    if (prevModuleIndex >= 0) {
      return currentSession?.modules[prevModuleIndex];
    }

    // Check if there's a previous session
    if (sessionIndex - 1 >= 0) {
      const prevSession = sessions?.[sessionIndex - 1];
      if ((prevSession?.modules.length as number) > 0) {
        return prevSession?.modules[prevSession.modules.length - 1];
      }
    }

    return null; // No previous module
  };

  const handleCompleteModule = useCallback(
    async (type: "complete" | "next") => {
      mutation.mutateAsync({
        moduleId: module?.data?.id || "",
        type,
      });
    },
    [mutation, module?.data?.id]
  );
  useEffect(() => {
    setSessions(
      (classess?.data?.sessions || []).map((item) => ({
        ...item,
        isOpen: false,
      }))
    );
  }, [classess?.data?.sessions]);

  const handleClickModule = (moduleId: string) => {
    setSearchParams({
      ...queries,
      moduleId,
    });
  };
  return (
    <>
      <div
        className={`fixed bottom-0 transition-all duration-300 ${
          sidebarOpen ? "md:left-64" : "md:left-20"
        } left-0 right-0 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } p-4 border-t shadow-lg flex justify-end gap-4`}
      >
        <Button
          size="lg"
          variant={!getPreviousModule() ? "disabled" : "secondary"}
          onClick={() => {
            const prevModule = getPreviousModule();
            if (prevModule) {
              handleClickModule(prevModule.id);
            }
          }}
        >
          Previous
        </Button>
        <Button
          size="lg"
          onClick={() => handleCompleteModule("complete")}
          variant={
            !mutation.isPending && !module?.data?.isCompleted
              ? "primary"
              : "disabled"
          }
        >
          {mutation.isPending && mutation.variables?.type === "complete"
            ? "Loading..."
            : `Complete${module?.data?.isCompleted ? "d" : ""}`}
        </Button>

        <Button
          size="lg"
          variant={
            !getNextModule() || mutation.isPending ? "disabled" : "secondary"
          }
          onClick={async () => {
            if (!module?.data?.isCompleted) {
              await handleCompleteModule("next");
            }
            const nextModule = getNextModule();
            if (nextModule) {
              handleClickModule(nextModule.id);
            }
          }}
        >
          {mutation.isPending && mutation.variables?.type === "next"
            ? "Loading..."
            : "Next"}
        </Button>
      </div>
    </>
  );
};
