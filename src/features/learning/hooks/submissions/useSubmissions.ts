import { useQuery } from "@tanstack/react-query";
import { assignmentService } from "../../../../core/services/assignments";
import { useParams } from "react-router-dom";

type SubmissionTypeHooks = "get";

export const useSubmissions = (modules: SubmissionTypeHooks[]) => {
  const { submissionId } = useParams();

  const getSubmissions = useQuery({
    queryKey: ["submissions"],
    queryFn: () =>
      assignmentService.submission.getById({
        path: submissionId,
      }),
    enabled: modules.includes("get"),
  });

  return {
    get: getSubmissions,
  };
};
