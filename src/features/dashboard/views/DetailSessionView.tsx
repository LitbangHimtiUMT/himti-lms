import { Link, useParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { DetailSessionContent } from "../components/sessions/detail-session/DetailSessionContent";
import { Button } from "../../_global/components/Button";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { useProfile } from "../../profile/useProfile";

export const DetailSessionView = () => {
  const { sessionId, classId } = useParams();
  const {data: profile} = useProfile()
  return (
    <div className="flex flex-col gap-5">
      <div className="flex lg:flex-row flex-col lg:items-start justify-between lg:gap-0 gap-4">
        <BreadCrumb
          items={[
            {
              name: "Dashboard",
              to: "/dashboard",
            },
            {
              name: "Detail Session",
              to: `/dashboard/${classId}/${sessionId}`,
            },
          ]}
        />
        <ConditionNode condition={!!profile?.data?.isMentor}>
          <Link to={`/dashboard/${classId}/${sessionId}/create-modules`}>
            <Button>Create Modules</Button>
          </Link>
        </ConditionNode>
      </div>
      <DetailSessionContent />
    </div>
  );
};
