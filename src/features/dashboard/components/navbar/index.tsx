import DefaultImage from "@core/assets/default-photo.svg";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { Poppins } from "../../../_global/components/Text";
import { useProfile } from "../../../profile/useProfile";
import { LogoutConfirmation } from "./LogoutConfirmation";

export const DashboardNavbar = () => {
  const { data: profile, isFetching } = useProfile();
  const role = profile?.data?.isMentor
    ? "Mentor"
    : profile?.data?.role || "unknown";

  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <nav className="bg-white shadow-sm px-4 py-2 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-[1920px] mx-auto">
          <div className="flex items-center justify-end gap-4 w-full">
            <div className="badge badge-outline badge-info min-h-7 min-w-10">
              <Poppins className="text-xs">{role}</Poppins>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Poppins className="text-xs">
                  {profile?.data?.name || "unknown"}
                </Poppins>
                <div className="rounded-full border border-solid border-gray-500">
                  <img
                    src={
                      !profile?.data?.photo || isFetching
                        ? DefaultImage
                        : profile?.data?.photo
                    }
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = DefaultImage)
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                </div>
              </div>
              <div
                className="border border-solid border-red-500 h-8 flex items-center gap-2 rounded-md bg-red-700 hover:bg-red-500 duration-300 px-1 pr-2 cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              >
                <CiLogout className="text-white" />
                <Poppins className="text-xs text-white">Logout</Poppins>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <LogoutConfirmation onHide={() => setShow((prev) => !prev)} show={show} />
    </>
  );
};
