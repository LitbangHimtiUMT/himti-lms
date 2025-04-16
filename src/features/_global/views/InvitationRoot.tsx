import { Outlet } from "react-router-dom";
import { LearningRoot } from "./LearningRoot";

export const InvitationRoot = () => {
  return (
    <>
      <LearningRoot withSidebar={false}>
        <Outlet />
      </LearningRoot>
    </>
  );
};
