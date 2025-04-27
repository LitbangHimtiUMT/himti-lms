import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../../features/_global/components/NotFound";
import { RootViews } from "../../features/_global/views";
import { AuthLayout } from "../../features/_global/views/AuthLayout";
import { DashboardRoot } from "../../features/_global/views/DashboardRoot";
import { InvitationRoot } from "../../features/_global/views/InvitationRoot";
import { Playground } from "../../features/_global/views/playground";
import { SignInViews } from "../../features/authentication/views/sign-in";
import { SignUpViews } from "../../features/authentication/views/sign-up";
import { ClassViews } from "../../features/class/views/ClassViews";
import { CreateClassessViews } from "../../features/dashboard/views/CreateClassessViews";
import { CreateModules } from "../../features/dashboard/views/CreateModules";
import { DetailModuleView } from "../../features/dashboard/views/DetailModuleView";
import { DetailSessionView } from "../../features/dashboard/views/DetailSessionView";
import { EnrolledClassViews } from "../../features/dashboard/views/EnrolledClassViews";
import { MyClassViews } from "../../features/dashboard/views/MyClassViews";
import { FaqViews } from "../../features/faq/views/FaqViews";
import { HomeViews } from "../../features/home/views/HomeViews";
import { InvitationUseCodeViews } from "../../features/invitations/views/InvitationUseCodeViews";
import { MentorViews } from "../../features/mentor/views/MentorViews";
import { SessionViews } from "../../features/dashboard/views/SessionViews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootViews />,
    children: [
      {
        path: "/",
        element: <HomeViews />,
      },
      {
        path: "/class",
        element: <ClassViews />,
      },
      {
        path: "/mentors",
        element: <MentorViews />,
      },
      {
        path: "/faq",
        element: <FaqViews />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignInViews />,
      },
      {
        path: "/sign-up",
        element: <SignUpViews />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardRoot />,
    children: [
      {
        path: "/dashboard/my-class",
        element: <MyClassViews />,
      },
      {
        path: "/dashboard/enrolled-class",
        element: <EnrolledClassViews />,
      },
      {
        path: "/dashboard/class/:classId",
        element: <SessionViews />,
      },
      {
        path: "/dashboard/class/create",
        element: <CreateClassessViews />,
      },
      {
        path: "/dashboard/:classId/:sessionId/create-modules",
        element: <CreateModules />,
      },
      {
        path: "/dashboard/:classId/:sessionId",
        element: <DetailSessionView />,
      },
      {
        path: "/dashboard/:classId/:sessionId/:moduleId",
        element: <DetailModuleView />,
      },
    ],
  },
  {
    path: "/invitation",
    element: <InvitationRoot />,
    children: [
      {
        path: "/invitation/:code",
        element: <InvitationUseCodeViews />,
      },
    ],
  },
  {
    path: "/playground",
    element: <Playground />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
