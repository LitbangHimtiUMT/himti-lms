import React from "react";
import { FaDownload, FaFileAlt, FaLink } from "react-icons/fa";
import { formatTime } from "../../../_global/lib/format-time";
import { AssignmentDetailViewProps } from "../AssignmentDetailContent";
import { Badge } from "../../../_global/components/Badge";
import { StatusRecord } from "../../../dashboard/store";

export const CardSubmission: React.FC<AssignmentDetailViewProps> = ({
  data,
  mode,
  type,
}) => {
  const submission = data.submission;
  return (
    <>
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "history" ? "Submission History" : "Submission Details"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium mb-3">Submission Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Submitted At</p>
                <p className="font-medium">
                  {submission?.submittedAt
                    ? formatTime(submission.submittedAt, false)
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                {submission ? (
                  <Badge
                    rounded="full"
                    size="sm"
                    variant={StatusRecord[submission?.status]}
                  >
                    {submission.status}
                  </Badge>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>

          {submission?.feedback && (
            <div>
              <h3 className="font-medium mb-3">Instructor Feedback</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{submission.feedback}</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-3">
            Submitted {data.type === "URL" ? "URL" : "Files"}
          </h3>
          <div className="border rounded-lg divide-y">
            {submission?.file ? (
              <a
                href={submission.file}
                className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  type === "URL" ? "text-blue-500 underline" : ""
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center">
                  {type === "FILE" ? (
                    <FaFileAlt className="text-gray-400 mr-3" />
                  ) : null}
                  <span>
                    {type === "FILE"
                      ? submission.file.split("/").pop()
                      : submission.file}
                  </span>
                </div>
                {type === "FILE" ? (
                  <FaDownload className="text-gray-400" />
                ) : (
                  <FaLink className="text-gray-400" />
                )}
              </a>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No {data.type === "URL" ? "URL" : "files"} submitted
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
