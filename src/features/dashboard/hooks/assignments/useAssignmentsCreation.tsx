import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateAssignmentDTO } from "../../../../core/model/assignments";
import { assignmentService } from "../../../../core/services/assignments";

interface AssignmentVars {
  type: "create" | "submit";
  data: CreateAssignmentDTO | FormData;
  moduleId: string;
}

export const useAssignmentsCreation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { classId } = useParams();
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get("moduleId");
  return useMutation({
    mutationFn: ({ type, data, moduleId }: AssignmentVars) => {
      switch (type) {
        case "create":
          return assignmentService.create(data as CreateAssignmentDTO, {
            path: moduleId,
          });
        case "submit":
          return assignmentService.submit(data as FormData, {
            path: "submit",
            contentType: "form-data",
          });
        default:
          return assignmentService.create(data as CreateAssignmentDTO, {
            path: moduleId,
          });
      }
    },
    onError: (err) => toast.error(err.message),
    onSuccess: (res, vars) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });
      if (vars.type === "submit") {
        queryClient.removeQueries({
          queryKey: ["moduleById"],
        });
        navigate(`/learning/${classId}?moduleId=${moduleId}`);
      }
    },
  });
};

export const useDetailAssignment = (enabled: boolean = true) => {
  const { assignmentId } = useParams();
  const query = useQuery({
    queryKey: ["detail-assignment", { assignmentId, enabled }],
    queryFn: () =>
      assignmentService.getById({
        path: assignmentId,
      }),
    enabled: !!assignmentId && enabled,
  });
  return query;
};
