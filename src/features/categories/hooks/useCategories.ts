import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../../../core/services/categories";

interface CategoriesQueries {
  page?: number;
  perPage?: number;
  enabled?: boolean;
}

export const useCategories = (queries?: CategoriesQueries) => {
  const { page = 1, perPage = 999, enabled = true } = queries ?? {};
  const query = useQuery({
    queryKey: ["categories", { page, perPage, enabled }],
    queryFn: () =>
      categoriesService.get({
        queryParams: {
          page,
          perPage,
        },
      }),
    enabled,
  });
  return query;
};
