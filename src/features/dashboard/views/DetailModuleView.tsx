import { useParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { DetailModuleContent } from "../components/modules/detail-modules/DetailModuleContent";

export const DetailModuleView = () => {
  const { sessionId, moduleId, classId } = useParams();
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <BreadCrumb
            items={[
              {
                name: "Dashboard",
                to: "/dashboard",
              },
              {
                name: "Detail Session",
                to: `/dashboard/${classId}/${sessionId}`,
              },
              {
                name: "Detail Module",
                to: `/dashboard/${classId}/${sessionId}/${moduleId}`,
              },
            ]}
          />
        </div>
        <DetailModuleContent />
      </div>
    </>
  );
};
