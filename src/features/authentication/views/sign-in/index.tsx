import { AuthBrandPanel } from "../../components/AuthBrandPanel";
import { FormSignIn } from "../../components/FormSignIn";

export const SignInViews = () => {
  return (
    <div className="flex min-h-screen flex-col-reverse bg-white lg:flex-row">
      <div className="flex flex-1 items-center justify-center px-6 py-14">
        <FormSignIn />
      </div>
      <AuthBrandPanel />
    </div>
  );
};
