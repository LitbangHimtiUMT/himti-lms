import React, { useState } from "react";
import { FaCalendarAlt, FaPaperPlane } from "react-icons/fa";
import { Button } from "../../../_global/components/Button";
import { Poppins } from "../../../_global/components/Text";
import { UploadFile } from "../../../_global/components/UploadFiles";
import { formatTime } from "../../../_global/lib/format-time";
import { useAssignmentsCreation } from "../../../dashboard/hooks/assignments/useAssignmentsCreation";
import { AssignmentDataProps } from "../AssignmentDetailContent";
import { CardSubmission } from "../submission/CardSubmission";
import { Badge } from "../../../_global/components/Badge";
import { StatusRecord } from "../../../dashboard/store";

interface HeaderAssignmentProps {
  data: AssignmentDataProps;
  mode: "current" | "history";
  isSubmit: boolean;
}

export const HeaderAssignment: React.FC<HeaderAssignmentProps> = ({
  data,
  mode,
  isSubmit,
}) => {
  const [files, setFiles] = useState<File | string | undefined>(undefined);
  const mutation = useAssignmentsCreation();
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
  const handleClear = () => setFiles(undefined);
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
  return (
    <>
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
                <Badge
                  variant={StatusRecord[data.submission?.status]}
                  size="sm"
                  rounded="full"
                >
                  {data.submission?.status}
                </Badge>
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
        {isSubmit ? (
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Submit Your Work</h2>
            {renderSubmissionForm()}
            <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
              <Button size="md" variant="secondary" onClick={handleClear}>
                Clear
              </Button>
              <div className="md:w-max">
                <Button
                  size="md"
                  variant={
                    mutation.isPending || !files ? "disabled" : "primary"
                  }
                  onClick={handleSubmit}
                >
                  <div className="flex items-center md:justify-start justify-center">
                    <FaPaperPlane className="mr-2" />
                    <Poppins>
                      {mutation.isPending ? "Loading..." : "Submit"}
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
    </>
  );
};
