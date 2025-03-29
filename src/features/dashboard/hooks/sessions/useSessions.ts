import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { sessionService } from "../../../../core/services/sessions";

export const useSessions = () => {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId") || undefined;

  const query = useQuery({
    queryKey: ["classess"],
    queryFn: () =>
      sessionService.getByClass({
        path: `class/${classId}`,
      }),
    enabled: !!classId,
  });

  return query;
};
