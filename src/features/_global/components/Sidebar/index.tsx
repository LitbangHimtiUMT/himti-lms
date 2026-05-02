import HIMTI from "@core/assets/logo/HIMTI.png";
import { SidebarGroup } from "./SidebarGroup";

export const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white shadow-[0_1px_10px_rgba(0,0,0,0.05)] ">
      <div className="px-6 pt-8 pb-6 flex-col gap-4">
        <img src={HIMTI} width={100} />
        <SidebarGroup />
      </div>
    </div>
  );
};
