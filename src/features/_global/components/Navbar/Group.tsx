import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Menus } from "../../config";
import { Poppins } from "../Text";
import { Input } from "../Input";
import { BiSearch } from "react-icons/bi";
import { convertQueryParamsToObject } from "../../helper";
import { useCallback, useEffect } from "react";

export const Group = () => {
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
  return (
    <>
      <div className="flex items-center gap-10">
        <div className="w-64">
          <Input
            placeholder="Apa yang ingin dipelajari?"
            LeftIcon={<BiSearch className="text-blue-gray-400 text-lg" />}
            inputSize="sm"
            rounded="md"
            onChange={onChange}
          />
        </div>
        <div className="flex items-center gap-10">
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
