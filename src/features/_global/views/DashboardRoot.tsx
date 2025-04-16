import { Outlet, useLocation } from "react-router-dom";
import { LearningRoot } from "./LearningRoot";

export const DashboardRoot = () => {
  const location = useLocation();
  return (
    <>
      <LearningRoot
        withSidebar={
          !location.pathname.includes("create") &&
          !location.pathname.includes("update")
        }
      >
        <Outlet />
      </LearningRoot>
    </>
  );
};
