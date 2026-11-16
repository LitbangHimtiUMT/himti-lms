import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { mentorService } from "../../../core/services/mentor";
import useDebounce from "../../_global/hooks/useDebounce";

export const useMentors = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;
  const searchQuery = searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);

  const query = useQuery({
    queryKey: ["mentors", { page, perPage, search }],
    queryFn: () =>
      mentorService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
          search,
        },
      }),
  });

  return query;
};
