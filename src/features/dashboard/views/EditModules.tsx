import { useParams, useSearchParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { QueryErrorState } from "../../_global/components/QueryErrorState";
import { Skeleton } from "../../_global/components/Shimer";
import { FormCreateModules } from "../components/modules/create-modules/FormCreateModules";
import { useDetailModule } from "../hooks/modules/useModules";

export const EditModules = () => {
  const { sessionId, classId, moduleId } = useParams();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const {
    data: modules,
    isFetching,
    refetch,
  } = useDetailModule();

  return (
    <div className="flex flex-col gap-5">
      <BreadCrumb
        items={[
          {
            name: `${
              from === "enrolled" ? "Enrolled Class" : "My Class"
            }`,
            to: `/dashboard${
              from === "enrolled" ? "/enrolled-class" : "/my-class"
            }`,
          },
          {
            name: "Detail Session",
            to: `/dashboard/${classId}/${sessionId}`,
          },
          {
            name: "Edit Modules",
            to: `/dashboard/${classId}/${sessionId}/edit-modules/${moduleId}`,
          },
        ]}
      />
      {isFetching && !modules?.data ? (
        <Skeleton width="100%" height="500px" />
      ) : !modules?.data ? (
        <QueryErrorState
          description={[
            "Failed to load module.",
            "Please check your connection and try again.",
          ]}
          onRetry={refetch}
        />
      ) : (
        <FormCreateModules key={moduleId} data={modules.data} />
      )}
    </div>
  );
};
