import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { FormCreateModules } from "../components/create-modules/FormCreateModules";

export const CreateModules = () => {
  return (
    <div className="mt-4 lg:mt-6">
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-4">
          <MdArrowBackIosNew className="text-2xl" />
          <h1 className="text-2xl font-bold">Create Modules</h1>
        </Link>
      </div>
      <FormCreateModules />
    </div>
  );
};
