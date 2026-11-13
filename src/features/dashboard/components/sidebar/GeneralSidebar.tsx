import clsx from "clsx";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { CgMenuLeft } from "react-icons/cg";
import { Skeleton } from "../../../_global/components/Shimer";
import { Poppins } from "../../../_global/components/Text";
import { useScreen } from "../../../_global/hooks/useScreen";
import { SidebarItem } from "./SidebarItem";
import { sidebarAtom } from "./store";
import { ISidebarProps } from "./types";

export const GeneralSidebar: React.FC<ISidebarProps> = ({
  items,
  user,
  isFetching,
}) => {
  const [show, setShow] = useAtom(sidebarAtom);
  const handleShow = () => setShow((prev) => !prev);
  const screen = useScreen();

  const mobile = !screen.lg && !screen.xl && !screen["2xl"];

  useEffect(() => {
    if (mobile) {
      setShow(false);
    }
  }, []);
  return (
    <>
      {/* Toggle Button */}
      <div
        className={clsx(
          `fixed lg:top-8 top-2 left-4 ${
            show ? "lg:left-[266px]" : ""
          } z-[998] p-2 lg:mt-2 flex items-center justify-center bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-full w-10 h-10 cursor-pointer duration-300`
        )}
        onClick={handleShow}
      >
        {/* <HiOutlineMenuAlt3 className="text-xl text-gray-900" /> */}
        <CgMenuLeft className="text-xl text-black" />
      </div>

      {/* Sidebar - Overlay for mobile */}
      {
        <>
          {/* BACKDROP untuk mobile */}
          <div
            className={clsx(
              "fixed inset-0 bg-black bg-opacity-40 z-[996] lg:hidden transition-opacity duration-300",
              show ? "opacity-100 visible" : "opacity-0 invisible"
            )}
            onClick={handleShow}
          ></div>

          {/* SIDEBAR */}
          <div
            className={clsx(
              "fixed top-0 left-0 z-[997] h-screen bg-white shadow-lg transition-transform duration-300 lg:w-72 w-full",
              show ? "translate-x-0" : "-translate-x-full",
              "lg:flex lg:flex-col lg:w-64 lg:border-r"
            )}
          >
            <div className="mt-14 px-5">
              <img
                src="/HIMTI.png"
                alt="HIMTI"
                className="w-[100px] h-auto object-contain"
              />
            </div>
            {/* Content */}
            <div className="pt-4 px-5 h-full flex flex-col">
              {/* Scrollable Items */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-[230px]">
                {isFetching ? (
                  <>
                    {Array.from({ length: 4 }).map(() => (
                      <Skeleton width="100%" height="3rem" />
                    ))}
                  </>
                ) : (
                  items?.map((items, index) => (
                    <SidebarItem
                      items={items.items}
                      key={index}
                      title={items.title}
                    />
                  ))
                )}
              </div>

              {/* Fixed User Info */}
              {user && (
                <div className="fixed bottom-0 left-0 w-full border-t pt-4 px-4 h-20 bg-white border-gray-300 flex items-center gap-4">
                  <div>
                    {user.icon ? (
                      user.icon
                    ) : (
                      <BsFillPersonVcardFill className="text-2xl" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <Poppins className="text-gray-700 md:text-md text-sm font-medium">
                      {user.name}
                    </Poppins>
                    <Poppins className="text-gray-500 md:text-sm text-xs">
                      {user.email}
                    </Poppins>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      }
    </>
  );
};
