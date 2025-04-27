import React, { PropsWithChildren } from "react";

interface ITableBodyProps extends PropsWithChildren {
  children: React.ReactNode;
}

export const Table: React.FC<ITableBodyProps> = ({ children }) => {
  return (
    <>
      <div className="overflow-x-auto rounded-md border border-solid border-gray-300">
        <table className="w-full ">{children}</table>
      </div>
    </>
  );
};
