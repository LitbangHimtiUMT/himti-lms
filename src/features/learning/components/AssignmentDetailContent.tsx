import { useAtom } from "jotai";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaPaperPlane,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../_global/components/Button";
import { Poppins } from "../../_global/components/Text";
import { UploadFile } from "../../_global/components/UploadFiles";
import { formatTime } from "../../_global/lib/format-time";
import { LearningSidebarAtom } from "../../_global/store";
import { CardSubmission } from "./submission/CardSubmission";
import { AssignmentDetailSkeleton } from "./submission/SkeletonSubmission";
import { useAssignmentsCreation } from "../../dashboard/hooks/assignments/useAssignmentsCreation";

export interface AssignmentDataProps {
  id: string;
  title: string;
  description: string;
  type: "FILE" | "URL";
  module: {
    id: string;
    name: string;
  };
  dueDate?: Date;
  allowedFile?: string;
  createdBy: {
    name: string;
  };
  submission: {
    id: string;
    status: "APPROVE" | "REJECT" | "REVIEW";
    submittedAt: Date;
    file?: string;
    feedback?: string;
  } | null;
  activeSubmission?: {
    id: string;
    status: "APPROVE" | "REJECT" | "REVIEW";
    submittedAt: Date;
    file?: string;
    feedback?: string;
  };
  isHaveHistory: boolean;
}

// Render helpers
export const StatusBadge = ({
  status,
}: {
  status?: "APPROVE" | "REJECT" | "REVIEW";
}) => {
  if (!status) return null;

  const statusConfig = {
    APPROVE: {
      color: "bg-green-100 text-green-800 border border-green-800",
      icon: <FaCheckCircle className="mr-1" />,
    },
    REJECT: {
      color: "bg-red-100 text-red-800 border border-red-800",
      icon: <FaTimesCircle className="mr-1" />,
    },
    REVIEW: {
      color: "bg-yellow-100 text-yellow-800 border border-yellow-800",
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

export interface AssignmentDetailViewProps {
  mode: "current" | "history";
  data: AssignmentDataProps;
  onSubmit?: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
}

export const AssignmentDetailContent = ({
  mode,
  data,
  isLoading = false,
}: AssignmentDetailViewProps) => {
  const { classId } = useParams();
  const [sidebarOpen] = useAtom(LearningSidebarAtom);
  const [searchParams] = useSearchParams();

  const [files, setFiles] = useState<File | string | undefined>(undefined);
  const navigate = useNavigate();
  const moduleId = searchParams.get("moduleId");
  const mutation = useAssignmentsCreation();
  // Derived values
  const canSubmit =
    mode === "current" && !data.activeSubmission && !data.isHaveHistory;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!files) return;

    const formData = new FormData();
    formData.append("file", files);
    formData.append("assignmentId", data.id);

    await mutation.mutateAsync({
      type: "submit",
      data: formData as FormData,
      moduleId: data.module.id,
    });
  };

  const handleClear = () => setFiles(undefined);

  const handleBack = () => {
    navigate(`/learning/${classId}${moduleId ? `?moduleId=${moduleId}` : ""}`);
  };

  const renderSubmissionForm = () => {
    if (data.type === "FILE") {
      return (
        <>
          <UploadFile
            onChange={handleFileChange}
            file={typeof files === "string" || !files ? undefined : files}
            extensions={data.allowedFile?.split(",")}
          />
        </>
      );
    }

    if (data.type === "URL") {
      return (
        <div className="mb-6">
          <label className="block text-gray-700 mb-3 font-medium">
            Submission URL
          </label>
          <input
            type="url"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/your-work"
            onChange={(e) => setFiles(e.target.value)}
          />
        </div>
      );
    }

    return null;
  };

  // Tampilkan skeleton jika data belum ada atau sedang fetching
  if (!data || isLoading) {
    return <AssignmentDetailSkeleton />;
  }

  return (
    <div
      className={`p-4 md:p-6 transition-all duration-300 ${
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      } w-full max-w-[1920px] mx-auto`}
    >
      <div
        className="flex items-center gap-1 mb-6 cursor-pointer"
        onClick={handleBack}
      >
        <MdChevronLeft size={24} />
        <span className="font-medium">Back to Learning</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignment Header */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {data.title}
                </h1>
                <p className="text-gray-600">{data.module?.name}</p>
              </div>
              {mode === "current" && data.dueDate && (
                <div className="flex items-center text-sm bg-blue-50 text-blue-800 px-3 py-2 rounded-lg">
                  <FaCalendarAlt className="mr-2" />
                  <span>Due: {formatTime(data.dueDate, false)}</span>
                </div>
              )}
            </div>

            {/* Assignment Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium capitalize">
                  {data.type?.toLowerCase() || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                {data.submission ? (
                  <StatusBadge status={data.submission?.status} />
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
                  __html: data.description || "No description provided",
                }}
              />
            </div>
          </div>

          {/* Conditional Rendering */}
          {canSubmit ? (
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Submit Your Work</h2>
              {renderSubmissionForm()}
              <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
                <button
                  className="px-5 py-2.5 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleClear}
                >
                  Clear
                </button>
                <div className="w-48">
                  <Button
                    size="lg"
                    variant={mutation.isPending || !files ? "disabled" : "primary"}
                    onClick={handleSubmit}
                  >
                    <div className="flex items-center">
                      <FaPaperPlane className="mr-2" />
                      <Poppins>
                        {mutation.isPending ? "Loading..." : "Submit Assignment"}
                      </Poppins>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <CardSubmission
              data={data}
              mode={mode}
              isLoading={mutation.isPending}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Instructor Info */}
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Instructor</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="text-gray-500" />
              </div>
              <div>
                <p className="font-medium">{data.createdBy.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
