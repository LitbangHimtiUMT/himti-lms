import React from "react";
import { ClassLevel, StatusClassess } from "../../../../../core/model/classes";
import { Badge, BadgeVariant } from "../../../../_global/components/Badge";
import { Poppins } from "../../../../_global/components/Text";
import { formatRupiah } from "../../../../_global/helper";
import { Skeleton } from "../../../../_global/components/Shimer";

interface CardDetailClassProps {
  createdBy: string;
  thumbnail: string;
  price: number;
  name: string;
  category: string;
  level: ClassLevel;
  totalParticipant: number;
  status: StatusClassess;
  isFetching?: boolean;
}

export const CardDetailClass: React.FC<CardDetailClassProps> = ({
  createdBy,
  thumbnail,
  price,
  category,
  level,
  totalParticipant,
  status,
  isFetching,
  name
}) => {
  const levelMappingVariant: Record<ClassLevel, BadgeVariant> = {
    BEGINNER: "default",
    INTERMEDIATE: "warning",
    EXPERT: "success",
  };

  const statusColor: Record<StatusClassess, BadgeVariant> = {
    PUBLISH: "success",
    DRAFT: "outline",
  };

  if (isFetching) {
    return (
      <div className="w-full">
        <Skeleton width="100%" height="12rem" />
      </div>
    );
  }

  return (
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
          <Badge size="sm" variant={statusColor[status]}>
            {status}
          </Badge>
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
  );
};
