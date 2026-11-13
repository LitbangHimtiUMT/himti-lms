import { useQuery } from "@tanstack/react-query";
import { mentorService } from "../../../core/services/mentor";

export const useMentors = () => {
  const query = useQuery({
    queryKey: ["mentors"],
    queryFn: () =>
      mentorService.get(),
  });

  return query;
};
