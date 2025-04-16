import { useState } from "react";
import { IoBookOutline, IoMenuOutline } from "react-icons/io5";
import { Button } from "../../../_global/components/Button";
import { ConditionNode } from "../../../_global/components/ConditionNode";
import { Skeleton } from "../../../_global/components/Shimer";
import { useClasses } from "../../../class/hooks/useClasses";
import { useProfile } from "../../../profile/useProfile";
import { ClassCard } from "../ClassCard";

export const DashboardSidebar = () => {
  const { data: profile } = useProfile();
  const { data: classess, isFetching } = useClasses({
    path: profile?.data?.isMentor ? undefined : "user",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`fixed top-18 left-0 transform lg:relative lg:ml-2 lg:mt-4 lg:translate-x-0 transition duration-200 ease-in-out z-30
  ${sidebarOpen ? "translate-x-2" : "-translate-x-full lg:translate-x-0"}
`}
    >
      <div className="h-max min-h-64 overflow-hidden lg:w-96 w-full bg-[#E5E7EB] sticky top-20 left-0 rounded-lg">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`lg:hidden fixed top-3 ${sidebarOpen ? 'left-0' : 'left-[100%]'} z-50 p-2 rounded-e-2xl bg-white shadow-xl`}
        >
          <IoMenuOutline className="w-4 h-4" />
        </button>
        {/* Header */}
        <div className="bg-[#192d4c] text-white p-4 rounded-t-lg sticky top-0">
          <div className="flex items-center gap-3 text-white relative left-7">
          <IoBookOutline className="w-5 h-5" />
          <span className="font-medium">Courses</span>
          </div>
        </div>

        {/* Course List Card */}
        <div className="p-4 lg-max:h-[500px] overflow-auto flex flex-col gap-2">
          <ConditionNode condition={!!profile?.data?.isMentor}>
            <Button variant="primary" size="lg">
              Create Course
            </Button>
          </ConditionNode>
          <div className="bg-white rounded-lg shadow-sm p-4">
            {isFetching ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className={`mb-4 ${
                      index === (classess?.data?.length as number) - 1
                        ? ""
                        : "mb-6"
                    }`}
                  >
                    <Skeleton width="100%" height="75px" />
                  </div>
                ))}
              </>
            ) : (
              classess?.data?.map((course, index) => (
                <>
                  <ClassCard
                    {...course}
                    border={index === (classess?.data?.length as number) - 1}
                    code={course.code ? atob(course.code) : undefined}
                  />
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
