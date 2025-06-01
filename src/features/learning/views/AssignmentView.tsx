import { Calendar, Clock, FileText, Search } from "lucide-react";
import { useState } from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ModuleDTO } from "../../../core/model/modules";
import { Button } from "../../_global/components/Button";
import { formatTime } from "../../_global/lib/format-time";
import { useDetailAssignment } from "../../dashboard/hooks/assignments/useAssignmentsCreation";

interface AssignmentProps {
  modules: ModuleDTO;
}

export const AssignmentView: React.FC<AssignmentProps> = ({ modules }) => {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <div className="relative w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "active"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Assignments
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "history"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Assignment History
        </button>
      </div>

      {activeTab === "active" ? (
        <div className="space-y-4">
          {modules.assignment ? (
            <div
              key={modules.assignment.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {modules.assignment.title}
                  </h3>
                  <p className="text-gray-600">{modules.assignment.title}</p>
                </div>
                {modules?.assignment?.activeSubmission ? (
                  <>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      {modules.assignment?.activeSubmission?.status}
                    </span>
                  </>
                ) : null}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    <span>
                      Due:{" "}
                      {modules?.assignment
                        ? formatTime(modules?.assignment.dueDate, false)
                        : "-"}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/assignments/${modules?.assignment.id}`}
                  className="px-4 py-2 text-white rounded-lg"
                >
                  <Button
                    variant={
                      modules?.assignment?.activeSubmission
                        ? "secondary"
                        : "primary"
                    }
                  >
                    {modules?.assignment?.activeSubmission
                      ? "View Assignment"
                      : "Start Assignment"}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600">
                No active assignments
              </h3>
              <p className="text-gray-500">
                You don't have any assignments to complete right now.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {(modules?.assignment?.historySubmission?.length as number) > 0 ? (
            modules?.assignment?.historySubmission?.map((assignment) => (
              <div
                key={assignment.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {modules?.assignment?.title || "-"}
                    </h3>
                    {/* <p className="text-gray-600">{modules?.assignment.}</p> */}
                  </div>
                  {modules?.assignment?.activeSubmission ? (
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        modules?.assignment?.activeSubmission?.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : modules?.assignment?.activeSubmission?.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {modules?.assignment?.activeSubmission?.status}
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    <span>
                      Submitted:{" "}
                      {assignment.submittedAt
                        ? formatTime(assignment.submittedAt, false)
                        : "-"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium mr-2">Feedback:</span>
                    <span className="text-gray-600 truncate">
                      {assignment.feedback}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/assignments/${assignment.id}/review`}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600">
                No assignment history
              </h3>
              <p className="text-gray-500">
                Your completed assignments will appear here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const AssignmentDetailView = ({ isHistory = false }) => {
  const { data: assignment } = useDetailAssignment();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{assignment?.data?.title}</h1>
        <p className="text-gray-600">{assignment?.data?.module?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Assignment Details</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: assignment?.data?.description ?? "",
              }}
            />

            <div className="mt-6">
              <h3 className="font-medium mb-2">Attachments</h3>
              <ul className="space-y-2">
                <li>
                  {assignment?.data?.type === "FILE" &&
                  assignment?.data?.activeSubmission ? (
                    <a
                      href={assignment?.data.activeSubmission?.file}
                      className="text-blue-600 hover:underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BiLink className="mr-2" />
                      {assignment?.data?.activeSubmission.file}
                    </a>
                  ) : (
                    assignment?.data?.activeSubmission && (
                      <a
                        href={assignment?.data?.activeSubmission?.file}
                        className="text-blue-600 hover:underline flex items-center"
                        download
                      >
                        <FileText size={16} className="mr-2" />
                        {assignment?.data?.activeSubmission.file}
                      </a>
                    )
                  )}
                </li>
              </ul>
            </div>
          </div>

          {!isHistory ? (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Submit Your Work</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload Files</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText size={48} className="text-gray-400 mb-2" />
                    <p className="text-gray-500">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Maximum file size: 10MB
                    </p>
                  </div>
                  <input type="file" className="hidden" multiple />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Comments (Optional)
                </label>
                <textarea
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={4}
                  placeholder="Add any comments about your submission..."
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-500 flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>
                    Due:{" "}
                    {assignment?.data?.dueDate
                      ? formatTime(assignment?.data?.dueDate, false)
                      : "-"}
                  </span>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Submit Assignment
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Submission</h2>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">Submitted on:</p>
                    <p>
                      {assignment?.data?.activeSubmission?.submittedAt
                        ? formatTime(
                            assignment?.data?.activeSubmission?.submittedAt,
                            false
                          )
                        : "-"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Status:</p>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        assignment?.data?.activeSubmission?.status ===
                        "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : assignment?.data?.activeSubmission?.status ===
                            "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {assignment?.data?.activeSubmission?.status}
                    </span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Submitted Files</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <FileText size={16} className="mr-2" />
                        assignment-solution.zip
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <FileText size={16} className="mr-2" />
                        README.md
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <div>
                <h2 className="text-xl font-semibold mb-4">Feedback</h2>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        assignment.score >= 90
                          ? "bg-green-600"
                          : assignment.score >= 70
                          ? "bg-blue-600"
                          : "bg-red-600"
                      }`}
                      style={{
                        width: `${
                          (assignment.score / assignment.points) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium mb-2">Instructor Feedback</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p>{assignment.feedback}</p>
                  </div>
                </div>

                {assignment.graderComments.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Grader Comments</h3>
                    <ul className="space-y-3">
                      {assignment.graderComments.map((comment, index) => (
                        <li
                          key={index}
                          className="border-l-4 border-blue-500 pl-4 py-1"
                        >
                          <p>{comment.text}</p>
                          <p className="text-sm text-gray-500">
                            {comment.timestamp}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div> */}
            </div>
          )}
        </div>

        {/* <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">
              Assignment Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium">
                  {isHistory ? (
                    <span className="text-green-600">Submitted & Graded</span>
                  ) : (
                    <span className="text-yellow-600">Pending Submission</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Points</p>
                <p className="font-medium">{assignment.points}</p>
              </div>
              <div>
                <p className="text-gray-500">Due Date</p>
                <p className="font-medium">
                  {assignment.dueDate} at {assignment.dueTime}
                </p>
              </div>
              {isHistory && (
                <>
                  <div>
                    <p className="text-gray-500">Submitted On</p>
                    <p className="font-medium">
                      {assignment.submittedDate} at {assignment.submittedTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Final Grade</p>
                    <p className="font-bold text-xl">
                      {assignment.score}/{assignment.points}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {!isHistory && (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">
                Submission Checklist
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>All required files are included</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>Code follows the style guidelines</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>All tests are passing</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>Documentation is complete</span>
                </li>
              </ul>
            </div>
          )}

          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Assignment Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Course Discussion Forum
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Schedule Office Hours
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};
