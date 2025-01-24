import { Link, useLocation } from "react-router-dom";
import { Menus } from "../../config";
import { Poppins } from "../Text";

export const Group = () => {
  const location = useLocation();
  return (
    <div className="flex items-center gap-10">
      {Menus.map((item, index) => (
        <Link to={item.to} key={index}>
          <Poppins
            className={`text-white ${
              location.pathname === item.to
                ? "font-semibold text-md"
                : "text-sm"
            } duration-300`}
          >
            {item.name}
          </Poppins>
        </Link>
      ))}
    </div>
  );
};
