import { BiKey } from "react-icons/bi";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaCalendar, FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { ItemMenuAdmin } from "../types/MenuTypes";
import { IoMdInformationCircleOutline } from "react-icons/io";

export const CONFIG_MENU_ADMIN: ItemMenuAdmin[] = [
  {
    icon: <FaUser />,
    name: "User",
    to: "/admin/user",
  },
  {
    icon: <FaCalendar />,
    name: "Acara",
    to: "/admin/acara",
  },
  {
    icon: <BsCalendar2EventFill />,
    name: "Event Meeting",
    to: "/admin/event-meeting",
  },
  {
    icon: <FaUserGroup />,
    name: "Angkatan",
    to: "/admin/angkatan",
  },
  {
    icon: <FaUserGroup />,
    name: "Anggota",
    to: "/admin/anggota",
  },
  {
    icon: <FaUserGroup size={12} />,
    name: "Struktural",
    to: "/admin/struktural",
  },
  {
    icon: <GiTeacher size={12} />,
    name: "Dosen",
    to: "/admin/dosen",
  },
  {
    icon: <BiKey size={16} />,
    name: "User Login",
    to: "/admin/user-login",
  },
  {
    icon: <IoMdInformationCircleOutline size={16} />,
    name: "Version",
    to: "/admin/version",
  },
];
