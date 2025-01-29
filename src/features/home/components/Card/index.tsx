import { ReactNode, useState } from "react";
import { Poppins } from "../../../_global/components/Text";

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({ description, icon, title }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      className={`w-full h-60 duration-300 rounded-lg overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.2)]`}
      style={{
        background: isHover
          ? "linear-gradient(to right, #023A6B, #0471D1)"
          : "#FAF9F6",
        transition: "background 0.6s ease-in-out",
      }}
    >
      <div className="bg-yellow-800 w-full h-4"></div>
      <div className="px-6 py-6 flex flex-col gap-2">
        <div
          className={`${isHover ? "text-white" : "text-black"} duration-200`}
        >
          {icon}
        </div>
        <Poppins
          className={`font-semibold text-lg ${
            isHover ? "text-white" : "text-black"
          } duration-200`}
        >
          {title}
        </Poppins>
        <Poppins
          className={`text-sm ${
            isHover ? "text-white" : "text-black"
          } duration-200`}
          style={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            maxHeight: "100px",
            textOverflow: "ellipsis",
            lineHeight: "leading-relaxed",
            WebkitLineClamp: 4,
          }}
        >
          {description}
        </Poppins>
      </div>
    </div>
  );
};
