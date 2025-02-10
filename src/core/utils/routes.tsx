import { createBrowserRouter } from "react-router-dom";
import { RootViews } from "../../features/_global/views";
import { HomeViews } from "../../features/home/views/HomeViews";
import { ClassViews } from "../../features/class/views/ClassViews";
import { FaqViews } from "../../features/faq/views/FaqViews";
import { MentorViews } from "../../features/mentor/views/MentorViews";
import { NotFound } from "../../features/_global/components/NotFound";
import { DashboardRoot } from "../../features/_global/views/DashboardRoot";
import { AuthLayout } from "../../features/_global/views/AuthLayout";
import { SignInViews } from "../../features/authentication/views/sign-in";
import { SignUpViews } from "../../features/authentication/views/sign-up";
import { Playground } from "../../features/_global/views/playground";

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
