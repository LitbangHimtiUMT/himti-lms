import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { BreadCrumbProps } from "./types";
import { Eachable } from "../Eachable";
import { Poppins } from "../Text";

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ items, icon }) => {
  const location = useLocation();
  return (
    <>
      <div className="flex items-center gap-2">
        <Eachable
          datas={items}
          render={({ name, to }) => (
            <div className="flex items-center gap-2">
              {icon || <MdArrowBackIosNew className="text-lg" />}
              <Link to={to} className="flex items-center gap-4">
                <Poppins
                  className={`${
                    location.pathname === to ? "font-medium" : "text-gray-500"
                  } text-sm`}
                >
                  {name}
                </Poppins>
              </Link>
            </div>
          )}
        />
      </div>
    </>
  );
};
