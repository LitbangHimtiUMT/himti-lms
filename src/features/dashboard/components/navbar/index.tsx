import DefaultImage from "@core/assets/default-photo.svg";
import { IoNotificationsOutline } from "react-icons/io5";
import { Poppins } from "../../../_global/components/Text";
import { useProfile } from "../../../profile/useProfile";

export const DashboardNavbar = () => {
  const { data: profile, isFetching } = useProfile();
  return (
    <nav className="bg-white shadow-sm px-4 py-2 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-[1920px] mx-auto">
        <div className="flex items-center flex-1 lg:ml-0">
          {/* <div className="relative flex items-center w-full max-w-md">
            <input
              type="text"
              placeholder="Pencarian"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <IoSearchOutline className="absolute left-3 text-gray-400 w-5 h-5" />
          </div> */}
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <IoNotificationsOutline className="text-gray-500 w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2">
            <Poppins className="text-xs">
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
          </div>
        </div>
      </div>
    </nav>
  );
};
