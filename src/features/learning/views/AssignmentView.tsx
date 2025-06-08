import { Calendar, FileText } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ModuleDTO } from "../../../core/model/modules";
import { Button } from "../../_global/components/Button";
import { Poppins } from "../../_global/components/Text";
import { formatTime } from "../../_global/lib/format-time";

interface AssignmentProps {
  modules: ModuleDTO;
}

export const AssignmentView: React.FC<AssignmentProps> = ({ modules }) => {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const { classId } = useParams();

  const haveActiveAssignment = modules?.assignment?.activeSubmission;
  const haveApproveSubmission = modules?.assignment?.historySubmission?.find(
    (item) => item.status === "APPROVE"
  );
  const navigate = useNavigate();
  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
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
          {modules.assignment && !haveApproveSubmission ? (
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
                {haveActiveAssignment ? (
                  <>
                    <span className="px-3 py-0.5 bg-yellow-100 text-yellow-800 border border-solid border-yellow-800 text-sm rounded-full">
                      <Poppins className="text-sm">
                        {haveActiveAssignment?.status}
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
                  to={`/learning/${classId}/assignment/${modules?.assignment.id}?moduleId=${modules?.id}`}
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
                  <span
                    className={`px-3 py-1 text-sm rounded-lg border border-solid ${
                      assignment?.status === "APPROVE"
                        ? "bg-green-100 text-green-800 border-green-500"
                        : assignment?.status === "REJECT"
                        ? "bg-red-100 text-red-800 border-red-500"
                        : "bg-yellow-100 text-yellow-800 border-yellow-500"
                    }`}
                  >
                    {assignment?.status}
                  </span>
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

                <div className="mt-4 flex justify-end w-full">
                  <div className="w-1/4">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        navigate(
                          `/learning/${classId}/assignment/${modules?.assignment?.id}/${assignment.id}`
                        )
                      }
                    >
                      View Details
                    </Button>
                  </div>
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
