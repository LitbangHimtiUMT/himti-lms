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
  status
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
            className={`flex justify-between items-center mb-2 cursor-pointer rounded-lg hover:bg-blue-gray-100 px-2 py-2`}
            onClick={() => changeClass(id)}
          >
            <span className="font-medium text-gray-900">{name}</span>
            <span
              className={`${
                progressStatus === "Completed"
                  ? "text-[#274b81]"
                  : "text-orange-500"
              } text-sm font-medium`}
            >
              <div className="flex items-center gap-1">
                {progressStatus && total ? (
                  <Poppins className="text-black">
                    {progressStatus === "Completed"
                      ? progressStatus
                      : `${Number(total.precentage)}% Progress`}
                  </Poppins>
                ) : null}
                {classId === id ? (
                  <>
                    <div className="bg-red-500 w-[6px] h-[6px] rounded-full"></div>
                  </>
                ) : null}
              </div>
            </span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            {total ? (
              <div
                className={`h-full rounded-full ${
                  progressStatus === "Completed"
                    ? "bg-[#2B4B7C]"
                    : "bg-orange-500"
                }`}
                style={{ width: `${total.precentage}%` }}
              />
            ) : (
              <Poppins className="text-black">
               {status}
              </Poppins>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
