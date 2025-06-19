import { CiSearch } from "react-icons/ci";
import { EmptyState } from "../../../../_global/components/Empty";
import { Input } from "../../../../_global/components/Input";
import { Skeleton } from "../../../../_global/components/Shimer";
import { useSearchParamsInput } from "../../../../_global/hooks/useSearchParamsInput";
import { useClasses } from "../../../../class/hooks/useClasses";
import { CardEnrolledClass } from "./Card/CardEnrolledClass";
import { DropdownRevamp } from "../../../../_global/components/Dropdown/DropdownRevamp";
import { useState } from "react";
import { useCategories } from "../../../../categories/hooks/useCategories";
import { Button } from "../../../../_global/components/Button";

export const EnrolledClassContent = () => {
  const { data: classess, isFetching } = useClasses({
    path: "user",
  });

  const { handleInputChange: handleSearch, value: search } =
    useSearchParamsInput("search");
  const {
    value: categoryId,
    queries,
    setSearchParams,
  } = useSearchParamsInput("categoryId");

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
                setSearchParams({ ...queries, categoryId: e.value })
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
        {isFetching ? (
          // Loading skeleton
          Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <Skeleton height="10rem" width="100%" />
              <div className="p-4 flex flex-col gap-3">
                <Skeleton height="1.5rem" width="80%" />
                <Skeleton height="1rem" width="60%" />
                <div className="flex gap-2">
                  <Skeleton height="1.5rem" width="5rem" />
                  <Skeleton height="1.5rem" width="5rem" />
                </div>
                <Skeleton height="0.5rem" width="100%" />
                <div className="flex justify-between mt-2">
                  <Skeleton height="2rem" width="6rem" />
                  <Skeleton height="2rem" width="6rem" />
                </div>
              </div>
            </div>
          ))
        ) : classess?.data?.length ? (
          // Actual cards
          classess.data.map((item, index) => (
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
    </div>
  );
};
