import { Navigate, Outlet } from "react-router-dom";
import { CONFIG_APP } from "../../../core/configs/app";

// Login gate for routes that must not render for guests. Same
// token-presence check as LearningRoot: token validity is enforced
// by the API (401 flow), this only keeps guests out of the page.
export const RequireAuth = () => {
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
  if (!token) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
};
