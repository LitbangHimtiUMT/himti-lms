import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../../../core/services/categories";

export const useCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesService.get(),
  });
  return query;
};
