import Family from "@core/assets/family.png";
import { FormSignUp } from "../../components/FormSignUp";

export const SignUpViews = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col-reverse lg:flex-row">
      <div className="w-full flex items-center justify-center">
        <FormSignUp />
      </div>

      <div className="relative">
        <div className="sticky top-0 lg-max:h-[50vh] h-screen">
          <img
            src={Family}
            alt="Family"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
