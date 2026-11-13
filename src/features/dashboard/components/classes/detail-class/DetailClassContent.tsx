import { useDetailClass } from "../../../../class/hooks/useClasses";
import { SessionTable } from "../../SessionTable";
import { CardDetailClass } from "./CardDetailClass";
import { HeaderDetailClass } from "./HeaderDetailClass";

export const DetailClassContent = () => {
  const { data: classes, isFetching } = useDetailClass();
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <HeaderDetailClass />
          <CardDetailClass
            id={classes?.data?.id || ""}
            name={classes?.data?.name || ""}
            category={classes?.data?.category?.name || ""}
            createdBy={classes?.data?.creator?.name || ""}
            level={classes?.data?.level || "BEGINNER"}
            price={classes?.data?.price || 0}
            status={classes?.data?.status || "PUBLISH"}
            thumbnail={classes?.data?.thumbnail || ""}
            totalParticipant={classes?.data?.totalParticipant || 0}
            isFetching={isFetching}
          />
        </div>
        <SessionTable />
      </div>
    </>
  );
};
