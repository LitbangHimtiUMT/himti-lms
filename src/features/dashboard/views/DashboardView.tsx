import { AssignmentTable } from "../components/AssignmentTable";
import { CreateSession } from "../components/create-session/CreateSession";

export const DashboardView = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <CreateSession />
      </div>
      <AssignmentTable />
    </div>
  );
};
