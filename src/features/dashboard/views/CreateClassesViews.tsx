import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { FormCreateClasses } from "../components/classes/create-classes/FormCreateClasses";

export const CreateClassesViews = () => {
  return (
    <div className="flex flex-col gap-5">
      <BreadCrumb
        items={[
          {
            name: "Dashboard",
            to: "/dashboard/my-class",
          },
          {
            name: "Create Classes",
            to: `/dashboard/my-class/create`,
          },
        ]}
      />
      <FormCreateClasses />
    </div>
  );
};
