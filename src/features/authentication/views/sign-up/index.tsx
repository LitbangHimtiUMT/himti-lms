import Family from "@core/assets/family.png";
import { FormSignUp } from "../../components/FormSignUp";

export const SignUpViews = () => {
  return (
    <div className="flex lg:flex-row flex-col-reverse w-full h-full bg-[#F5F5F5] justify-between -mt-24">
      <FormSignUp />
      <img
        src={Family}
        className="lg:h-[100vh] h-[50vh] lg:w-[50vw] w-[100vw] object-cover"
      />
    </div>
  );
};
