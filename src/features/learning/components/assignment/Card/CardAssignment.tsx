import React from "react";
import { LuCalendarClock } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../../../_global/components/Badge";
import { Button } from "../../../../_global/components/Button";
import { formatTime } from "../../../../_global/lib/format-time";
import { SubmissionStatus } from "../../../../dashboard/components/modules/detail-modules/DetailModuleContent";
import { StatusRecord } from "../../../../dashboard/store";

interface CardAssignmentProps {
  title: string;
  isHaveActiveSubmission: boolean;
  status?: SubmissionStatus;
  dueDate?: Date;
  assignmentId: string;
  moduleId: string;
  type?: "active" | "history";
}

export const CardAssignment: React.FC<CardAssignmentProps> = ({
  isHaveActiveSubmission,
  status,
  title,
  dueDate,
  assignmentId,
  moduleId,
  type = "active",
}) => {
  const { classId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          {isHaveActiveSubmission && status ? (
            <>
              <Badge
                rounded="full"
                size="sm"
                variant={StatusRecord[status]}
              >
                {status}
              </Badge>
            </>
          ) : null}
        </div>

        <div className="mt-4 flex md:flex-row flex-col md:items-center md:gap-0 gap-2 justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <LuCalendarClock size={16} className="mr-1" />
              <span>
                {type === "active" ? "Due:" : "Submitted:"}{" "}
                {dueDate ? formatTime(dueDate, false) : "-"}
              </span>
            </div>
          </div>

          <div className="md:w-max w-full">
            <Button
              onClick={() =>
                navigate(
                  `/learning/${classId}/assignment/${assignmentId}?moduleId=${moduleId}`
                )
              }
              variant={isHaveActiveSubmission ? "secondary" : "primary"}
            >
              {isHaveActiveSubmission ? "View Assignment" : "Start Assignment"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
