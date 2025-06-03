import { useAtom } from "jotai";
import { Calendar, FileText, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCloudUploadAlt,
  FaDownload,
  FaFileAlt,
  FaPaperPlane,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import { MdChevronLeft } from "react-icons/md";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ModuleDTO } from "../../../core/model/modules";
import { Button } from "../../_global/components/Button";
import { convertQueryParamsToObject } from "../../_global/helper";
import { formatTime } from "../../_global/lib/format-time";
import { LearningSidebarAtom } from "../../_global/store";
import {
  useAssignmentsCreation,
  useDetailAssignment,
} from "../../dashboard/hooks/assignments/useAssignmentsCreation";
import { Poppins } from "../../_global/components/Text";

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
                    <span className="px-3 py-0.5 bg-yellow-100 text-yellow-800 border border-solid border-yellow-800 text-sm rounded-full">
                      <Poppins className="text-sm">
                        {modules.assignment?.activeSubmission?.status}
                      </Poppins>
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
                      className={`px-3 py-1 text-sm rounded-lg border border-solid ${
                        modules?.assignment?.activeSubmission?.status ===
                        "APPROVED"
                          ? "bg-green-100 text-green-800 border-green-500"
                          : modules?.assignment?.activeSubmission?.status ===
                            "REJECTED"
                          ? "bg-red-100 text-red-800 border-red-500"
                          : "bg-yellow-100 text-yellow-800 border-yellow-500"
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { classId } = useParams();
  const [files, setFiles] = useState<File | string | undefined>(undefined);

  const queries = convertQueryParamsToObject(searchParams.toString());
  const navigate = useNavigate();
  const moduleId = searchParams.get("moduleId");

  useEffect(() => {
    if (assignment?.data?.module?.id) {
      setSearchParams({ ...queries, moduleId: assignment?.data?.module?.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignment]);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files?.[0]);
    }
  };
  const mutation = useAssignmentsCreation();

  const handleSubmit = async () => {
    const formData = new FormData();
    if (files) {
      formData.append("file", files);
    }
    formData.append("assignmentId", assignment?.data?.id ?? "");
    mutation.mutateAsync({
      moduleId: assignment?.data?.module?.id ?? "",
      type: "submit",
      data: formData,
    });
  };

  const allowedExtensions = assignment?.data?.allowedFile
    ?.split(",")
    .map((ext) => `${ext.trim()}`)
    .join(",");

  const renderSubmissionStatus = () => {
    const status = assignment?.data?.activeSubmission?.status;
    if (!status) return null;

    const statusConfig = {
      APPROVED: {
        color:
          "bg-green-100 text-green-800 border border-solid border-green-800",
        icon: <FaCheckCircle className="mr-1" />,
      },
      REJECTED: {
        color: "bg-red-100 text-red-800 border border-solid border-red-800",
        icon: <FaTimesCircle className="mr-1" />,
      },
      REVIEWED: {
        color:
          "bg-yellow-100 border border-solid border-yellow-800 text-yellow-800",
        icon: <FaClock className="mr-1" />,
      },
    };

    return (
      <div className="flex items-center">
        {statusConfig[status]?.icon}
        <span
          className={`px-2 py-1 rounded-lg text-xs ${statusConfig[status]?.color}`}
        >
          {status}
        </span>
      </div>
    );
  };

  const renderSubmissionForm = () => {
    if (assignment?.data?.type === "FILE") {
      return (
        <>
          <div className="mb-6">
            <label className="block text-gray-700 mb-3 font-medium">
              Upload Files
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
              onClick={handleBrowseClick}
            >
              {files ? (
                <div className="space-y-3">
                  <FaCloudUploadAlt
                    size={48}
                    className="mx-auto text-blue-400"
                  />
                  <p className="font-medium">File Selected</p>
                  <ul className="text-sm text-gray-600">
                    {/* {(files).map((file, i) => (
                      <li key={i} className="truncate">{file.name}</li>
                    ))} */}
                  </ul>
                </div>
              ) : (
                <>
                  <FaCloudUploadAlt
                    size={48}
                    className="mx-auto text-gray-400 mb-3"
                  />
                  <p className="text-gray-600 mb-1">Drag and drop files here</p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                  <p className="text-xs text-gray-400 mt-3">
                    Allowed: {allowedExtensions || "Any"} | Max size: 10MB
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              multiple
              accept={allowedExtensions}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </>
      );
    } else if (assignment?.data?.type === "URL") {
      return (
        <div className="mb-6">
          <label className="block text-gray-700 mb-3 font-medium">
            Submission URL
          </label>
          <input
            type="url"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/your-work"
            onChange={(e) => setFiles(e.target.value as string)}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`p-4 md:p-6 transition-all duration-300 ${
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      } w-full max-w-[1920px] mx-auto`}
    >
      <div
        className="flex items-center gap-1 mb-6 cursor-pointer"
        onClick={() =>
          navigate(
            `/learning/${classId}${moduleId ? `?moduleId=${moduleId}` : ""}`
          )
        }
      >
        <MdChevronLeft size={24} />
        <span className="font-medium">Back to Learning</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
        {/* Main Assignment Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignment Header */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {assignment?.data?.title}
                </h1>
                <p className="text-gray-600">
                  {assignment?.data?.module?.name}
                </p>
              </div>
              {!isHistory && assignment?.data?.dueDate && (
                <div className="flex items-center text-sm bg-blue-50 text-blue-800 px-3 py-2 rounded-lg">
                  <FaCalendarAlt className="mr-2" />
                  <span>Due: {formatTime(assignment.data.dueDate, false)}</span>
                </div>
              )}
            </div>

            {/* Assignment Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium capitalize">
                  {assignment?.data?.type?.toLowerCase() || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                {isHistory ? (
                  renderSubmissionStatus()
                ) : (
                  <p className="font-medium">Not Submitted</p>
                )}
              </div>
            </div>

            {/* Assignment Description */}
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    assignment?.data?.description ?? "No description provided",
                }}
              />
            </div>
          </div>

          {/* Submission Section */}
          {!isHistory ? (
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Submit Your Work</h2>

              <div className="mb-6">
                {renderSubmissionForm()}
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept={allowedExtensions}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
                <button
                  className="px-5 py-2.5 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setFiles(undefined);
                  }}
                >
                  Clear
                </button>
                <div className="w-48">
                  <Button
                    size="lg"
                    variant={mutation.isPending ? "disabled" : "primary"}
                    onClick={handleSubmit}
                  >
                    <div className="flex items-center">
                      <FaPaperPlane className="mr-2" />
                      <Poppins>
                        {mutation.isPending
                          ? "Loading..."
                          : "Submit Assignment"}
                      </Poppins>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Submission Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium mb-3">Submission Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Submitted At</p>
                      <p className="font-medium">
                        {assignment?.data?.activeSubmission?.submittedAt
                          ? formatTime(
                              assignment.data.activeSubmission.submittedAt,
                              false
                            )
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      {renderSubmissionStatus()}
                    </div>
                  </div>
                </div>

                {assignment?.data?.activeSubmission?.feedback && (
                  <div>
                    <h3 className="font-medium mb-3">Instructor Feedback</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        {assignment.data.activeSubmission.feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-3">Submitted Files</h3>
                <div className="border rounded-lg divide-y">
                  {assignment?.data?.activeSubmission?.file ? (
                    <a
                      href={assignment.data.activeSubmission.file}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center">
                        <FaFileAlt className="text-gray-400 mr-3" />
                        <span>
                          {assignment.data.activeSubmission.file
                            .split("/")
                            .pop()}
                        </span>
                      </div>
                      <FaDownload className="text-gray-400" />
                    </a>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No files submitted
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar with Additional Info */}
        <div className="space-y-6">
          {/* Instructor Info */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Instructor</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="text-gray-500" />
              </div>
              <div>
                <p className="font-medium">
                  {assignment?.data?.createdBy?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
