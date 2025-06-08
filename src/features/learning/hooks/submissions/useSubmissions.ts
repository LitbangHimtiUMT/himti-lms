import { useMutation, useQuery } from "@tanstack/react-query";
import { assignmentService } from "../../../../core/services/assignments";
import { useParams } from "react-router-dom";

type SubmissionTypeHooks = "get" | "get-by-assignment";

export const useSubmissions = (modules: SubmissionTypeHooks[]) => {
  const { submissionId, assignmentId } = useParams();

  const getSubmissions = useQuery({
    queryKey: ["submissions", { submissionId }],
    queryFn: () =>
      assignmentService.submission.getById({
        path: submissionId,
      }),
    enabled: modules.includes("get") && !!submissionId,
  });

  const getSubmissionsByAssignment = useQuery({
    queryKey: ["submission-by-assignment", { assignmentId }],
    queryFn: () =>
      assignmentService.submission.getByAssignment({
        path: `assignment/${assignmentId}`,
      }),
    enabled: modules.includes("get-by-assignment") && !!assignmentId,
  });

  const approveSubmission = useMutation({
    mutationFn: () =>
      assignmentService.submission.getByAssignment({
        path: `assignment/approve/${assignmentId}`,
      }),
  });

  return {
    get: getSubmissions,
    getByAssignment: getSubmissionsByAssignment,
    approve: approveSubmission
  };
};
