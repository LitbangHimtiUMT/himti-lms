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
        // Same rows as FormCreateModules below: 2 half-width inputs
        // (label 20px + input md 40px), file row (label + native
        // input ~24px), content row (label + editor ~250px: toolbar
        // + 200px editing area), submit button lg 36px.
        <div className="flex flex-col gap-4">
          <div className="lg:w-1/2 w-full flex flex-col gap-2">
            <Skeleton width="7rem" height="1.25rem" />
            <Skeleton width="100%" height="2.5rem" />
          </div>
          <div className="lg:w-1/2 w-full flex flex-col gap-2">
            <Skeleton width="7rem" height="1.25rem" />
            <Skeleton width="100%" height="2.5rem" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton width="3rem" height="1.25rem" />
            <Skeleton width="100%" height="1.5rem" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton width="5rem" height="1.25rem" />
            <Skeleton width="100%" height="250px" />
          </div>
          <Skeleton width="100%" height="2.25rem" />
        </div>
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
