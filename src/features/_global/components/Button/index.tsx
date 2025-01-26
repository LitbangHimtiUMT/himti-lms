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
  return (
    <button
      {...rest}
      onClick={(e) =>
        variant === "disabled" ? e.preventDefault() : rest?.onClick?.(e)
      }
      className={`
    ${
      variant == "danger"
        ? "bg-red-500"
        : variant == "secondary"
        ? "bg-gray-50"
        : variant == "primary"
        ? "bg-[#023A6B]"
        : variant == "success"
        ? "bg-green-500"
        : variant == "warning"
        ? "bg-[#ffcc00]"
        : "bg-gray-300"
    }
    ${
      variant == "secondary" || variant == "disabled"
        ? "text-gray-500"
        : "text-white"
    }
        ${
          variant == "disabled" && !rest.onClick
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }
    ${
      rounded == "sm"
        ? "rounded-sm"
        : rounded == "full"
        ? "rounded-full"
        : rounded == "lg"
        ? "rounded-lg"
        : "rounded-md"
    }
    font-poppins
    ${generateSize(size)}
    w-full
    duration-300
    ${
      variant == "secondary" || variant == "disabled"
        ? "border border-solid border-gray-300"
        : ""
    }
     ${
       variant == "danger"
         ? "hover:bg-red-600"
         : variant == "secondary"
         ? "hover:bg-gray-100"
         : variant == "primary"
         ? "hover:bg-[#2b6394]"
         : variant == "success"
         ? "hover:bg-green-600"
         : variant == "warning"
         ? "hover:bg-[#d09c35]"
         : variant == "disabled" && rest.onClick
         ? "hover:bg-gray-400"
         : ""
     }
    `}
    >
      {children}
    </button>
  );
};
