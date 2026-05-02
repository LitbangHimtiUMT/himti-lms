import { FileText } from "lucide-react";
import { useState } from "react";
import { ModuleDTO } from "../../../core/model/modules";
import { CardAssignment } from "../components/assignment/Card/CardAssignment";

interface AssignmentProps {
  modules: ModuleDTO;
}

export const AssignmentView: React.FC<AssignmentProps> = ({ modules }) => {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const haveApproveSubmission = modules?.assignment?.historySubmission?.find(
    (item) => item.status === "APPROVE"
  );
  return (
    <div className="md:p-6 md:pb-48 p-2">
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
          Active
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "history"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      {activeTab === "active" ? (
        <div className="space-y-4">
          {modules.assignment && !haveApproveSubmission ? (
            <>
              <CardAssignment
                assignmentId={modules.assignment.id}
                moduleId={modules.id}
                title={modules.assignment.title}
                dueDate={modules.assignment.dueDate}
                isOpen={modules.assignment.isOpen}
                isHaveActiveSubmission={!!modules.assignment.activeSubmission}
                status={modules.assignment.activeSubmission?.status}
              />
            </>
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
              <>
                <CardAssignment
                  submissionId={assignment.id}
                  assignmentId={modules?.assignment?.id || ""}
                  isHaveActiveSubmission
                  moduleId={modules.id}
                  isOpen={modules?.assignment?.isOpen}
                  title={modules?.assignment?.title || ""}
                  dueDate={assignment?.submittedAt}
                  status={assignment?.status}
                />
              </>
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
