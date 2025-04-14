import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../../features/_global/components/NotFound";
import { RootViews } from "../../features/_global/views";
import { AuthLayout } from "../../features/_global/views/AuthLayout";
import { DashboardRoot } from "../../features/_global/views/DashboardRoot";
import { Playground } from "../../features/_global/views/playground";
import { SignInViews } from "../../features/authentication/views/sign-in";
import { SignUpViews } from "../../features/authentication/views/sign-up";
import { ClassViews } from "../../features/class/views/ClassViews";
import { CreateModules } from "../../features/dashboard/views/CreateModules";
import { DashboardView } from "../../features/dashboard/views/DashboardView";
import { FaqViews } from "../../features/faq/views/FaqViews";
import { HomeViews } from "../../features/home/views/HomeViews";
import { MentorViews } from "../../features/mentor/views/MentorViews";
import { DetailSessionView } from "../../features/dashboard/views/DetailSessionView";

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
        path: "/dashboard",
        element: <DashboardView />,
      },
      {
        path: "/dashboard/:sessionId/create-modules",
        element: <CreateModules />,
      },
      {
        path: "/dashboard/:sessionId",
        element: <DetailSessionView />,
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
