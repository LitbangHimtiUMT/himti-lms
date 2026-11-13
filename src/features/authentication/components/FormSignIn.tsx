import { FaEye, FaEyeSlash } from "react-icons/fa";
import { InputLabel } from "../../_global/components/InputLabel";
import { useState } from "react";
import { useAuthCreation } from "../hooks/useAuth";
import { AuthLoginDTO } from "@core/model/auth";
import { Link } from "react-router-dom";

const InitialValue = {
  email: "",
  password: "",
};

export const FormSignIn = () => {
  const [authBody, setAuthBody] = useState<AuthLoginDTO>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<AuthLoginDTO>({ ...InitialValue });

  const mutation = useAuthCreation();

  const validate = () => {
    if (!authBody.email || !authBody.password) {
      const newErrors: AuthLoginDTO = { ...InitialValue };

      if (!authBody.email) {
        newErrors.email = "Email is required";
      }
      if (!authBody.password) {
        newErrors.password = "Password is required";
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
      body: authBody,
      type: "login",
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[400px]">
      <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-slate-900">
        Sign in
      </h1>
      <p className="mt-2 text-sm leading-[1.6] text-slate-500">
        Let&rsquo;s upgrade your skills. Masuk untuk lanjut belajar.
      </p>
      <form
        className="mt-8 flex flex-col gap-[18px]"
        onSubmit={handleSubmit}
      >
        <InputLabel
          title="Email"
          titleClassName="text-[13px] font-medium text-slate-700"
          inputProps={{
            rounded: "xl",
            inputSize: "lg",
            borderColor: "slate",
            focusRing: true,
            placeholder: "Enter your email",
            placeholderColor: "normal",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthBody((prev) => ({ ...prev, email: e.target.value })),
            error: !!errors.email,
            errorText: errors.email,
          }}
        />
        <InputLabel
          title="Password"
          titleClassName="text-[13px] font-medium text-slate-700"
          inputProps={{
            type: showPassword ? "text" : "password",
            rounded: "xl",
            inputSize: "lg",
            borderColor: "slate",
            focusRing: true,
            placeholder: "Enter your password",
            placeholderColor: "normal",
            RightIcon: showPassword ? (
              <FaEye
                size={16}
                style={{
                  cursor: "pointer",
                }}
              />
            ) : (
              <FaEyeSlash
                size={16}
                style={{
                  cursor: "pointer",
                }}
              />
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
        <div className="-mt-2 flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-[#3966bf] transition-colors duration-200 hover:text-[#2b4f9c]"
          >
            Lupa password?
          </Link>
        </div>
        <button
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#3966bf] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#2b4f9c] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={mutation.isPending}
          type="submit"
        >
          {mutation.isPending ? "Loading..." : "Masuk"}
        </button>
      </form>
      <p className="mt-7 text-center text-sm text-slate-500">
        Belum punya akun?{" "}
        <Link
          to="/sign-up"
          className="font-semibold text-[#3966bf] transition-colors duration-200 hover:text-[#2b4f9c]"
        >
          Daftar gratis
        </Link>
      </p>
    </div>
  );
};
