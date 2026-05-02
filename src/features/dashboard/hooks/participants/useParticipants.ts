import { useQuery } from "@tanstack/react-query";
import { participantService } from "../../../../core/services/participants";
import useDebounce from "../../../_global/hooks/useDebounce";

interface Query {
  path?: string;
  search?: string;
  enabled?: boolean;
}

export const useParticipants = (query: Query) => {
  const { search, enabled = true, path } = query;
  const searchQuery = useDebounce(search ?? "", 500);
  return useQuery({
    queryKey: [
      "participants",
      {
        path,
        search: searchQuery,
      },
    ],
    queryFn: () => {
      return participantService.getByClass({
        path: query.path,
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
