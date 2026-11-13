import React from "react";
import { FaEye } from "react-icons/fa";
import { IoDocumentOutline, IoImageOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClassModel } from "../../../../../../core/model/classes";
import { Badge } from "../../../../../_global/components/Badge";
import { Button } from "../../../../../_global/components/Button";
import { formatRupiah } from "../../../../../_global/helper";
import { useProfile } from "../../../../../profile/useProfile";
import { useGenerateCertificate } from "../../../../hooks/certificates/useCertificates";
import { Poppins } from "../../../../../_global/components/Text";
import { CONFIG_APP } from "../../../../../../core/configs/app";

interface CardEnrolledClassProps extends ClassModel {}

export const CardEnrolledClass: React.FC<CardEnrolledClassProps> = ({
  category,
  name,
  price,
  progressStatus,
  thumbnail,
  certificate,
  id,
  total,
  totalSession,
  creator,
}) => {
  const navigate = useNavigate();
  const mutation = useGenerateCertificate();
  const { data: profile } = useProfile();

  const handleGenerate = async (classId: string) =>
    await mutation.mutateAsync({
      classId,
    });

  const owner = profile?.data?.id === creator.id;
  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
        onClick={() => navigate(`/learning/${id}`)}
      >
        {/* Thumbnail Section */}
        <div className="relative h-40 w-full bg-gray-100 dark:bg-gray-700">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/HIMTI.png";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
              <IoImageOutline className="text-4xl" />
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="flex flex-col mb-3">
            <h3
              className="font-medium text-gray-900 dark:text-white text-lg line-clamp-2"
            >
              {name}
            </h3>
            <div className="w-max">
              <Badge
                size="sm"
                variant={
                  progressStatus === "In Progress" ? "warning" : "success"
                }
              >
                {progressStatus}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {formatRupiah(price)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline" size="sm" className="capitalize">
              {category.name}
            </Badge>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {totalSession} sessions
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{total.precentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full"
                style={{ width: `${total.precentage}%` }}
              ></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center">
            <Button
              size="md"
              variant="secondary"
              onClick={() => navigate(`/learning/${id}`)}
              title="Detail"
            >
              <div className="flex items-center gap-4">
                <IoDocumentOutline className="text-gray-600 dark:text-gray-300" />
                <Poppins>Detail</Poppins>
              </div>
            </Button>

            {certificate && progressStatus === "Completed" ? (
              <Button
                size="sm"
                variant="secondary"
                tooltip="View Certificate"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `${CONFIG_APP.BASE_URL}/lms/certificates/file?code=${certificate.code}`,
                    "_blank"
                  );
                }}
              >
                <FaEye className="text-gray-600 dark:text-gray-300" />
              </Button>
            ) : progressStatus === "Completed" && !certificate && !owner ? (
              <Button
                tooltip="Claim Certificate"
                size="sm"
                variant={mutation.isPending ? "disabled" : "primary"}
                onClick={(e) => {
                  e.stopPropagation(); // menghindari effect onClick pada parent
                  handleGenerate(id);
                }}
              >
                {mutation.isPending ? "Generating..." : "Claim"}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
