import { useSearchParams } from "react-router-dom";
import useDebounce from "../../_global/hooks/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { certificateService } from "../../../core/services/certificates";

export const useCertificates = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const searchQuery = useDebounce(search as string, 500);
  const page = searchParams.get("page") || undefined;
  const perPage = searchParams.get("perPage") || undefined;
  return useQuery({
    queryKey: ["certificates", { search: searchQuery, page, perPage }],
    queryFn: () =>
      certificateService.get({
        queryParams: {
          ...(searchQuery && {
            search: searchQuery,
          }),
          page: page ? Number(page) : undefined,
          perPage: perPage ? Number(perPage) : undefined,
        },
      }),
    // The global default is refetchOnMount: false; the list must be
    // fresh every time the user lands here, or a just-claimed
    // certificate stays invisible until a manual retry.
    refetchOnMount: true,
    // Keep the previous page visible while the next one loads, so
    // paging/search does not swap the table for skeletons.
    placeholderData: keepPreviousData,
  });
};
