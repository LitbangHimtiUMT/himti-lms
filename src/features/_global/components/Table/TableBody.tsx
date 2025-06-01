import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface ITableBodyProps extends PropsWithChildren {
  children: React.ReactNode;
  className?: string;
}

export const TableBody: React.FC<ITableBodyProps> = ({ children, className }) => {
  return <tbody className={clsx("bg-gray", className)}>{children}</tbody>;
};