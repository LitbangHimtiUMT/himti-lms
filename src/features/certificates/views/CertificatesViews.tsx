import { MasterTable } from "../../_global/components/MasterTable";
import { Poppins } from "../../_global/components/Text";
import { formatTime } from "../../_global/lib/format-time";
import { useCertificates } from "../hooks/useCertificates";

export const CertificatesViews = () => {
  const { data: certificates, isFetching } = useCertificates();
  return (
    <>
      <div>
        <MasterTable
          data={certificates?.data}
          withAction={false}
          isLoading={isFetching}
          title={["Certificate ID", "Class", "Category", "Issue Date" , '']}
          columnTable={[
            {
              return: ({ code }) => (
                <Poppins className="text-sm font-medium">{code}</Poppins>
              ),
            },
            {
              return: ({ class: classess }) => (
                <Poppins className="text-sm font-medium">
                  {classess.name}
                </Poppins>
              ),
            },
            {
              return: ({ class: classess }) => (
                <Poppins className="text-sm font-medium">
                  {classess.category.name}
                </Poppins>
              ),
            },
            {
              return: ({ createdAt }) => (
                <Poppins className="text-sm font-medium">
                  {formatTime(createdAt, false)}
                </Poppins>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};
