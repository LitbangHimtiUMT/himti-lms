import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SessionCreationDTO } from "../../../../core/model/sessions";
import { sessionService } from "../../../../core/services/sessions";

interface CreationPayload {
  type: "create" | "update" | "delete";
  data?: SessionCreationDTO;
  classId?: string;
}

export const useSessions = () => {
  const { classId } = useParams();
const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || undefined;
  const perPage = searchParams.get("perPage") || undefined;
  const query = useQuery({
    queryKey: ["sessions", { classId, page, perPage }],
    queryFn: () =>
      sessionService.getByClass({
        path: `class/${classId}`,
        queryParams: {
           page: page ? Number(page) : undefined,
          perPage: perPage ? Number(perPage) : undefined,
        }
      }),
    enabled: !!classId,
  });

  return query;
};

export const useSessionsCreation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ type, data, classId }: CreationPayload) => {
      switch (type) {
        case "create":
          return sessionService.create(data, {
            path: classId,
          });
        case "delete":
          return sessionService.delete({
            path: data?.id,
          });
        default:
          return sessionService.update(
            { name: data?.name || "" },
            {
              path: data?.id,
            }
          );
      }
    },
    onError: (err) => toast.error(err.message),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
  });
  return mutation;
};
