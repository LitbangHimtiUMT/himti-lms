import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";

export const DashboardRoot = () => {
  return (
    <>
      <div>
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
