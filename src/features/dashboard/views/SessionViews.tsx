import { useParams, useSearchParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { useProfile } from "../../profile/useProfile";
import { SessionTable } from "../components/SessionTable";
import { CreateSession } from "../components/sessions/create-session/CreateSession";

export const SessionViews = () => {
  const { data: profile } = useProfile();
  const { classId } = useParams();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <BreadCrumb
            items={[
              {
                name: `${from === "enrolled" ? "Enrolled Class" : "My Class"}`,
                to: `/dashboard/${
                  from === "enrolled" ? "enrolled-class" : "my-class"
                }`,
              },
              {
                name: "Sessions",
                to: `/dashboard/my-class/${classId}`,
              },
            ]}
          />
          <div className="flex lg:flex-row flex-col lg:items-start justify-between lg:gap-0 gap-4">
            <h1 className="text-3xl font-bold">Sessions</h1>
            <ConditionNode condition={!!profile?.data?.isMentor}>
              <CreateSession />
            </ConditionNode>
          </div>
        </div>
        <SessionTable />
      </div>
    </>
  );
};
