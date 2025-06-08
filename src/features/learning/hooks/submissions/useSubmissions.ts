import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignmentService } from "../../../../core/services/assignments";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SubmissionTypeHooks = "get" | "get-by-assignment";
interface Approval {
  submissionId: string;
  feedback?: string;
}

export const useSubmissions = (modules: SubmissionTypeHooks[]) => {
  const { submissionId, assignmentId } = useParams();
  const queryClient = useQueryClient();
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
    mutationFn: ({ submissionId }: Approval) =>
      assignmentService.submission.approval(undefined, {
        path: `approve/${submissionId}`,
      }),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["submission-by-assignment"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const rejectSubmission = useMutation({
    mutationFn: ({ submissionId, feedback }: Approval) =>
      assignmentService.submission.approval(
        { feedback },
        {
          path: `reject/${submissionId}`,
        }
      ),
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({
          queryKey: ["submission-by-assignment"],
        });
      },
      onError: (err) => toast.error(err.message),
  });

  return {
    get: getSubmissions,
    getByAssignment: getSubmissionsByAssignment,
    approve: approveSubmission,
    reject: rejectSubmission,
  };
};
