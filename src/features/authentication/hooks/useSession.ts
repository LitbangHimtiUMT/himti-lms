import { authService } from "@core/services/auth";
import { useQuery } from "@tanstack/react-query";

// Cache key for the session probe. Logout invalidates this exact key
// so every guard and navbar re-probes instead of trusting stale state.
export const SESSION_QUERY_KEY = ["session"];

// Session probe: GET /auth/token with the httpOnly cookie. A 200 means
// the session is alive, a 401 means it is not. The request wrapper
// never refreshes or redirects for /auth/* endpoints, so the probe
// cannot loop. No retries: a failed probe is a signed-out verdict,
// not something to hammer.
export const useSession = () => {
  const query = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: () => authService.check(),
    retry: false,
  });

  return {
    isAuthenticated: query.isSuccess,
    isLoading: query.isPending,
  };
};
