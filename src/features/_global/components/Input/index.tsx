import React, { ReactNode } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  rounded?: "sm" | "md" | "lg";
  error?: boolean;
  LeftIcon?: ReactNode;
  onClickLeftIcon?: () => void;
  onClickRightIcon?: () => void;
  RightIcon?: ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

export const Input: React.FC<InputProps> = ({
  rounded = "md",
  LeftIcon,
  RightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  error = false,
  inputSize = "md",
  ...rest
}) => {
  return (
    <div className="flex items-center justify-between">
      {LeftIcon && (
        <div className="absolute py-4 px-2" onClick={onClickLeftIcon}>
          {LeftIcon}
        </div>
      )}
      <input
        {...rest}
        className={`
          border
          ${
            inputSize === "sm"
              ? "px-2"
              : inputSize === "md"
              ? "px-4"
              : inputSize === "lg"
              ? "px-6"
              : ""
          }
              ${
                inputSize === "sm"
                  ? "h-8"
                  : inputSize === "md"
                  ? "h-10"
                  : "h-12"
              }
          ${inputSize === "sm" ? "py-2" : inputSize === "md" ? "py-3" : "py-4"}
          ${LeftIcon ? "pl-10" : ""}
          ${RightIcon ? "pr-10" : ""}
          ${error ? "border-red-500" : "border-[#DADADA]"}
          focus:border
          placeholder:text-sm
          placeholder:font-[Poppins]
          placeholder:text-[#87898E]
          ${error ? "focus:border-red-500" : "focus:border-blue-500"}
          duration-300
          font-poppins
          text-sm
          focus:outline-none
          w-full
          ${error ? "text-red-500" : ""}
          ${
            rounded == "sm"
              ? "rounded-sm"
              : rounded == "md"
              ? "rounded-md"
              : "rounded-lg"
          }
          `}
      />
      {RightIcon && (
        <div className="absolute right-10 p-4" onClick={onClickRightIcon}>
          <div>{RightIcon}</div>
        </div>
      )}
    </div>
  );
};
