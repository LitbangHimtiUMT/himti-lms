import DefaultImage from "@core/assets/default-photo.svg";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { Poppins } from "../../../_global/components/Text";
import { useProfile } from "../../../profile/useProfile";
import { LogoutConfirmation } from "./LogoutConfirmation";
import { Skeleton } from "../../../_global/components/Shimer";
import { Badge } from "../../../_global/components/Badge";

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
            {isFetching ? (
              <>
                <Skeleton width="4rem" height="1rem" />
              </>
            ) : (
              <Badge variant="primary" rounded="full" size="sm">
                {role}
              </Badge>
            )}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                {isFetching ? (
                  <>
                    <Skeleton width="8rem" height="0.8rem" />
                    <Skeleton width="2rem" height="2rem" borderRadius="100%" />
                  </>
                ) : (
                  <>
                    <Poppins className="text-xs max-w-[140px] truncate overflow-hidden whitespace-nowrap">
                      {profile?.data?.name || "unknown"}
                    </Poppins>
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
                  </>
                )}
              </div>
              {isFetching ? (
                <>
                  <Skeleton height="1.8rem" width="5rem" />
                </>
              ) : (
                <div
                  className="border border-solid border-red-500 h-8 flex items-center gap-2 rounded-md bg-red-700 hover:bg-red-500 duration-300 px-1 pr-2 cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                >
                  <CiLogout className="text-white" />
                  <Poppins className="text-xs text-white md:block hidden">Logout</Poppins>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <LogoutConfirmation onHide={() => setShow((prev) => !prev)} show={show} />
    </>
  );
};
