import { Link, useParams, useSearchParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { Button } from "../../_global/components/Button";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { Skeleton } from "../../_global/components/Shimer";
import { useProfile } from "../../profile/useProfile";
import { useDetailClass } from "../../class/hooks/useClasses";
import { DetailSessionContent } from "../components/sessions/detail-session/DetailSessionContent";

export const DetailSessionView = () => {
  const { sessionId, classId } = useParams();
  const { data: profile, isLoading, isFetching } = useProfile();
  // Skeleton only before the first load: a background refetch keeps
  // the resolved mentor state instead of flashing the button slot.
  const isProfileLoading = isLoading || (isFetching && !profile?.data);
  const { data: classes } = useDetailClass();
  const isCompleted = !!classes?.data?.completedAt;
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex lg:flex-row flex-col lg:items-start justify-between lg:gap-0 gap-4">
        <BreadCrumb
          items={[
            {
              name: `${from === "enrolled" ? "Enrolled Class" : "My Class"}`,
              to: `/dashboard/${
                from === "enrolled" ? "enrolled-class" : "my-class"
              }`,
            },
            {
              name: "Session",
              to: `/dashboard/my-class/${classId}${from ? `?from=${from}` : ""}`,
            },
            {
              name: "Module",
              to: `/dashboard/${classId}/${sessionId}`,
            },
          ]}
        />
        <ConditionNode
          condition={
            !!profile?.data?.isMentor
          }
          option={
            isProfileLoading ? (
              // Same slot as the button below: lg:w-48 w-full,
              // Button md 32px. Without it the area is empty while
              // the profile loads, then the button pops in.
              <div className="lg:w-48 w-full shrink-0">
                <Skeleton width="100%" height="2rem" />
              </div>
            ) : null
          }
        >
          {/* The Button is w-full by design, so it needs a
              width-constraining wrapper or it squeezes the breadcrumb
              as a direct flex child (same w-48 pattern as the class
              detail header). */}
          <div className="lg:w-48 w-full shrink-0">
            {isCompleted ? (
              <Button variant="disabled">Create Modules</Button>
            ) : (
              <Link
                className="block"
                to={`/dashboard/${classId}/${sessionId}/create-modules${
                  from ? `?from=${from}` : ""
                }`}
              >
                <Button>Create Modules</Button>
              </Link>
            )}
          </div>
        </ConditionNode>
      </div>
      <DetailSessionContent />
    </div>
  );
};
