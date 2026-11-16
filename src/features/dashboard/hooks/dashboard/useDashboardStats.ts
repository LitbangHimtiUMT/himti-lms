import { useQuery } from "@tanstack/react-query";
import { dashboardStatsService } from "../../../../core/services/dashboard-stats";

export const useDashboardStats = () => {
  const query = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => dashboardStatsService.get(),
    // The global default is refetchOnMount: false; stats must be fresh
    // every time the mentor lands on My Class, or the numbers lie.
    refetchOnMount: true,
  });
  return query;
};
