import HIMTI from "@core/assets/logo/HIMTI.png";
import { CheckCircle, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { HiDocumentMinus, HiDocumentText } from "react-icons/hi2";
import { IoChevronForward, IoChevronUp } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import { useDetailClass } from "../../class/hooks/useClasses";
import { Button } from "../../_global/components/Button";
import { convertQueryParamsToObject } from "../../_global/helper";
import { useDetailModule } from "../../dashboard/hooks/modules/useModules";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { YoutubeEmbed } from "../../dashboard/components/modules/detail-modules/EmbededYoutube";
import { AssignmentView } from "./AssignmentView";
import { ModuleDTO } from "../../../core/model/modules";

export const LearningDashboardView = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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

  const { data: module } = useDetailModule(moduleIdQs);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setModules(
      classess?.data?.sessions.map((item) => ({ ...item, isOpen: false }))
    );
  }, [classess?.data?.sessions]);

  // Toggle module open/close
  const toggleModule = (index: number) => {
    const updatedModules = [...(modules || [])];
    if (updatedModules[index].modules.length) {
      updatedModules[index].isOpen = !updatedModules[index].isOpen;
      setModules(updatedModules);
    }
  };

  const handleClickModule = (moduleId: string) => {
    setSearchParams({
      ...queries,
      moduleId,
    });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
    <div
      className={`flex min-h-screen h-full w-full ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed z-20 top-0 left-0 bottom-0 w-64 transition-all duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-md ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0 md:w-20"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <X
              size={24}
              className="text-gray-500 cursor-pointer"
              onClick={toggleSidebar}
            />
          ) : (
            <Menu
              size={24}
              className="text-gray-500 cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
        </div>

        {sidebarOpen && (
          <>
            <img src={HIMTI} width={100} className="mx-2" alt="HIMTI" />
            <div
              className={`border-b ${
                darkMode ? "border-white" : "border-gray-200"
              }`}
            >
              <div
                className="p-2 flex items-start justify-between cursor-pointer"
                // onClick={() => toggleModule(index)}
              >
                {sidebarOpen ? (
                  <>
                    <div className="w-full">
                      <Link to={"/dashboard/enrolled-class"} className="w-full">
                        <div className="w-full px-2 py-2 rounded-lg">
                          <h3 className="font-medium">Back to Dashboard</h3>
                        </div>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="w-full flex justify-center">
                    <HiDocumentMinus size={20} />
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <span className="font-medium">Dark Mode</span>
                <div
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                    darkMode ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={toggleDarkMode}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                      darkMode ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Course Modules */}
        <div className="overflow-y-auto h-full pb-20">
          {(modules || []).map((module, index) => (
            <div
              key={index}
              className={`border-b ${
                darkMode ? "border-white" : "border-gray-200"
              }`}
            >
              <div
                className="p-4 flex items-start justify-between cursor-pointer"
                onClick={() => toggleModule(index)}
              >
                {sidebarOpen ? (
                  <>
                    <div className="flex items-center gap-2 cursor-pointer">
                      {module.isOpen ? (
                        <IoChevronUp size={16} />
                      ) : (
                        <IoChevronForward size={16} />
                      )}
                      <h3 className="font-medium">{module.name}</h3>
                    </div>
                  </>
                ) : (
                  <div className="w-full flex justify-center">
                    <HiDocumentMinus size={20} />
                  </div>
                )}
              </div>

              {sidebarOpen && module.isOpen && module.modules && (
                <div className="pl-4 pr-2 pb-2">
                  {module.modules.map((lesson, i) => {
                    const isActive = lesson.id === moduleIdQs; // Cek apakah module aktif
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-lg mb-2 flex items-center ${
                          lesson.isCompleted
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
                        } ${
                          darkMode
                            ? isActive
                              ? "bg-gray-700 border-l-4 border-blue-500"
                              : "hover:bg-gray-700 bg-gray-700"
                            : isActive
                            ? "bg-blue-50 border-l-4 border-blue-500"
                            : "hover:bg-gray-50"
                        } cursor-pointer transition-colors duration-200`}
                        onClick={() => handleClickModule(lesson.id)}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            isActive
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {lesson.isCompleted ? (
                            <CheckCircle className="text-green-500" size={16} />
                          ) : (
                            <HiDocumentText size={16} />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`text-sm font-medium ${
                              isActive ? "text-blue-600" : ""
                            }`}
                          >
                            {lesson.name}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}

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
        {module ? (
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
            className={`fixed bottom-0 right-0 left-0 md:left-64 transition-all duration-300 ${
              sidebarOpen ? "md:left-64" : "md:left-20"
            } ${
              darkMode ? "bg-gray-800" : "bg-white"
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
              // variant="outline"
            >
              Previous
            </Button>

            <Button size="lg">Complete</Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                const nextModule = getNextModule();
                if (nextModule) {
                  handleClickModule(nextModule.id);
                }
              }}
              disabled={!getNextModule()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
