import HIMTI from "@core/assets/logo/HIMTI.png";
import { useAtom } from "jotai";
import { CheckCircle, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { HiDocumentMinus, HiDocumentText } from "react-icons/hi2";
import { IoChevronForward, IoChevronUp } from "react-icons/io5";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { useDetailClass } from "../../class/hooks/useClasses";
import { convertQueryParamsToObject } from "../helper";
import { DarkModeAtom, LearningSidebarAtom } from "../store";
import { Skeleton } from "../components/Shimer";

export const LearningUserRoot = () => {
  const [darkMode, setDarkMode] = useAtom(DarkModeAtom);

  const [sidebarOpen, setSidebarOpen] = useAtom(LearningSidebarAtom);
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: classess, isFetching } = useDetailClass();
  const [modules, setModules] = useState(
    classess?.data?.sessions.map((item) => ({
      ...item,
      isOpen: false,
    }))
  );
  const queries = convertQueryParamsToObject(searchParams.toString());
  const moduleIdQs = searchParams.get("moduleId") || "";

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
      classess?.data?.sessions.map((item, index) => {
        const isOpen  = moduleIdQs ? item.modules.map(mdl => mdl.id).includes(moduleIdQs) : !index
        return { ...item, isOpen }
      })
    );
  }, [classess?.data?.sessions, moduleIdQs]);

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
  return (
    <>
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
                        <Link
                          to={"/dashboard/enrolled-class"}
                          className="w-full"
                        >
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
            {isFetching ? (
              <div className="flex flex-col gap-4 px-2 mt-2">
                {Array.from({ length: 4 }).map(() => (
                  <>
                    <Skeleton width="100%" height="40px" />
                  </>
                ))}
              </div>
            ) : (
              (modules || []).map((module, index) => (
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
                                <CheckCircle
                                  className="text-green-500"
                                  size={16}
                                />
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
              ))
            )}
          </div>
        </div>

        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleSidebar}
          />
        )}
        <Outlet />
      </div>
    </>
  );
};
