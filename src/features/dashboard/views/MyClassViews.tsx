import { useNavigate } from "react-router-dom";
import { Button } from "../../_global/components/Button";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { useProfile } from "../../profile/useProfile";
import { TableCreatedClassessList } from "../components/classess/classess-list/TableCreatedClassessList";

export const MyClassViews = () => {
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex lg:flex-row flex-col lg:items-start justify-between lg:gap-0 gap-4">
        <h1 className="text-3xl font-bold">My Classess</h1>
        <ConditionNode condition={!!profile?.data?.isMentor}>
          <div>
            <Button
              size="lg"
              onClick={() => navigate("/dashboard/my-class/create")}
            >
              Create Class
            </Button>
          </div>
        </ConditionNode>
      </div>
      <TableCreatedClassessList />
    </div>
  );
};
