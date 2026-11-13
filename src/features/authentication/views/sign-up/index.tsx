import { AuthBrandPanel } from "../../components/AuthBrandPanel";
import { FormSignUp } from "../../components/FormSignUp";

export const SignUpViews = () => {
  return (
    <div className="flex min-h-screen flex-col-reverse bg-white lg:flex-row">
      <div className="flex flex-1 items-center justify-center px-6 py-14">
        <FormSignUp />
      </div>
      <AuthBrandPanel variant="signup" />
    </div>
  );
};
