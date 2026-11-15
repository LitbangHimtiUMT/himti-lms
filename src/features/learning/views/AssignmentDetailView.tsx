import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { useDetailAssignment } from "../../dashboard/hooks/assignments/useAssignmentsCreation";
import { useSubmissions } from "../hooks/submissions/useSubmissions";
import { QueryErrorState } from "../../_global/components/QueryErrorState";
import { LearningSidebarAtom } from "../../_global/store";
import { AssignmentDataProps, AssignmentDetailContent } from "../components/AssignmentDetailContent";

export const AssignmentDetailView = () => {
  const { submissionId, assignmentId } = useParams();
  const [sidebarOpen] = useAtom(LearningSidebarAtom);
  const mode = {
    assignment: !!assignmentId && !submissionId,
    submission: submissionId && assignmentId,
  };
  const {
    data: assignment,
    isFetching: isFetchingAssignment,
    isError: isErrorAssignment,
    refetch: refetchAssignment,
  } = useDetailAssignment(mode.assignment);
  const {
    get: {
      data: submissions,
      isFetching: isFetchingSubmission,
      isError: isErrorSubmission,
      refetch: refetchSubmission,
    },
  } = useSubmissions(mode.submission ? ["get"] : []);

  // Only the active query can fail this page: the other one is disabled.
  const isLoadError = mode.assignment
    ? isErrorAssignment && !assignment?.data
    : isErrorSubmission && !submissions?.data;

  if (isLoadError) {
    return (
      <div
        className={`p-4 md:p-6 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <QueryErrorState
          description={[
            "Failed to load assignment.",
            "Please check your connection and try again.",
          ]}
          onRetry={mode.assignment ? refetchAssignment : refetchSubmission}
        />
      </div>
    );
  }

  return (
    <>
      <div>
        <AssignmentDetailContent
          mode={mode.assignment ? "current" : "history"}
          isLoading={
            mode.assignment ? isFetchingAssignment : isFetchingSubmission
          }
          isOpen={mode.assignment ? assignment?.data?.isOpen : submissions?.data?.isOpen}
          type={mode.assignment ? assignment?.data?.type : submissions?.data?.assignment?.type}
          data={
            (mode.assignment
              ? {
                  createdBy: {
                    name: assignment?.data?.createdBy?.name,
                  },
                  description: assignment?.data?.description,
                  dueDate: assignment?.data?.dueDate,
                  id: assignment?.data?.id,
                  module: {
                    id: assignment?.data?.module?.id,
                    name: assignment?.data?.module?.name,
                  },
                  title: assignment?.data?.title,
                  type: assignment?.data?.type,
                  allowedFile: assignment?.data?.allowedFile,
                  isHaveHistory: !!assignment?.data?.historySubmission.length,
                  activeSubmission: assignment?.data?.activeSubmission,
                  historySubmission: assignment?.data?.historySubmission,
                  // The submission shown on this page: the one under review,
                  // else the approved one (APPROVE is terminal, so the detail
                  // card shows it instead of the submit form).
                  submission:
                    assignment?.data?.activeSubmission ??
                    assignment?.data?.historySubmission?.find(
                      (item) => item.status === "APPROVE"
                    ) ??
                    null,
                }
              : {
                  createdBy: {
                    name: submissions?.data?.createdBy?.name,
                  },
                  description: submissions?.data?.assignment?.description,
                  dueDate: submissions?.data?.assignment?.dueDate,
                  id: submissions?.data?.id,
                  module: submissions?.data?.assignment?.module,
                  title: submissions?.data?.assignment?.title,
                  type: submissions?.data?.assignment?.type,
                  allowedFile: submissions?.data?.assignment?.allowedFile,
                  isHaveHistory: true,
                  submission: submissions?.data,
                }) as AssignmentDataProps
          }
        />
      </div>
    </>
  );
};
