import {
    FiCalendar,
    FiClock,
    FiDownload,
    FiLink
} from "react-icons/fi";
import { Button } from "../../../../_global/components/Button";
import { formatTime } from "../../../../_global/lib/format-time";
import { useSubmissions } from "../../../../learning/hooks/submissions/useSubmissions";
import { useDetailAssignment } from "../../../hooks/assignments/useAssignmentsCreation";

export const DetailAssignmentContent = () => {

  const { assignmentData: assignment } = useDetailAssignment();
  const {
    getByAssignment: { data: submissions },
  } = useSubmissions(["get-by-assignment"]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-44">
          <Button variant="success">Update Assignment</Button>
        </div>
        <div className="w-40">
          <Button variant="danger">Delete Assignment</Button>
        </div>
      </div>

      {/* Assignment Detail */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {assignment?.title ?? ""}
        </h1>

        <div className="flex items-center text-gray-600 mb-4">
          <div className="flex items-center mr-6">
            <FiCalendar className="mr-2" />
            <span>
              Created:{" "}
              {assignment?.createdAt
                ? formatTime(assignment?.createdAt, false)
                : "-"}
            </span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2" />
            <span>
              Due Date:{" "}
              {assignment?.dueDate
                ? formatTime(assignment?.dueDate, false)
                : "-"}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </h2>
          <div
            className={`prose max-w-none dark:prose-invert 
                prose-base`}
            dangerouslySetInnerHTML={{
              __html: assignment?.description || "",
            }}
          />
        </div>

        {/* {assignment.attachments.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Lampiran
            </h2>
            <div className="space-y-2">
              {assignment.attachments.map((file, index) => (
                <div key={index} className="flex items-center">
                  <FiFileText className="text-gray-500 mr-2" />
                  <a
                    href={file.url}
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    {file.name}
                    <FiDownload className="ml-2" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">List Of Submisson</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Submitted At
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  File
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions?.data?.map((submission) => (
                <tr key={submission.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <>
                        {submission?.user?.photo ? (
                          <>
                            <img src={submission?.user?.photo} width={"2.5rem"} height={"2.5rem"} className="rounded-full" />
                          </>
                        ) : (
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                            {submission?.user?.name?.charAt(0)}
                          </div>
                        )}
                      </>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {submission.user?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.createdAt
                      ? formatTime(submission.createdAt)
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.file ? (
                      <a
                        href={submission.file}
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-4 inline-flex text-xs leading-5 font-medium rounded-full border border-solid ${
                        submission.status === "APPROVE"
                          ? "bg-green-100 text-green-800 border-green-800"
                          : submission.status === "REJECT"
                          ? "bg-red-100 text-red-800 border-red-800"
                          : "bg-yellow-100 text-yellow-800 border-yellow-800"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {submission.status === "REVIEW" && (
                      <div className="flex space-x-2">
                        <Button variant="success">
                            Approve
                        </Button>
                        <Button variant="danger">Reject</Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
