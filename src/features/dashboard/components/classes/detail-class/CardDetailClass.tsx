import React from "react";
import { ClassLevel, StatusClasses } from "../../../../../core/model/classes";
import { Badge, BadgeVariant } from "../../../../_global/components/Badge";
import { Skeleton } from "../../../../_global/components/Shimer";
import { Poppins } from "../../../../_global/components/Text";
import { formatRupiah } from "../../../../_global/helper";

interface CardDetailClassProps {
  createdBy: string;
  thumbnail: string;
  price: number;
  name: string;
  category: string;
  level: ClassLevel;
  totalParticipant: number;
  // Optional on purpose: a missing status renders no badge instead of
  // a default that would hide a data problem.
  status?: StatusClasses;
  completedAt?: string | null;
  isLoading?: boolean;
  id: string;
}

export const CardDetailClass: React.FC<CardDetailClassProps> = ({
  createdBy,
  thumbnail,
  price,
  category,
  level,
  totalParticipant,
  status,
  completedAt,
  isLoading,
  name,
}) => {

  const levelMappingVariant: Record<ClassLevel, BadgeVariant> = {
    BEGINNER: "default",
    INTERMEDIATE: "warning",
    EXPERT: "success",
  };

  const statusColor: Record<StatusClasses, BadgeVariant> = {
    PUBLISH: "success",
    DRAFT: "outline",
    ARCHIVED: "warning",
  };

  // Same shell as the real card (bg-white, shadow-md, rounded-2xl,
  // flex-col on mobile, two columns on desktop) with a bar for every
  // row, measured from the JSX below: thumbnail h-48 (mobile) / a
  // third of the width (desktop), title text-lg 28px, created-by
  // text-sm 20px, badges sm 22px, bottom row pt-2 + label 20px +
  // value 24px. Content column ~198px; mobile total ~390px.
  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-48 md:h-auto shrink-0">
          <Skeleton width="100%" height="100%" borderRadius="0" />
        </div>
        <div className="p-5 space-y-3 w-full md:w-2/3">
          <Skeleton width="66%" height="1.75rem" />
          <Skeleton width="12rem" height="1.25rem" />
          <div className="flex flex-wrap gap-2">
            <Skeleton width="4rem" height="1.375rem" borderRadius="9999px" />
            <Skeleton width="5rem" height="1.375rem" borderRadius="9999px" />
            <Skeleton width="4.5rem" height="1.375rem" borderRadius="9999px" />
            <Skeleton width="5.5rem" height="1.375rem" borderRadius="9999px" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div>
              <Skeleton width="6rem" height="1.25rem" />
              <Skeleton width="3rem" height="1.5rem" />
            </div>
            <div className="text-right">
              <Skeleton width="3rem" height="1.25rem" />
              <Skeleton width="5rem" height="1.5rem" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full flex flex-col md:flex-row">
        <img
          src={thumbnail}
          alt="Class Thumbnail"
          className="w-full md:w-1/3 h-48 md:h-auto object-cover"
        />

        <div className="p-5 space-y-3 w-full md:w-2/3">
          <Poppins className="text-lg font-semibold">{name}</Poppins>
          <div className="flex items-center gap-2">
            <Poppins className="text-sm text-gray-500">Created by</Poppins>
            <Poppins className="text-sm font-semibold">{createdBy}</Poppins>
          </div>

          <div className="flex flex-wrap gap-2">
            {status && (
              <Badge size="sm" variant={statusColor[status]}>
                {status}
              </Badge>
            )}
            {completedAt && (
              <Badge size="sm" variant="primary">
                COMPLETED
              </Badge>
            )}
            <Badge size="sm" variant={levelMappingVariant[level]}>
              {level}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800" size="sm">
              {category}
            </Badge>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div>
              <Poppins className="text-sm text-gray-500">
                Total Participant
              </Poppins>
              <Poppins className="text-md font-medium">
                {totalParticipant}
              </Poppins>
            </div>
            <div className="text-right">
              <Poppins className="text-sm text-gray-500">Price</Poppins>
              <Poppins className="text-md font-semibold">
                {price === 0 ? "Free" : formatRupiah(price)}
              </Poppins>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
