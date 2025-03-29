import React from "react";
import { useSearchParams } from "react-router-dom";
import { ClassModel } from "../../../core/model/classes";
import { Poppins } from "../../_global/components/Text";
import { convertQueryParamsToObject } from "../../_global/helper";

export const ClassCard: React.FC<ClassModel & { border: boolean }> = ({
  border,
  name,
  progressStatus,
  total,
  id,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const objectSearchParams = convertQueryParamsToObject(
    searchParams.toString()
  );
  const changeClass = (classId: string) =>
    setSearchParams({ ...objectSearchParams, classId });

  const classId = searchParams.get("classId") || undefined;
  return (
    <div>
      <div className={`mb-4 ${border ? "" : "mb-6"}`}>
        <div>
          <div
            className={`flex justify-between items-center mb-2 cursor-pointer rounded-lg hover:bg-blue-gray-100 px-2 py-2 ${
              classId === id ? "bg-blue-gray-100" : ""
            }`}
            onClick={() => changeClass(id)}
          >
            <span className="font-medium text-gray-900">{name}</span>
            <span
              className={`${
                progressStatus === "Completed"
                  ? "text-[#2B4B7C]"
                  : "text-orange-500"
              } text-sm font-medium`}
            >
              <Poppins className="text-black">
                {progressStatus === "Completed"
                  ? progressStatus
                  : `${Number(total.precentage)}% Progress`}
              </Poppins>
            </span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                progressStatus === "Completed"
                  ? "bg-[#2B4B7C]"
                  : "bg-orange-500"
              }`}
              style={{ width: `${total.precentage}%` }}
            />
          </div>
        </div>
        {/* <button
          className="flex items-center justify-between w-full px-2 mt-2 text-left text-gray-700"
          onClick={() => setShow(!show)}
        >
          <span className="font-medium">Sessions</span>
          {show ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />}
        </button> */}
        {/* {show && (
          <div className="px-2 mt-2 flex flex-col gap-2">
            {sessions.map((item, index) => (
              <div
                key={index}
                className="border p-2 rounded-md bg-gray-100 cursor-pointer"
                // onClick={() => changeSession(item.id)}
              >
                {item.name}
              </div>
            ))} */}
      </div>
      {/* )} */}
      {/* </div> */}
    </div>
  );
};
