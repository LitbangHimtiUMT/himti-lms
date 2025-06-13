import { useParams, useSearchParams } from "react-router-dom";
import { BreadCrumb } from "../../_global/components/BreadCrumb";
import { DetailClassContent } from "../components/classess/detail-class/DetailClassContent";

export const SessionViews = () => {
  const { classId } = useParams();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <BreadCrumb
            items={[
              {
                name: `${from === "enrolled" ? "Enrolled Class" : "My Class"}`,
                to: `/dashboard/${
                  from === "enrolled" ? "enrolled-class" : "my-class"
                }`,
              },
              {
                name: "Sessions",
                to: `/dashboard/my-class/${classId}`,
              },
            ]}
          />
        </div>
        <DetailClassContent />
      </div>
    </>
  );
};
