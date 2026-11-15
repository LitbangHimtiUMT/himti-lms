import { useQuery } from "@tanstack/react-query";
import { profileService } from "../../core/services/profile";
import { useSession } from "../authentication/hooks/useSession";

export const useProfile = () => {
  const { isAuthenticated, isLoading: isSessionLoading } = useSession();

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
    // Guests must not fire the profile request: a 401 there would
    // make the request wrapper refresh and redirect off public pages.
    enabled: isAuthenticated,
  });

  // While the session probe is pending the profile cannot load yet.
  // Report that as loading so guards (MentorGuard) neither render
  // nor redirect before the role is known. A 401 on the profile
  // itself is handled by the request wrapper (refresh, then retry),
  // so there is no manual refresh path here.
  return {
    ...query,
    isLoading: isSessionLoading || query.isLoading,
    isFetching: isSessionLoading || query.isFetching,
  };
};
