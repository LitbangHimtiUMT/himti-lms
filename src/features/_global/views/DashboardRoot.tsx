import { Outlet } from "react-router-dom";
import { LearningRoot } from "./LearningRoot";

export const DashboardRoot = () => {
  return (
    <>
      <LearningRoot withSidebar>
        <Outlet />
      </LearningRoot>
    </>
  );
};
