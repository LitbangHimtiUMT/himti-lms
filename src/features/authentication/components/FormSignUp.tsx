import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../../_global/components/Button";
import { InputLabel } from "../../_global/components/InputLabel";
import { useState } from "react";
import { AuthRegisterDTO } from "@core/model/auth";
import { useAuthCreation } from "../hooks/useAuth";

const InitialValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const FormSignUp = () => {
  const [authBody, setAuthBody] = useState<AuthRegisterDTO>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<AuthRegisterDTO>({ ...InitialValue });

  const mutation = useAuthCreation();

  const validate = () => {
    if (!authBody.email || !authBody.password) {
      const newErrors: AuthRegisterDTO = { ...InitialValue };

      if (!authBody.name) {
        newErrors.name = "Name is required";
      }

      if (!authBody.email) {
        newErrors.email = "Email is required";
      }
      if (!authBody.password) {
        newErrors.password = "Password is required";
      }

      if (!authBody.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required";
      }
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await mutation.mutateAsync({
      body: {
        email: authBody.email,
        password: authBody.password,
        name: authBody.name,
      },
      type: "register",
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <div className="lg:mt-24 lg:px-10 py-10 w-full flex items-center justify-center">
        <div className="lg:w-full w-[95%] bg-white h-full p-10 rounded-xl flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col lg:w-[75%] w-full gap-2">
            <h1 className="lg:text-4xl text-xl font-semibold">
              Sign Up here !
            </h1>
            <h1 className="lg:text-3xl text-lg font-semibold">
              Start your adventure
            </h1>
          </div>
          <form
            className="flex flex-col items-center gap-6 w-full"
            onSubmit={handleSubmit}
          >
            <div className="lg:w-[75%] w-full">
              <InputLabel
                title="Full Name"
                inputProps={{
                  rounded: "full",
                  borderColor: "black",
                  placeholder: "Enter your name",
                  placeholderColor: "normal",
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthBody((prev) => ({
                      ...prev,
                      name: e.target.value,
                    })),
                  error: !!errors.name,
                  errorText: errors.name,
                }}
              />
            </div>
            <div className="lg:w-[75%] w-full">
              <InputLabel
                title="Email"
                inputProps={{
                  rounded: "full",
                  borderColor: "black",
                  placeholder: "Enter your email",
                  placeholderColor: "normal",
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthBody((prev) => ({ ...prev, email: e.target.value })),
                  error: !!errors.email,
                  errorText: errors.email,
                }}
              />
            </div>
            <div className="lg:w-[75%] w-full ">
              <InputLabel
                title="Password"
                inputProps={{
                  rounded: "full",
                  borderColor: "black",
                  placeholder: "Enter your password",
                  placeholderColor: "normal",
                  RightIcon: showPassword ? (
                    <FaEye size={16} />
                  ) : (
                    <FaEyeSlash size={16} />
                  ),
                  onClickRightIcon() {
                    setShowPassword((prev) => !prev);
                  },
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthBody((prev) => ({
                      ...prev,
                      password: e.target.value,
                    })),
                  error: !!errors.password,
                  errorText: errors.password,
                }}
              />
            </div>
            <div className="lg:w-[75%] w-full ">
              <InputLabel
                title="Confirm Password"
                inputProps={{
                  rounded: "full",
                  borderColor: "black",
                  placeholder: "Confirm your password",
                  placeholderColor: "normal",
                  RightIcon: showConfirmPassword ? (
                    <FaEye size={16} />
                  ) : (
                    <FaEyeSlash size={16} />
                  ),
                  onClickRightIcon() {
                    setShowConfirmPassword((prev) => !prev);
                  },
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthBody((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    })),
                  error: !!errors.confirmPassword,
                  errorText: errors.confirmPassword,
                }}
              />
            </div>
            <div className="lg:w-[75%] w-full">
              <Button
                rounded="full"
                size="lg"
                variant={mutation.isPending ? "disabled" : "primary"}
                type="submit"
              >
                {mutation.isPending ? "Loading..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
