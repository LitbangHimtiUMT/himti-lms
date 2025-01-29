import { createBrowserRouter } from "react-router-dom";
import { RootViews } from "../../features/_global/views";
import { HomeViews } from "../../features/home/views/HomeViews";
import { ClassViews } from "../../features/class/views/ClassViews";
import { FaqViews } from "../../features/faq/views/FaqViews";
import { MentorViews } from "../../features/mentor/views/MentorViews";
import { NotFound } from "../../features/_global/components/NotFound";
import { DashboardRoot } from "../../features/_global/views/DashboardRoot";

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
    path: "/dashboard",
    element: <DashboardRoot />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
