import React from "react";
import { ISidebarItemProps } from "./types";
import { Link, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { sidebarAtom } from "./store";
import { useScreen } from "../../../_global/hooks/useScreen";

export const SidebarItem: React.FC<ISidebarItemProps> = ({ items, title }) => {
  const location = useLocation();
  const [, setShow] = useAtom(sidebarAtom);
  const screen = useScreen();

  const mobile = !screen.lg && !screen.xl && !screen["2xl"];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          {title && (
            <p className="text-sm font-poppins font-semibold text-[#999797]">
              {title}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-5">
          {items?.map((item, index) => (
            <Link to={item.path} onClick={() => mobile && setShow(false)}>
              <div
                key={index}
                className={`${
                  location.pathname === item.path
                    ? "bg-[#192d4c] text-white"
                    : ""
                } p-4 rounded-md text-md cursor-pointer`}
              >
                <p className="font-poppins text-sm">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
