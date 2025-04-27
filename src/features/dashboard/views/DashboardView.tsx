import { ConditionNode } from "../../_global/components/ConditionNode";
import { useProfile } from "../../profile/useProfile";
import { TableCreatedClassessList } from "../components/classess/classess-list/TableCreatedClassessList";
import { CreateSession } from "../components/sessions/create-session/CreateSession";

export const DashboardView = () => {
  const { data: profile } = useProfile();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex lg:flex-row flex-col lg:items-start justify-between lg:gap-0 gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ConditionNode condition={!!profile?.data?.isMentor}>
          <CreateSession />
        </ConditionNode>
      </div>
      
      <TableCreatedClassessList />
    </div>
  );
};
