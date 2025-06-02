import { Calendar, Clock, FileText, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { BiLink } from "react-icons/bi";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ModuleDTO } from "../../../core/model/modules";
import { Button } from "../../_global/components/Button";
import { formatTime } from "../../_global/lib/format-time";
import { useDetailAssignment } from "../../dashboard/hooks/assignments/useAssignmentsCreation";
import { useAtom } from "jotai";
import { LearningSidebarAtom } from "../../_global/store";
import { convertQueryParamsToObject } from "../../_global/helper";

interface AssignmentProps {
  modules: ModuleDTO;
}

export const AssignmentView: React.FC<AssignmentProps> = ({ modules }) => {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const { classId } = useParams();

  return (
    <div className="p-6 ">
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
                  to={`/learning/${classId}/assignment/${modules?.assignment.id}`}
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
                        modules?.assignment?.activeSubmission?.status ===
                        "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : modules?.assignment?.activeSubmission?.status ===
                            "REJECTED"
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
                    to={`/assignment/${assignment.id}/review`}
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
  const [sidebarOpen] = useAtom(LearningSidebarAtom);
  const [searchParams, setSearchParams] = useSearchParams();

  const queries = convertQueryParamsToObject(searchParams.toString());
  useEffect(() => {
    if (assignment?.data?.module?.id) {
      setSearchParams({ ...queries, moduleId: assignment?.data?.module?.id });
    }
  }, []);

  return (
    <div
      className={`p-4 md:p-6 transition-all duration-300 ${
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      } w-full max-w-[1920px] mx-auto`}
    >
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold mb-2">
          {assignment?.data?.title}
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          {assignment?.data?.module?.name}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <div className="bg-white w-full rounded-lg border p-4 md:p-6 mb-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Assignment Details
            </h2>
            <div
              className="prose max-w-none text-sm md:text-base"
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
                      className="text-blue-600 hover:underline flex items-center text-sm md:text-base"
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
                        className="text-blue-600 hover:underline flex items-center text-sm md:text-base"
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
            <div className="bg-white rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                Submit Your Work
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">
                  Upload Files
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="flex flex-col items-center justify-center py-4 md:py-8">
                    <FileText size={32} className="text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm md:text-base">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">
                      Maximum file size: 10MB
                    </p>
                  </div>
                  <input type="file" className="hidden" multiple />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">
                  Comments (Optional)
                </label>
                <textarea
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                  rows={4}
                  placeholder="Add any comments about your submission..."
                ></textarea>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="text-gray-500 flex items-center text-sm md:text-base">
                  <Clock size={16} className="mr-1" />
                  <span>
                    Due:{" "}
                    {assignment?.data?.dueDate
                      ? formatTime(assignment?.data?.dueDate, false)
                      : "-"}
                  </span>
                </div>
                <button className="px-4 py-2 md:px-6 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto text-sm md:text-base">
                  Submit Assignment
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-4 md:p-6 space-y-4 md:space-y-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-4">
                  Your Submission
                </h2>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="font-medium text-sm md:text-base">
                      Submitted on:
                    </p>
                    <p className="text-sm md:text-base">
                      {assignment?.data?.activeSubmission?.submittedAt
                        ? formatTime(
                            assignment?.data?.activeSubmission?.submittedAt,
                            false
                          )
                        : "-"}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="font-medium text-sm md:text-base">Status:</p>
                    <span
                      className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${
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

                <div className="border rounded-lg p-3 md:p-4">
                  <h3 className="font-medium mb-2 text-sm md:text-base">
                    Submitted Files
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center text-sm md:text-base"
                      >
                        <FileText size={16} className="mr-2" />
                        assignment-solution.zip
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline flex items-center text-sm md:text-base"
                      >
                        <FileText size={16} className="mr-2" />
                        README.md
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
