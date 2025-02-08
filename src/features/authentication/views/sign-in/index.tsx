import Family from "@core/assets/family.png";
import { FormSignIn } from "../../components/FormSignIn";

export const SignInViews = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-full lg:w-3/5 flex items-center justify-center">
        <FormSignIn />
      </div>

      <div className="hidden lg:block w-2/5 relative">
        <div className="sticky top-0 h-screen">
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
