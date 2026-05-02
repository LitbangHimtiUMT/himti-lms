import { useDetailClass } from "../../../../class/hooks/useClasses";
import { SessionTable } from "../../SessionTable";
import { CardDetailClass } from "./CardDetailClass";
import { HeaderDetailClass } from "./HeaderDetailClass";

export const DetailClassContent = () => {
  const { data: classess, isFetching } = useDetailClass();
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <HeaderDetailClass />
          <CardDetailClass
            id={classess?.data?.id || ""}
            name={classess?.data?.name || ""}
            category={classess?.data?.category?.name || ""}
            createdBy={classess?.data?.creator?.name || ""}
            level={classess?.data?.level || "BEGINNER"}
            price={classess?.data?.price || 0}
            status={classess?.data?.status || "PUBLISH"}
            thumbnail={classess?.data?.thumbnail || ""}
            totalParticipant={classess?.data?.totalParticipant || 0}
            isFetching={isFetching}
          />
        </div>
        <SessionTable />
      </div>
    </>
  );
};
