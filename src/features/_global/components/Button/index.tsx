import { ReactNode } from "react";
import { generateSize } from "./utils";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "disabled"
    | "warning";
  rounded?: "sm" | "md" | "lg" | "full";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<IButtonProps> = ({
  children,
  variant = "primary",
  rounded = "md",
  size = "md",
  ...rest
}) => {
  const isDisabled = variant === "disabled";
  const hasClick = !!rest.onClick;

  const baseClasses =
    "font-poppins w-full transition-all duration-300 transform active:scale-95 active:shadow-sm";
  const cursorClass =
    isDisabled && !hasClick ? "cursor-not-allowed" : "cursor-pointer";
  return (
    <button
      {...rest}
      onClick={(e) =>
        variant === "disabled" ? e.preventDefault() : rest?.onClick?.(e)
      }
      className={`
      font-[Poppins] ${
        variant == "danger"
          ? "bg-red-500 shadow-red-500"
          : variant == "secondary"
          ? "bg-white shadow-gray-400"
          : variant == "primary"
          ? "bg-gradient-to-r from-[#4C76A3] to-[#203D5D] shadow-[#466c8e]"
          : variant == "success"
          ? "bg-green-500 shadow-green-500"
          : variant == "warning"
          ? "bg-[#ffcc00] shadow-yellow-500"
          : "bg-gray-300 shadow-gray-300"
      } ${
        variant == "secondary"
          ? "text-black"
          : variant == "disabled"
          ? "text-gray-500"
          : "text-white"
      } ${
        rounded == "sm"
          ? "rounded-sm"
          : rounded == "full"
          ? "rounded-full"
          : rounded == "lg"
          ? "rounded-lg"
          : "rounded-md"
      } font-poppins ${generateSize(size)} ${baseClasses} ${cursorClass} ${
        variant === "danger"
          ? "active:shadow-red-700"
          : variant === "secondary"
          ? "active:shadow-gray-500"
          : variant === "primary"
          ? "active:shadow-blue-900"
          : variant === "success"
          ? "active:shadow-green-700"
          : variant === "warning"
          ? "active:shadow-yellow-600"
          : "active:shadow-gray-400"
      } ${
        variant == "secondary" ? "border border-solid border-[#2b6394]" : ""
      } ${
        variant == "danger"
          ? "hover:bg-red-600"
          : variant == "secondary"
          ? "hover:bg-gray-100"
          : variant == "primary"
          ? "hover:bg-gradient-to-r hover:from-[#2b6394] hover:to-[#2b6394]"
          : variant == "success"
          ? "hover:bg-green-600"
          : variant == "warning"
          ? "hover:bg-[#d09c35]"
          : variant == "disabled" && rest.onClick
          ? "hover:bg-gray-400"
          : ""
      }`}
    >
      {children}
    </button>
  );
};
