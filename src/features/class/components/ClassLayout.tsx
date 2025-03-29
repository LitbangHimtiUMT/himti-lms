import React from "react";
import { ClassCard } from "./ClassCard";
import { useClasses } from "../hooks/useClasses";
import { Pagination } from "@features/_global/components/Pagination";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import DefaultImage from "@core/assets/default-photo.svg";

const ClassLayout: React.FC = () => {
  const { data: classes, isFetching } = useClasses();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  const pagination = {
    currentPage: classes?.meta?.page || 1,
    totalPages: classes?.meta?.totalPages || 1,
    onPageChange,
  };

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {isFetching && (
            <>
              <Skeleton width={"384px"} height={"450px"} />
              <Skeleton width={"384px"} height={"450px"} />
              <Skeleton width={"384px"} height={"450px"} />
            </>
          )}
          {!isFetching && !classes?.data && (
            <div className="text-center">No classes found</div>
          )}
          {classes?.data &&
            classes.data.map((course, index) => (
              <ClassCard
                key={index}
                course={{
                  ...course,
                  creator: {
                    ...course.creator,
                    photo:
                      !course.creator?.photo || isFetching
                        ? DefaultImage
                        : course.creator?.photo,
                  },
                }}
              />
            ))}
        </div>
      </div>
      <div className="w-full flex px-5 justify-center">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page: number) => onPageChange(page)}
        />
      </div>
    </>
  );
};

export default ClassLayout;
