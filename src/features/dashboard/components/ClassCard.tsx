import React from "react";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ClassModel } from "../../../core/model/classes";
import { Poppins } from "../../_global/components/Text";
import { OptionClass } from "./sidebar/OptionClass";
import { useProfile } from "../../profile/useProfile";

export const ClassCard: React.FC<ClassModel & { border: boolean }> = ({
  border,
  name,
  progressStatus,
  total,
  id,
  status,
  code,
}) => {
  const { data: profile } = useProfile();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { classId } = useParams();
  const changeClass = (classId: string) =>
    navigate(`/dashboard?classId=${classId}`);

  const classes = searchParams.get("classId") || classId || undefined;
  return (
    <div>
      <div className={`mb-4 ${border ? "" : "mb-6"}`}>
        <div className="flex items-center w-full">
          <OptionClass code={code} />
          <div className="w-full">
            <div
              className={`flex justify-between items-center mb-2 cursor-pointer rounded-lg hover:bg-blue-gray-100 px-2 py-2 w-full`}
              onClick={() => changeClass(id)}
            >
              <div>
                <span className="font-medium text-gray-900 max-w-[75%] text-wrap">{name}</span>
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
                  </div>
                </span>
              </div>
              {classes === id ? (
                <>
                  <div className="bg-red-500 w-[6px] h-[6px] rounded-full"></div>
                </>
              ) : null}
            </div>
            <div className="h-1 bg-gray-400 rounded-full overflow-hidden">
              {total && !profile?.data?.isMentor ? (
                <div
                  className={`h-full rounded-full ${
                    progressStatus === "Completed"
                      ? "bg-[#2B4B7C]"
                      : "bg-orange-500"
                  }`}
                  style={{ width: `${total.precentage}%` }}
                />
              ) : (
                <Poppins className="text-black">{status}</Poppins>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
