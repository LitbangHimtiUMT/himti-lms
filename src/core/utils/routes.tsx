import { createBrowserRouter } from "react-router-dom";
import { RootViews } from "../../features/_global/views";
import { HomeViews } from "../../features/home/views/HomeViews";
import { ClassViews } from "../../features/class/views/ClassViews";
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
