import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAssignmentDTO } from "../../../../core/model/assignments";
import { assignmentService } from "../../../../core/services/assignments";
import { toast } from "react-toastify";

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
