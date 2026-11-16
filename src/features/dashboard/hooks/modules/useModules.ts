import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { moduleService } from "../../../../core/services/modules";
import { getErrorMessage } from "../../../_global/helper/get-error-message";

interface ModulesCreationPayload {
  data?: FormData;
  sessionId?: string;
  id?: string;
  type: "create" | "update" | "delete";
}

export const useModules = (id?: string) => {
  const [searchParams] = useSearchParams();
  const sessionId = id || searchParams.get("sessionId") || undefined;
  const page = searchParams.get("page") || undefined;
  const perPage = searchParams.get("perPage") || undefined;

  const query = useQuery({
    queryKey: ["modules", { sessionId, page, perPage }],
    queryFn: () =>
      moduleService.getBySession({
        path: `session/${sessionId}`,
        queryParams: {
          page: page ? Number(page) : undefined,
          perPage: perPage ? Number(perPage) : undefined,
        },
      }),
    enabled: !!sessionId,
  });

  return query;
};

// No cache clearing here on purpose: switching modules changes no
// server state, so the sessions/modules/classes caches stay valid.
// Freshness after real changes comes from the mutations themselves
// (useCompleted clears ["classes"], useModulesCreation clears
// ["modules"], and so on).
export const useDetailModule = (id?: string) => {
  const { moduleId } = useParams();
  const [searchParams] = useSearchParams();
  const module = searchParams.get("moduleId") || undefined;
  const query = useQuery({
    queryKey: ["detail-module", { moduleId, id, module }],
    queryFn: () =>
      moduleService.getById({
        path: moduleId || module || id,
      }),
    enabled: !!moduleId || !!module || !!id,
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
      id,
    }: ModulesCreationPayload) => {
      switch (type) {
        case "create":
          return moduleService.create(data, {
            path: `${session || sessionId}`,
            contentType: "form-data",
          });
        case "update":
          return moduleService.update(data, {
            path: id,
            contentType: "form-data",
          });
        case "delete":
          return moduleService.delete({
            path: id,
          });
        default: {
          const unknownType: never = type;
          throw new Error(`Unknown module mutation type: ${unknownType}`);
        }
      }
    },
    onSuccess: (res, vars) => {
      navigate(`/dashboard/${classId}/${sessionId}`);
      toast.success(res?.message || "Berhasil.");
      // Deleting a module can take its assignment with it, which
      // changes the eligibility count; create/update add no
      // assignment, so they leave eligibility alone.
      if (vars.type === "delete") {
        queryClient.invalidateQueries({
          queryKey: ["certificate-eligibility"],
        });
      }
      queryClient.removeQueries({
        queryKey: ["modules"],
      });
      queryClient.removeQueries({
        queryKey: ["detail-module"],
      });
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  return mutation;
};
