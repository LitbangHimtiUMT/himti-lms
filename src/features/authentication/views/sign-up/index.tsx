import Family from "@core/assets/family.png";
import { FormSignUp } from "../../components/FormSignUp";

export const SignUpViews = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col-reverse lg:flex-row">
      <div className="w-full flex items-center justify-center z-20">
        <FormSignUp />
      </div>

      <div className="relative my-[-20px] shadow-xl">
        <div className="bg-black absolute left-0 right-0 top-0 bottom-0 z-10 opacity-30 lg-max:mb-[-40vh]"></div>
        <div className="sticky top-0 lg-max:mb-[-40vh] h-screen">
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
