import { createBrowserRouter } from "react-router-dom";
import { RootViews } from "../../features/_global/views";
import { HomeViews } from "../../features/home/views/HomeViews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootViews />,
    children: [
      {
        path: "/",
        element: <HomeViews />,
      },
    ],
  },
]);
