import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiDownload,
  FiFile,
  FiLink,
} from "react-icons/fi";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { Button } from "../../../../_global/components/Button";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { Dialog } from "../../../../_global/components/Dialog";
import { EmptyState } from "../../../../_global/components/Empty";
import { Skeleton } from "../../../../_global/components/Shimer";
import { formatTime } from "../../../../_global/lib/format-time";
import { useSubmissions } from "../../../../learning/hooks/submissions/useSubmissions";
import { useDetailAssignment } from "../../../hooks/assignments/useAssignmentsCreation";
import { Table, TableBody, TableHead } from "../../../../_global/components/Table";
import { Badge } from "../../../../_global/components/Badge";

interface DialogType {
  type: "approve" | "reject";
  feedback?: string;
  submissionId: string;
}

export const DetailAssignmentContent = () => {
  const { assignmentData: assignment, isFetching: isFetchingAssignment } =
    useDetailAssignment();
  const {
    getByAssignment: { data: submissions, isFetching: isFetchingSubmission },
    approve,
    reject,
  } = useSubmissions(["get-by-assignment"]);
  const [approval, setApproval] = useState<DialogType | null>(null);

  if (isFetchingAssignment || isFetchingSubmission) {
    return (
      <div className="flex flex-col gap-6 mb-6">
        <Skeleton width="100%" height="500px" />
        <Skeleton width="100%" height="300px" />
      </div>
    );
  }

  const handleApprove = async () => {
    setApproval(null);
    approve.mutateAsync({
      submissionId: approval?.submissionId ?? "",
    });
  };

  const handleReject = async () => {
    setApproval(null);
    reject.mutateAsync({
      submissionId: approval?.submissionId ?? "",
      feedback: approval?.feedback,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="w-full sm:w-auto">
          <Button variant="success" className="w-full sm:w-auto">
            Update Assignment
          </Button>
        </div>
        <div className="w-full sm:w-auto">
          <Button variant="danger" className="w-full sm:w-auto">
            Delete Assignment
          </Button>
        </div>
      </div>

      {/* Assignment Detail */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          {assignment?.title ?? ""}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 text-sm sm:text-base">
          <div className="flex items-center text-gray-600">
            <FiCalendar className="mr-2 flex-shrink-0" />
            <span className="truncate">
              Created:{" "}
              {assignment?.createdAt
                ? formatTime(assignment?.createdAt, false)
                : "-"}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiClock className="mr-2 flex-shrink-0" />
            <span className="truncate">
              Due Date:{" "}
              {assignment?.dueDate
                ? formatTime(assignment?.dueDate, false)
                : "-"}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiFile className="mr-2 flex-shrink-0" />
            <span className="truncate">Type: {assignment?.type || "-"}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiFile className="mr-2 flex-shrink-0" />
            <span className="truncate">
              Allowed:{" "}
              {assignment?.type === "FILE" ? assignment?.allowedFile : "-"}
            </span>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </h2>
          <div
            className="prose max-w-none dark:prose-invert prose-sm sm:prose-base"
            dangerouslySetInnerHTML={{
              __html: assignment?.description || "",
            }}
          />
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Submissions
          </h2>
        </div>

        <>
          {/* Desktop Table */}
          <Table className="hidden sm:block">
            <TableHead
              field={["Name", "Submitted At", "File / URL", "Status", "Action"]}
            />
            <TableBody>
              {submissions?.data?.length ? (
                submissions?.data?.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {submission?.user?.photo ? (
                          <img
                            src={submission?.user?.photo}
                            alt={submission?.user?.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                            {submission?.user?.name?.charAt(0)}
                          </div>
                        )}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {submission.user?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.createdAt
                        ? formatTime(submission.createdAt)
                        : "-"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {submission.file ? (
                        <a
                          href={submission.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center text-sm"
                        >
                          {`${
                            submission.assignment?.type === "FILE"
                              ? "File"
                              : "URL"
                          } Submission`}
                          {submission?.assignment?.type === "FILE" ? (
                            <FiDownload className="ml-2" />
                          ) : (
                            <FiLink className="ml-2" />
                          )}
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge
                      size="sm"
                      rounded="full"
                        variant={
                          submission.status === "APPROVE"
                            ? "success"
                            : submission.status === "REJECT"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {submission.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      {submission.status === "REVIEW" && (
                        <div className="flex space-x-2">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() =>
                              setApproval({
                                type: "approve",
                                submissionId: submission.id,
                              })
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              setApproval({
                                type: "reject",
                                submissionId: submission.id,
                              })
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <EmptyState
                    variant="table"
                    colspan={5}
                    description={["Submission is empty"]}
                  />
                </>
              )}
            </TableBody>
          </Table>
          {/* <table className="hidden sm:table min-w-full divide-y divide-gray-200">
           
          </table> */}

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {submissions?.data?.length ? (
              submissions?.data?.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {submission?.user?.photo ? (
                        <img
                          src={submission?.user?.photo}
                          alt={submission?.user?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                          {submission?.user?.name?.charAt(0)}
                        </div>
                      )}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {submission.user?.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {submission.createdAt
                            ? formatTime(submission.createdAt)
                            : "-"}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                        submission.status === "APPROVE"
                          ? "bg-green-100 text-green-800"
                          : submission.status === "REJECT"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>

                  <div className="mb-3">
                    {submission.file ? (
                      <a
                        href={submission.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center text-sm"
                      >
                        {`${
                          submission.assignment?.type === "FILE"
                            ? "File Submission"
                            : "URL Submission"
                        }`}
                        {submission?.assignment?.type === "FILE" ? (
                          <FiDownload className="ml-2" />
                        ) : (
                          <FiLink className="ml-2" />
                        )}
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        No submission
                      </span>
                    )}
                  </div>

                  {submission.status === "REVIEW" && (
                    <div className="flex space-x-2">
                      <Button
                        variant="success"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setApproval({
                            submissionId: submission.id,
                            type: "approve",
                          });
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setApproval({
                            submissionId: submission.id,
                            type: "reject",
                          });
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <>
                <>
                  <EmptyState
                    variant="archive"
                    description={["Submission is empty"]}
                  />
                </>
              </>
            )}
          </div>
        </>
      </div>
      <ConditionNode condition={!!approval}>
        <>
          {approval?.type === "approve" ? (
            <Dialog onHide={() => setApproval(null)} show={!!approval}>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-green-100 text-green-600">
                    <IoCheckmarkCircleOutline className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      Approve Request
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Are you sure you want to approve this request? This action
                      cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="secondary" onClick={() => setApproval(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant={approve.isPending ? "disabled" : "success"}
                    onClick={() => handleApprove()}
                  >
                    {approve.isPending ? "Processing..." : "Approve"}
                  </Button>
                </div>
              </div>
            </Dialog>
          ) : approval?.type === "reject" ? (
            <Dialog onHide={() => setApproval(null)} show={!!approval}>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                    <IoCloseCircleOutline className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      Reject Request
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Are you sure you want to reject this request? This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
                {/* Feedback Textarea for Approve */}
                <div className="mt-2">
                  <label
                    htmlFor="approveFeedback"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Feedback (Optional)
                  </label>
                  <textarea
                    id="reject-feedback"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    placeholder="Add any comments or feedback..."
                    value={approval?.feedback}
                    onChange={(e) =>
                      setApproval((prev) => ({
                        ...(prev ?? { submissionId: "", type: "reject" }),
                        feedback: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="secondary" onClick={() => setApproval(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant={reject.isPending ? "disabled" : "warning"}
                    onClick={() => handleReject()}
                  >
                    {reject.isPending ? "Processing..." : "Reject"}
                  </Button>
                </div>
              </div>
            </Dialog>
          ) : null}
        </>
      </ConditionNode>
    </div>
  );
};
