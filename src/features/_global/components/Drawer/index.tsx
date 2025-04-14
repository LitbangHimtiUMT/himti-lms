import React, { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";
import { BiChevronLeft } from "react-icons/bi";
import { Poppins } from "../Text";

interface DrawerProps extends PropsWithChildren {
  show: boolean;
  onHide: VoidFunction;
  close?: {
    icon?: ReactNode;
    onClick?: VoidFunction;
    title?: string;
  };
  style?: CSSProperties;
}

export const Drawer: React.FC<DrawerProps> = ({
  onHide,
  show,
  children,
  close,
  style,
}) => {
  return (
    <>
      {createPortal(
        <div
          className={`fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0, 0, 0, 0.61)] backdrop:filter backdrop-blur-sm z-40 flex items-center justify-end w-screen cursor-pointer duration-300 ${
            show ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={onHide}
        >
          <div
            className={`bg-white h-[90vh] lg:w-96 w-[85%] rounded-xl transition-transform duration-300 transform shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-default ${
              show ? "-translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
            style={style}
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={() => (close?.onClick ? close.onClick() : onHide())}
            >
              <div className="ml-2 my-4 p-2 w-max h-max">
                {close?.icon ? close?.icon : <BiChevronLeft size={24} />}
              </div>
              <Poppins className="text-sm">
                {close?.title || "Back"}
              </Poppins>
            </div>
            {children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
