import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const DashboardRoot = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};
