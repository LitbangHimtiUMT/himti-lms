import { useAtom } from "jotai";
import { Skeleton } from "../../../_global/components/Shimer";
import { LearningSidebarAtom } from "../../../_global/store";

// The skeleton follows the state that will render, as far as it is
// knowable while loading: mode comes from the URL (history always
// shows the submission card, never the form), and a known-closed
// assignment shows the yellow banner instead of the form. What is
// not knowable yet (isSubmit inside mode "current") defaults to the
// form, the common case.
export const AssignmentDetailSkeleton = ({
  mode,
  isOpen,
}: {
  mode: "current" | "history";
  isOpen?: boolean;
}) => {
  const [sidebarOpen] = useAtom(LearningSidebarAtom);

  return (
    <div
      className={`p-4 md:p-6 transition-all duration-300 ${
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      } w-full max-w-[1920px] mx-auto`}
    >
      {/* Back row: 1 chevron icon (24px) + text (24px line). */}
      <div className="flex items-center gap-1 mb-6">
        <Skeleton width="1.5rem" height="1.5rem" />
        <Skeleton width="9rem" height="1.5rem" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignment Header Skeleton */}
          <div className="bg-white rounded-lg border p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="space-y-2">
                <Skeleton height="2rem" width="75%" />
                <Skeleton height="1.5rem" width="50%" />
              </div>
              {/* Due badge: text-sm (20px) + py-2 (16px) = 36px.
                  Only in mode "current" — history has no badge. */}
              {mode === "current" && (
                <Skeleton width="10rem" height="2.25rem" />
              )}
            </div>

            {/* Metadata Skeleton: only 2 cells exist (Type,
                Status), not 4. Label text-sm 20px, value 24px. */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton height="1.25rem" width="4rem" />
                  <Skeleton height="1.5rem" width="6rem" />
                </div>
              ))}
            </div>

            {/* Description Skeleton: h3 text-lg 28px, prose lines
                24px pitch (16px text on a 28px line, space-y-2). */}
            <div className="space-y-2">
              <Skeleton height="1.75rem" width="8rem" />
              <Skeleton height="1.5rem" width="100%" />
              <Skeleton height="1.5rem" width="83.33%" />
              <Skeleton height="1.5rem" width="66.66%" />
            </div>
          </div>

          {mode === "history" ? (
            // Submission card, like CardSubmission: title 28px,
            // info grid (label 20px + value 24px), files box
            // (one p-4 row: icon + name + download icon).
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <Skeleton height="1.75rem" width="12rem" className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Skeleton
                    height="1.5rem"
                    width="10rem"
                    className="mb-3"
                  />
                  <div className="space-y-3">
                    <div>
                      <Skeleton height="1.25rem" width="5rem" />
                      <Skeleton height="1.5rem" width="8rem" />
                    </div>
                    <div>
                      <Skeleton height="1.25rem" width="4rem" />
                      <Skeleton
                        height="1.375rem"
                        width="5rem"
                        borderRadius="9999px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Skeleton height="1.5rem" width="9rem" className="mb-3" />
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Skeleton width="1rem" height="1rem" />
                      <Skeleton width="12rem" height="1.5rem" />
                    </div>
                    <Skeleton width="1rem" height="1rem" />
                  </div>
                </div>
              </div>
            </div>
          ) : isOpen === false ? (
            // Closed assignment: the yellow banner (p-4 + 1-2 text
            // lines, ~72px) and no buttons — the form never renders.
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <Skeleton height="1.75rem" width="12rem" />
              <Skeleton height="4.5rem" width="100%" className="mt-4" />
            </div>
          ) : (
            // Submission Form Skeleton: title text-xl 28px, upload
            // block, then Clear left + Submit right (Button md
            // 32px, justify-between — not justify-end 40px).
            <div className="bg-white rounded-lg border p-6 shadow-sm space-y-4">
              <Skeleton height="1.75rem" width="12rem" />
              <Skeleton height="10rem" width="100%" />
              <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
                <Skeleton height="2rem" width="6rem" />
                <Skeleton height="2rem" width="10rem" />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Skeleton: Instructor card (title 24px, avatar
            40px round, name 24px). */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6 shadow-sm space-y-4">
            <Skeleton height="1.5rem" width="6rem" />
            <div className="flex items-center gap-3">
              <Skeleton
                width="2.5rem"
                height="2.5rem"
                borderRadius="9999px"
              />
              <Skeleton height="1.5rem" width="8rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
