import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { moduleService } from "../../../../core/services/modules";
import { toast } from "react-toastify";

interface ModulesCreationPayload {
  data?: FormData;
  sessionId?: string;
  id?: string;
  type: "create";
}

export const useModules = (id?: string) => {
  const [searchParams] = useSearchParams();
  const sessionId = id || searchParams.get("sessionId") || undefined;

  const query = useQuery({
    queryKey: ["modules", { sessionId }],
    queryFn: () =>
      moduleService.getBySession({
        path: `session/${sessionId}`,
      }),
    enabled: !!sessionId,
  });

  return query;
};

export const useDetailModule = (id?: string) => {
  const { moduleId } = useParams();

  const query = useQuery({
    queryKey: ["detail-module", { moduleId, id }],
    queryFn: () =>
      moduleService.getById({
        path: moduleId || id,
      }),
    enabled: !!moduleId,
  });

  return query;
};

export const useModulesCreation = () => {
  const { sessionId, classId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      data,
      type,
      sessionId: session,
    }: ModulesCreationPayload) => {
      switch (type) {
        case "create":
          return moduleService.create(data, {
            path: `${session || sessionId}`,
            contentType: "form-data",
          });
        default:
          return moduleService.create(data, {
            path: `${session || sessionId}`,
            contentType: "form-data",
          });
      }
    },
    onSuccess: (res) => {
      navigate(`/dashboard/${classId}/${sessionId}`);
      toast.success(res.message);
      queryClient.removeQueries({
        queryKey: ["modules"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return mutation;
};
