import { useAtom } from "jotai";
import { Skeleton } from "../../../_global/components/Shimer";
import { LearningSidebarAtom } from "../../../_global/store";

export const AssignmentDetailSkeleton = () => {
  const [sidebarOpen] = useAtom(LearningSidebarAtom);

  return (
    <div
      className={`p-4 md:p-6 transition-all duration-300 ${
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      } w-full max-w-[1920px] mx-auto`}
    >
      <div className="flex items-center gap-1 mb-6">
        <Skeleton width="1.5rem" height="1.5rem" />
        <Skeleton width="1.5rem" height="1.5rem" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignment Header Skeleton */}
          <div className="bg-white rounded-lg border p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="space-y-2">
                <Skeleton height="2rem" width="75%" />
                <Skeleton height="1.25rem" width="50%" />
              </div>
              <Skeleton width="10rem" height="2rem" />
            </div>

            {/* Metadata Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton height="1rem" width="4rem" />
                  <Skeleton height="1.5rem" width="6rem" />
                </div>
              ))}
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton height="1.5rem" width="8rem" />
              <Skeleton height="1rem" width="100%" />
              <Skeleton height="1rem" width="83.33%" />
              <Skeleton height="1rem" width="66.66%" />
            </div>
          </div>

          {/* Submission Form Skeleton */}
          <div className="bg-white rounded-lg border p-6 shadow-sm space-y-4">
            <Skeleton height="2rem" width="12rem" />
            <Skeleton height="10rem" width="100%" />
            <div className="flex justify-end gap-4">
              <Skeleton height="2.5rem" width="6rem" />
              <Skeleton height="2.5rem" width="10rem" />
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6 shadow-sm space-y-4">
            <Skeleton height="1.5rem" width="6rem" />
            <div className="flex items-center gap-3">
              <Skeleton width="2.5rem" height="2.5rem" />
              <Skeleton height="1.25rem" width="8rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
