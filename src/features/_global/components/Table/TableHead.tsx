import React from "react";
import { Poppins } from "../Text";

interface ITableHeadProps {
  field: string[];
}

export const TableHead: React.FC<ITableHeadProps> = ({ field }) => {
  return (
    <thead>
      <tr className="bg-[#192d4c] text-white">
        {field.map((item, index) => (
          <th key={index} className="py-3 px-6 text-left font-medium text-sm">
            <Poppins className="text-sm">{item}</Poppins>
          </th>
        ))}
      </tr>
    </thead>
  );
};
