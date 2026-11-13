import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LearningRoot } from "./LearningRoot";

export const DashboardRoot = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <LearningRoot
        withSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      >
        <Outlet />
      </LearningRoot>
    </>
  );
};
