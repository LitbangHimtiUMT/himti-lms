import { useQuery } from "@tanstack/react-query";
import { moduleService } from "../../../core/services/modules";
import { useSearchParams } from "react-router-dom";

export const useModules = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId") || undefined;

  const query = useQuery({
    queryKey: ["modules"],
    queryFn: () =>
      moduleService.getBySession({
        path: `session/${sessionId}`,
      }),
    enabled: !!sessionId,
  });

  return query;
};
