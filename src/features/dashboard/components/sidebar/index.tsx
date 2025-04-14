import { IoBookOutline } from "react-icons/io5";
import { useClasses } from "../../../class/hooks/useClasses";
import { Skeleton } from "../../../_global/components/Shimer";
import { ClassCard } from "../ClassCard";
import { useProfile } from "../../../profile/useProfile";
import { ConditionNode } from "../../../_global/components/ConditionNode";
import { Button } from "../../../_global/components/Button";

export const DashboardSidebar = () => {
  const { data: profile } = useProfile();
  const { data: classess, isFetching } = useClasses({
    path: profile?.data?.isMentor ? undefined : "user",
  });

  return (
    <div className="h-max min-h-64 overflow-hidden w-80 bg-[#E5E7EB] sticky top-20 left-0 rounded-lg">
      {/* Header */}
      <div className="bg-[#192d4c] text-white p-4 rounded-t-lg flex items-center gap-3 sticky top-0 left-0">
        <IoBookOutline className="w-5 h-5" />
        <span className="font-medium">Courses</span>
      </div>

      {/* Course List Card */}
      <div className="p-4 lg-max:h-[500px] overflow-auto flex flex-col gap-2">
        <ConditionNode condition={!!profile?.data?.isMentor}>
          <Button variant="primary" size="lg">Create Course</Button>
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
                  border={index === (classess?.data?.length as number) - 1}
                  {...course}
                />
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
