import { Link, useLocation } from "react-router-dom";
import { Menus } from "../../config";
import { AuthSection } from "./AuthSection";

export const Group = () => {
  const location = useLocation();

  return (
    <nav className="hidden h-full items-center gap-1 lg:flex">
      {Menus.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            to={item.to}
            key={item.to}
            className={`flex h-full items-center border-b-2 px-3 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "border-[#3966bf] font-semibold text-slate-900"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export const GroupResponsive = ({
  isOpen,
  onNavigate,
}: {
  isOpen: boolean;
  onNavigate: () => void;
}) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="border-b border-slate-200 bg-white px-4 pb-4 pt-2 lg:hidden">
      <nav className="flex flex-col">
        {Menus.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              to={item.to}
              key={item.to}
              onClick={onNavigate}
              className={`rounded-xl px-3 py-3 text-[15px] font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-[#eef3fc] font-semibold text-[#3966bf]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-3">
        <AuthSection direction="column" />
      </div>
    </div>
  );
};
