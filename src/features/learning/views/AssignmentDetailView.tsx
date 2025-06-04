import { useParams } from "react-router-dom";
import { useDetailAssignment } from "../../dashboard/hooks/assignments/useAssignmentsCreation";
import { useSubmissions } from "../hooks/submissions/useSubmissions";
import { AssignmentDataProps, AssignmentDetailContent } from "./AssignmentView";

export const AssignmentDetailView = () => {
  const { submissionId, assignmentId } = useParams();
  const mode = {
    assignment: !!assignmentId && !submissionId,
    submission: submissionId && assignmentId,
  };
  const { data: assignment, isFetching: isFetchingAssignment } =
    useDetailAssignment(mode.assignment);
  const {
    get: { data: submissions, isFetching: isFetchingSubmission },
  } = useSubmissions(mode.submission ? ["get"] : []);
  return (
    <>
      <div>
        <AssignmentDetailContent
          mode={mode.assignment ? "current" : "history"}
          isLoading={
            mode.assignment ? isFetchingAssignment : isFetchingSubmission
          }
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
                  submission: assignment?.data?.activeSubmission ?? null,
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
