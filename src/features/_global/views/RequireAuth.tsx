import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../authentication/hooks/useSession";

// Login gate for routes that must not render for guests. The session
// probe decides: while it is pending nothing renders, so protected
// content never flashes before the session is known.
export const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
};
