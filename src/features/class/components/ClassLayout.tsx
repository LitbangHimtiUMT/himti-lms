import React from "react";
import { ClassCard } from "./ClassCard";
import { useClasses } from "../hooks/useClasses";
import { Pagination } from "@features/_global/components/Pagination";
import { QueryErrorState } from "@features/_global/components/QueryErrorState";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import DefaultImage from "@core/assets/default-photo.svg";
import { Poppins } from "../../_global/components/Text";
import { Skeleton } from "../../_global/components/Shimer";

const ClassLayout: React.FC = () => {
  const { data: classes, isLoading, isFetching, isError, refetch } =
    useClasses();

  // Skeleton only before the first load: paging/search/filter refetches
  // keep the cached cards on screen instead of swapping in skeletons.
  const isLoadingClasses =
    isLoading || (isFetching && !classes?.data);

  // A failed refetch keeps stale data: only treat it as an error
  // when there is nothing to show at all.
  const isLoadError = isError && !classes?.data;

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
        <div className={`${classes?.data?.length || isLoadingClasses ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center" : 'flex justify-center'}`}>
          {isLoadingClasses && (
            <>
              {/* Same shell and rows as ClassCard below: thumb
                  aspect-[330/223] (~238px), category 16px, title
                  28px, price 28px, details row 16px, footer
                  (avatar 32px + "Lihat Detail" 28px) — ~470px. */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 w-full max-w-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4">
                      <Skeleton
                        width="100%"
                        height="auto"
                        aspectRatio="330 / 223"
                        borderRadius="0.75rem"
                      />
                    </div>
                    <div className="px-1">
                      <Skeleton width="40%" height="1rem" className="mb-1" />
                      <Skeleton width="75%" height="1.75rem" />
                      <Skeleton
                        width="35%"
                        height="1.75rem"
                        className="mt-2"
                      />
                      <div className="flex items-center gap-6 mt-3">
                        <Skeleton width="4rem" height="1rem" />
                        <Skeleton width="5rem" height="1rem" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton
                        width="2rem"
                        height="2rem"
                        borderRadius="9999px"
                        className="shrink-0"
                      />
                      <Skeleton width="6rem" height="1rem" />
                    </div>
                    <Skeleton width="6.5rem" height="1.75rem" />
                  </div>
                </div>
              ))}
            </>
          )}
          {!isLoadingClasses && isLoadError && (
            <div className="w-full">
              <QueryErrorState
                description={[
                  "Gagal Memuat Kelas",
                  "Periksa koneksi Anda lalu coba lagi.",
                ]}
                retryLabel="Coba Lagi"
                onRetry={refetch}
              />
            </div>
          )}
          {!isLoadingClasses && !isLoadError && !classes?.data?.length && (
            <div className="text-center w-full py-16 flex flex-col items-center justify-center gap-2">
              <Poppins className="text-lg text-slate-700 font-semibold">Tidak Ada Kelas Ditemukan</Poppins>
              <Poppins className="text-sm text-slate-400">Coba cari dengan kata kunci lain atau hubungi admin.</Poppins>
            </div>
          )}
          {!isLoadingClasses && classes?.data &&
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
