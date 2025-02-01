import { useQuery } from "@tanstack/react-query";
import { mentorService } from "../../../core/services/mentor";
import { CONFIG_APP } from "../../../core/configs/app";

export const useMentors = () => {
  const query = useQuery({
    queryKey: ["mentors"],
    queryFn: () =>
      mentorService.get({
        headers: {
          [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
        },
      }),
  });

  return query;
};
