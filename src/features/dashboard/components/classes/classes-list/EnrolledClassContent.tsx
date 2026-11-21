import { CiSearch } from "react-icons/ci";
import { EmptyState } from "../../../../_global/components/Empty";
import { Input } from "../../../../_global/components/Input";
import { Pagination } from "../../../../_global/components/Pagination";
import { QueryErrorState } from "../../../../_global/components/QueryErrorState";
import { Skeleton } from "../../../../_global/components/Shimer";
import { useSearchParamsInput } from "../../../../_global/hooks/useSearchParamsInput";
import { useClasses } from "../../../../class/hooks/useClasses";
import { CardEnrolledClass } from "./Card/CardEnrolledClass";
import { DropdownRevamp } from "../../../../_global/components/Dropdown/DropdownRevamp";
import { useState } from "react";
import { useCategories } from "../../../../categories/hooks/useCategories";
import { Button } from "../../../../_global/components/Button";

export const EnrolledClassContent = () => {
  const { data: classes, isLoading, isFetching, isError, refetch } =
    useClasses({
      path: "user",
    });

  // Skeleton only before the first load: paging/search refetches keep
  // the cached cards on screen instead of swapping in skeletons.
  const isLoadingClasses =
    isLoading || (isFetching && !classes?.data);

  const { handleInputChange: handleSearch, value: search } =
    useSearchParamsInput("search");
  const {
    value: categoryId,
    queries,
    setSearchParams,
  } = useSearchParamsInput("categoryId");

  const handleChangePage = (page: number) =>
    setSearchParams({ ...queries, page: String(page) });

  const [enabled, setEnabled] = useState(false);

  const { data: categories, isFetching: isFetchingCategories } = useCategories({
    enabled,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white hidden md:block">
          My Learning Journey
        </h2>

        <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
          {/* Filter dropdown */}
          {(categoryId || search) && (
            <div className="w-full md:w-64" onClick={() => setEnabled(true)}>
              <Button
                variant="danger"
                size="lg"
                onClick={() => setSearchParams({})}
              >
                RESET
              </Button>
            </div>
          )}
          <div className="w-full md:w-64" onClick={() => setEnabled(true)}>
            <DropdownRevamp
              reset={!categoryId && !search}
              withShadow
              placeholder="Filter by category"
              list={
                isFetchingCategories
                  ? [{ label: "Loading...", value: "", disabled: true }]
                  : (categories?.data ?? [])?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
              }
              onChange={(e) =>
                // A new filter starts at page 1: keeping a stale ?page=
                // could land on an empty page of the filtered list.
                setSearchParams({
                  ...queries,
                  categoryId: e.value,
                  page: "1",
                })
              }
            />
          </div>
          {/* Search input */}
          <div className="w-full md:w-64">
            <Input
              LeftIcon={<CiSearch className="text-lg text-gray-400" />}
              placeholder="Search classes..."
              onChange={handleSearch}
              className="bg-white dark:bg-gray-800 w-full"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoadingClasses ? (
          // Loading skeleton: 10 cards like the page size, same
          // rows as CardEnrolledClass — thumb 160px, title 28px +
          // badge 22px, price 24px, category badge + sessions,
          // progress label + bar 8px, 2 hint lines, review prompt
          // 36px, buttons sm 26px (24px + secondary border).
          // The hint + prompt are the common full variant, so a
          // plain card overshoots ~90px the other way.
          Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <Skeleton height="10rem" width="100%" borderRadius="0" />
              <div className="p-4">
                <div className="flex flex-col mb-3">
                  <Skeleton height="1.75rem" width="80%" />
                  <div className="flex w-max gap-1.5">
                    <Skeleton
                      height="1.375rem"
                      width="5rem"
                      borderRadius="9999px"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton height="1.5rem" width="40%" />
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Skeleton
                    height="1.375rem"
                    width="5rem"
                    borderRadius="9999px"
                  />
                  <Skeleton height="1.25rem" width="6rem" />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <Skeleton height="1.25rem" width="4rem" />
                    <Skeleton height="1.25rem" width="2rem" />
                  </div>
                  <Skeleton
                    height="0.5rem"
                    width="100%"
                    borderRadius="9999px"
                  />
                  <div className="mt-1.5">
                    <Skeleton height="1rem" width="90%" />
                  </div>
                  <div className="mt-0.5">
                    <Skeleton height="1rem" width="60%" />
                  </div>
                </div>
                <div className="mb-4">
                  <Skeleton height="2.25rem" width="100%" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Skeleton height="26px" width="100%" />
                  </div>
                  <div className="flex-1">
                    <Skeleton height="26px" width="100%" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : isError && !classes?.data ? (
          // Failed to load: not the same as not enrolled
          <div className="col-span-full">
            <QueryErrorState
              customMinHeight={400}
              description={[
                "Failed to load your classes.",
                "Please check your connection and try again.",
              ]}
              onRetry={refetch}
            />
          </div>
        ) : classes?.data?.length ? (
          // Actual cards
          classes.data.map((item, index) => (
            <>
              <CardEnrolledClass key={index} {...item} />
            </>
          ))
        ) : (
          // Empty state
          <div className="col-span-full">
            <EmptyState
              variant="error"
              customMinHeight={400}
              description={
                search
                  ? ["No results found", "Change your search query"]
                  : [
                      "You haven't enrolled in any classes yet",
                      "Explore available classes to start learning",
                    ]
              }
            />
          </div>
        )}
      </div>
      <Pagination
        totalPages={classes?.meta?.totalPages || 1}
        currentPage={classes?.meta?.page || 1}
        onPageChange={handleChangePage}
      />
    </div>
  );
};
