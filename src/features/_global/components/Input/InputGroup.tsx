import {
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React from "react";

interface InputGroupProps {
  label?: string;
  variant?: "outlined" | "filled" | "standard";
  error?: string;
  mb?: boolean;
  value?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: React.ChangeEvent<any>) => void | string;
  type?:
    | "text"
    | "textarea"
    | "select"
    | "file"
    | "number"
    | "email"
    | "search"
    | "password";
  options?: { value: string | boolean; label: string; onClick?: () => void }[]; // Digunakan untuk Select
  isPending?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any; // Untuk menangani properti tambahan
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  variant = "outlined",
  error,
  value,
  onChange,
  mb = true,
  type,
  options = [],
  isPending,
  className,
  ...rest
}) => {
  return (
    <div
      id={type === "file" ? "container-image" : ""}
      className={`${type !== "search" && mb && "mb-4"} ${className}`}
    >
      {(type === "text" ||
        type === "email" ||
        type === "number" ||
        type === "password" ||
        type === "search") && (
        <Input
          type={type}
          disabled={isPending}
          label={label}
          variant={variant}
          error={!!error}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
      {type === "file" && (
        <Input
          disabled={isPending}
          type="file"
          label={label}
          variant={variant}
          error={!!error}
          onChange={onChange}
          {...rest}
        />
      )}
      {type === "textarea" && (
        <Textarea
          disabled={isPending}
          label={label}
          variant={variant}
          error={!!error}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
      {type === "select" && (
        <Select
          disabled={isPending}
          label={label}
          value={value}
          error={!!error}
          onChange={onChange}
          {...rest}
        >
          {options.map((option) => (
            <Option
              onClick={option.onClick}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </Option>
          ))}
        </Select>
      )}
      {error && (
        <Typography
          variant="small"
          color="red"
          className="flex items-center gap-1 font-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="-mt-px h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default InputGroup;
