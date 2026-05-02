import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { classesService } from "../../../../core/services/classes";
import useDebounce from "../../../_global/hooks/useDebounce";
import { mentorService } from "../../../../core/services/mentor";
import { CONFIG_APP } from "../../../../core/configs/app";

interface Query {
  path?: string;
  search?: string;
  enabled?: boolean;
  classId?: string;
  page?: number;
  perPage?: number;
}

export const useClassMentors = (query: Query) => {
  const { search, enabled = true, path } = query;
  const searchQuery = useDebounce(search ?? "", 500);
  const { classId } = useParams();
  return useQuery({
    queryKey: [
      "class-mentors",
      {
        path,
        search: searchQuery,
      },
    ],
    queryFn: () => {
      return classesService.mentor({
        path: `mentor/${classId}`,
        queryParams: {
          ...(searchQuery && {
            search: searchQuery,
          }),
        },
      });
    },
    enabled,
  });
};

export const useMentors = (queryParams?: Query) => {
  const query = useQuery({
    queryKey: ["mentor-list"],
    queryFn: () =>
      mentorService.get({
        queryParams,
        headers: {
          [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
        },
      }),
      enabled: !!queryParams?.enabled
  });
  return query;
};
