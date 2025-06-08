import { useParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { DetailAssignmentContent } from "../components/modules/assignments/DetailAssignmentsContent";

export const DetailAssignmentView = () => {
  const { classId, sessionId, moduleId, assignmentId } = useParams();
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <BreadCrumb
            items={[
              {
                name: `My Class`,
                to: `/dashboard/my-class`,
              },
              {
                name: "Detail Session",
                to: `/dashboard/${classId}/${sessionId}`,
              },
              {
                name: "Detail Module",
                to: `/dashboard/${classId}/${sessionId}/${moduleId}`,
              },
              {
                name: "Assignment",
                to: `/dashboard/${classId}/${sessionId}/${moduleId}/${assignmentId}`,
              },
            ]}
          />
        </div>
        <DetailAssignmentContent />
      </div>
    </>
  );
};
