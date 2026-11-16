import { FaEye, FaEyeSlash } from "react-icons/fa";
import { InputLabel } from "../../_global/components/InputLabel";
import { useState } from "react";
import { AuthRegisterDTO } from "@core/model/auth";
import { useAuthCreation } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const InitialValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Mirrors the server-side email rule (registerSchema): an address with
// a local part, @, and a dotted domain. The API remains the final judge.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FormSignUp = () => {
  const [authBody, setAuthBody] = useState<AuthRegisterDTO>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<AuthRegisterDTO>({ ...InitialValue });

  const mutation = useAuthCreation();

  const validate = () => {
    // Every field is checked on every submit, mirroring the server
    // rules (registerSchema: name/email/password required, email
    // format, password min 8) plus the confirm-password match, which
    // only exists on the client.
    const newErrors: AuthRegisterDTO = { ...InitialValue };

    if (!authBody.name) {
      newErrors.name = "Name is required";
    }

    if (!authBody.email) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_PATTERN.test(authBody.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!authBody.password) {
      newErrors.password = "Password is required";
    } else if (authBody.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!authBody.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (authBody.confirmPassword !== authBody.password) {
      newErrors.confirmPassword = "Confirm Password does not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate({
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
    <div className="w-full max-w-[400px]">
      <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-slate-900">
        Create your account
      </h1>
      <p className="mt-2 text-sm leading-[1.6] text-slate-500">
        Daftar gratis, mulai belajar hari ini. Tanpa kartu kredit, tanpa
        ribet.
      </p>
      <form
        className="mt-8 flex flex-col gap-[18px]"
        onSubmit={handleSubmit}
      >
        <InputLabel
          title="Full Name"
          titleClassName="text-[13px] font-medium text-slate-700"
          inputProps={{
            rounded: "xl",
            inputSize: "lg",
            borderColor: "slate",
            focusRing: true,
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
        <InputLabel
          title="Confirm Password"
          titleClassName="text-[13px] font-medium text-slate-700"
          inputProps={{
            type: showConfirmPassword ? "text" : "password",
            rounded: "xl",
            inputSize: "lg",
            borderColor: "slate",
            focusRing: true,
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
        <button
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#3966bf] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#2b4f9c] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={mutation.isPending}
          type="submit"
        >
          {mutation.isPending ? "Loading..." : "Daftar"}
        </button>
      </form>
      <p className="mt-7 text-center text-sm text-slate-500">
        Sudah punya akun?{" "}
        <Link
          to="/sign-in"
          className="font-semibold text-[#3966bf] transition-colors duration-200 hover:text-[#2b4f9c]"
        >
          Masuk
        </Link>
      </p>
    </div>
  );
};
