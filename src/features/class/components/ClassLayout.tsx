import React from "react";
import { ClassCard } from "./ClassCard";
import { useClasses } from "../hooks/useClasses";
import { Pagination } from "@features/_global/components/Pagination";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import DefaultImage from "@core/assets/default-photo.svg";
import { Poppins } from "../../_global/components/Text";

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
      <div className="py-10">
        <div className={`${classes?.data?.length || isFetching ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center" : 'flex justify-center'}`}>
          {isFetching && (
            <>
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 w-full h-[420px] flex flex-col gap-4 animate-pulse">
                <div className="w-full h-48 bg-slate-200/60 rounded-xl" />
                <div className="h-6 bg-slate-200/60 rounded w-3/4" />
                <div className="h-4 bg-slate-200/60 rounded w-1/2" />
                <div className="h-10 bg-slate-200/60 rounded-xl mt-auto" />
              </div>
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 w-full h-[420px] flex flex-col gap-4 animate-pulse">
                <div className="w-full h-48 bg-slate-200/60 rounded-xl" />
                <div className="h-6 bg-slate-200/60 rounded w-3/4" />
                <div className="h-4 bg-slate-200/60 rounded w-1/2" />
                <div className="h-10 bg-slate-200/60 rounded-xl mt-auto" />
              </div>
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 w-full h-[420px] flex flex-col gap-4 animate-pulse">
                <div className="w-full h-48 bg-slate-200/60 rounded-xl" />
                <div className="h-6 bg-slate-200/60 rounded w-3/4" />
                <div className="h-4 bg-slate-200/60 rounded w-1/2" />
                <div className="h-10 bg-slate-200/60 rounded-xl mt-auto" />
              </div>
            </>
          )}
          {!isFetching && !classes?.data?.length && (
            <div className="text-center w-full py-16 flex flex-col items-center justify-center gap-2">
              <Poppins className="text-lg text-slate-700 font-semibold">Tidak Ada Kelas Ditemukan</Poppins>
              <Poppins className="text-sm text-slate-400">Coba cari dengan kata kunci lain atau hubungi admin.</Poppins>
            </div>
          )}
          {!isFetching && classes?.data &&
            classes.data.map((course, index) => (
              <ClassCard
                key={index}
                course={{
                  ...course,
                  creator: {
                    ...course.creator,
                    photo:
                      !course.creator?.photo
                        ? DefaultImage
                        : course.creator?.photo,
                  },
                }}
              />
            ))}
        </div>
      </div>
      <div className="w-full flex justify-center mt-6">
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
