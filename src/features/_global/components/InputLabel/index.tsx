import React from "react";
import { Poppins } from "../Text";
import { Input, InputProps } from "../Input";

interface InputLabelProps {
  title: string;
  inputProps?: InputProps;
}

export const InputLabel: React.FC<InputLabelProps> = ({
  title,
  inputProps,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Poppins>{title}</Poppins>
      <Input {...inputProps} />
    </div>
  );
};
