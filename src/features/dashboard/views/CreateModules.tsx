import { useParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { FormCreateModules } from "../components/modules/create-modules/FormCreateModules";

export const CreateModules = () => {
  const { sessionId, classId } = useParams();
  return (
    <div className="flex flex-col gap-5">
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
            name: "Create Modules",
            to: `/dashboard/${classId}/${sessionId}/create-modules`,
          },
        ]}
      />
      <FormCreateModules />
    </div>
  );
};
