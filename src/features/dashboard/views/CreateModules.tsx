import { useParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { FormCreateModules } from "../components/create-modules/FormCreateModules";

export const CreateModules = () => {
  const { sessionId } = useParams();
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
            to: `/dashboard/${sessionId}`,
          },
          {
            name: "Create Modules",
            to: `/dashboard/${sessionId}/create-modules`,
          },
        ]}
      />
      <FormCreateModules />
    </div>
  );
};
