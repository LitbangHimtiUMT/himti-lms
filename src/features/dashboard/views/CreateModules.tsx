import { useParams, useSearchParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { FormCreateModules } from "../components/modules/create-modules/FormCreateModules";

export const CreateModules = () => {
  const { sessionId, classId } = useParams();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  return (
    <div className="flex flex-col gap-5">
      <BreadCrumb
        items={[
          {
            name: `${
              from === "enrolled" ? "Enrolled Class" : "My Class"
            }`,
            to: `/dashboard${
              from === "enrolled" ? "/enrolled-class" : "/my-class"
            }`,
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
