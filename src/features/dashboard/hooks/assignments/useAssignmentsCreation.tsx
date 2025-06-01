import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateAssignmentDTO } from "../../../../core/model/assignments";
import { assignmentService } from "../../../../core/services/assignments";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface AssignmentVars {
  type: "create";
  data: CreateAssignmentDTO;
  moduleId: string;
}

export const useAssignmentsCreation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, data, moduleId }: AssignmentVars) => {
      switch (type) {
        case "create":
          return assignmentService.create(data, {
            path: moduleId,
          });
        default:
          return assignmentService.create(data, { path: moduleId });
      }
    },
    onError: (err) => toast.error(err.message),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });
    },
  });
};

export const useDetailAssignment = () => {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ["detail-assignment", { id }],
    queryFn: () =>
      assignmentService.getById({
        path: id,
      }),
    enabled: !!id,
  });
  return query;
};
