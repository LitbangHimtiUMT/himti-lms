import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { FormCreateClassess } from "../components/classess/create-classess/FormCreateClassess";

export const CreateClassessViews = () => {
  return (
    <div className="flex flex-col gap-5">
      <BreadCrumb
        items={[
          {
            name: "Dashboard",
            to: "/dashboard/my-class",
          },
          {
            name: "Create Classess",
            to: `/dashboard/class/create`,
          },
        ]}
      />
      <FormCreateClassess />
    </div>
  );
};
