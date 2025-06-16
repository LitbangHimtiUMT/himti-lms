import { Link, useParams, useSearchParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { Button } from "../../_global/components/Button";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { useProfile } from "../../profile/useProfile";
import { DetailSessionContent } from "../components/sessions/detail-session/DetailSessionContent";

export const DetailSessionView = () => {
  const { sessionId, classId } = useParams();
  const { data: profile } = useProfile();
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
          <Link
            to={`/dashboard/${classId}/${sessionId}/create-modules${
              from ? `?from=${from}` : ""
            }`}
          >
            <Button>Create Modules</Button>
          </Link>
        </ConditionNode>
      </div>
      <DetailSessionContent />
    </div>
  );
};
