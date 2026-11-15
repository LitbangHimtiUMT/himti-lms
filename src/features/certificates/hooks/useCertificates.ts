import { useSearchParams } from "react-router-dom";
import useDebounce from "../../_global/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
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
  });
};
