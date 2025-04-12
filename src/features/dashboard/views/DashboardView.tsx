import { useNavigate } from "react-router-dom";
import { Button } from "../../_global/components/Button";
import { AssignmentTable } from "../components/AssignmentTable";

export const DashboardView = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold m-4 lg:m-6">Dashboard</h1>
        <div className="cursor-pointer">
          <Button
            onClick={() => navigate("/dashboard/create-session")}
            style={{
              cursor: "pointer",
            }}
          >
            Create Session
          </Button>
        </div>
      </div>
      <AssignmentTable />
    </div>
  );
};
