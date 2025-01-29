import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Menus } from "../../config";
import { Poppins } from "../Text";
import { Input } from "../Input";
import { BiSearch } from "react-icons/bi";
import { convertQueryParamsToObject } from "../../helper";
import { useCallback, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { AuthSection } from "./AuthSection";

export const Group = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const queries = convertQueryParamsToObject(searchParams.toString());
  const querySearch = searchParams.get("qs");

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams({
        ...queries,
        qs: e.target.value,
      });
    },
    [queries, setSearchParams]
  );

  useEffect(() => {
    if (!querySearch) {
      const { qs, ...rest } = queries;
      qs?.toString();
      setSearchParams({
        ...rest,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querySearch]);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-between w-full mx-5">
        <div className="w-64">
          <Input
            placeholder="Apa yang ingin dipelajari?"
            LeftIcon={<BiSearch className="text-blue-gray-400 text-lg" />}
            inputSize="sm"
            rounded="md"
            onChange={onChange}
          />
        </div>
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>
        <GroupResponsive isOpen={isOpen} />
        <div className="flex items-center gap-10 lg-max:hidden">
          {Menus.map((item, index) => (
            <Link to={item.to} key={index}>
              <Poppins
                className={`text-black ${
                  location.pathname === item.to
                    ? "font-semibold text-lg"
                    : "text-md"
                } duration-300`}
              >
                {item.name}
              </Poppins>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const GroupResponsive = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`lg:hidden flex flex-col duration-300 items-center gap-10 absolute left-10 rounded-3xl mt-5 right-10 py-10 bg-white ${
        isOpen ? "top-[100%]" : "top-[-1000px] z-[-1]"
      }`}
    >
      {Menus.map((item, index) => (
        <Link to={item.to} key={index}>
          <span
            className={`text-black hover:text-gray-600 ${
              location.pathname === item.to
                ? "font-semibold text-lg"
                : "text-md"
            } duration-300`}
          >
            {item.name}
          </span>
        </Link>
      ))}
      <AuthSection />
    </div>
  );
};
