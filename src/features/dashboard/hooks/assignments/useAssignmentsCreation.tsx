import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AssignmentDTO,
  CreateAssignmentDTO,
} from "../../../../core/model/assignments";
import { assignmentService } from "../../../../core/services/assignments";

interface AssignmentVars {
  type: "create" | "submit" | "update" | "delete";
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
      const rest = data as CreateAssignmentDTO;
      switch (type) {
        case "create":
          return assignmentService.create(rest, {
            path: moduleId,
          });
        case "update":
          return assignmentService.update(
            {
              dueDate: rest.dueDate,
              title: rest.title,
              description: rest.description,
              type: rest.type,
              allowedFile: rest.allowedFile,
            },
            {
              path: (data as CreateAssignmentDTO)?.id,
            }
          );
        case "submit":
          return assignmentService.submit(data as FormData, {
            path: "submit",
            contentType: "form-data",
          });
        default:
          return assignmentService.create(rest, {
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
          queryKey: ["detail-module"],
        });
        queryClient.removeQueries({
          queryKey: ["submissions"],
        });
        queryClient.removeQueries({
          queryKey: ["detail-assignment"],
        });
        navigate(`/learning/${classId}?moduleId=${moduleId}`);
      }
      
      if(vars.type === 'update') {
        queryClient.removeQueries({
          queryKey: ["detail-assignment"],
        });
        
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
  return {
    ...query,
    assignmentData: query?.data?.data as AssignmentDTO,
  };
};
