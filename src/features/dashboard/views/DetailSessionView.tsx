import { Link, useParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { DetailSessionContent } from "../components/detail-session/DetailSessionContent";
import { Button } from "../../_global/components/Button";

export const DetailSessionView = () => {
  const { sessionId } = useParams();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between p-0 m-0">
        <BreadCrumb
          items={[
            {
              name: "Dashboard",
              to: "/dashboard",
            },
            {
              name: "Detail Session",
              to: `/dashboard/${sessionId}`,
            },
          ]}
        />
        <Link to={`/dashboard/${sessionId}/create-modules`}>
        <Button>Create Modules</Button>
        </Link>
      </div>
      <DetailSessionContent />
    </div>
  );
};
