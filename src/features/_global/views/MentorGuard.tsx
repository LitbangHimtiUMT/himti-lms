import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../../profile/useProfile";

// Role guard for the mentor-management routes under /dashboard. The
// sidebar only hides "My Class" for non-mentors (useMenus), so without
// this anyone could open the create/edit pages directly by URL. While
// the profile is loading the child route is not rendered, so the form
// never shows before the role is known.
export const MentorGuard = () => {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) return null;
  if (!profile?.data?.isMentor) {
    return <Navigate to="/dashboard/enrolled-class" replace />;
  }

  return <Outlet />;
};
