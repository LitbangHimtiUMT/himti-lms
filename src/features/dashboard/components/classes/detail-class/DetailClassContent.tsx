import { useDetailClass } from "../../../../class/hooks/useClasses";
import { QueryErrorState } from "../../../../_global/components/QueryErrorState";
import { SessionTable } from "../../SessionTable";
import { CardDetailClass } from "./CardDetailClass";
import { HeaderDetailClass } from "./HeaderDetailClass";
import { CompletedClassNotice } from "../ClassContentNotices";

export const DetailClassContent = () => {
  const { data: classes, isLoading, isFetching, isError, refetch } =
    useDetailClass();
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <HeaderDetailClass />
          {classes?.data?.completedAt && <CompletedClassNotice />}
          {isError && !classes?.data ? (
            <QueryErrorState
              description={[
                "Failed to load class details.",
                "Please check your connection and try again.",
              ]}
              onRetry={refetch}
            />
          ) : (
            <CardDetailClass
              id={classes?.data?.id || ""}
              name={classes?.data?.name || ""}
              category={classes?.data?.category?.name || ""}
              createdBy={classes?.data?.creator?.name || ""}
              level={classes?.data?.level || "BEGINNER"}
              price={classes?.data?.price || 0}
              status={classes?.data?.status}
              completedAt={classes?.data?.completedAt}
              thumbnail={classes?.data?.thumbnail || ""}
              totalParticipant={classes?.data?.totalParticipant || 0}
              // Skeleton only before the first load: a background refetch
              // keeps the cached card on screen instead of collapsing it.
              isLoading={isLoading || (isFetching && !classes?.data)}
            />
          )}
        </div>
        <SessionTable />
      </div>
    </>
  );
};
