import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SessionCreationDTO } from "../../../../core/model/sessions";
import { sessionService } from "../../../../core/services/sessions";

interface CreationPayload {
  type: "create" | "update";
  data?: SessionCreationDTO;
  classId?: string;
}

export const useSessions = () => {
  const { classId } = useParams();

  const query = useQuery({
    queryKey: ["sessions", { classId }],
    queryFn: () =>
      sessionService.getByClass({
        path: `class/${classId}`,
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
