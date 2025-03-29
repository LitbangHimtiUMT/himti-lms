import { IoBookOutline } from "react-icons/io5";
import { useClasses } from "../../../class/hooks/useClasses";
import { Skeleton } from "../../../_global/components/Shimer";
import { ClassCard } from "../ClassCard";

export const DashboardSidebar = () => {
  const { data: classess, isFetching } = useClasses({
    path: "user",
  });

  return (
    <div className="h-max min-h-64 overflow-hidden w-80 bg-[#E5E7EB] sticky top-20 left-0 rounded-lg">
      {/* Header */}
      <div className="bg-[#2B4B7C] text-white p-4 rounded-t-lg flex items-center gap-3 sticky top-0 left-0">
        <IoBookOutline className="w-5 h-5" />
        <span className="font-medium">Course Progress</span>
      </div>

      {/* Course List Card */}
      <div className="p-4 lg-max:h-[500px] overflow-auto">
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
