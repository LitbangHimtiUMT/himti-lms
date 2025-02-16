import { useQuery } from "@tanstack/react-query";
import { profileService } from "../../core/services/profile";

export const useProfile = () => {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
  });
  return query;
};
