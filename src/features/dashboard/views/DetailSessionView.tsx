import { Link, useParams, useSearchParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { Button } from "../../_global/components/Button";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { useProfile } from "../../profile/useProfile";
import { useDetailClass } from "../../class/hooks/useClasses";
import { DetailSessionContent } from "../components/sessions/detail-session/DetailSessionContent";

export const DetailSessionView = () => {
  const { sessionId, classId } = useParams();
  const { data: profile } = useProfile();
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
