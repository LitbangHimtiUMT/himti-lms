import { Button } from "../../_global/components/Button";
import { FaEye } from "react-icons/fa";
import { CONFIG_APP } from "../../../core/configs/app";
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
              return: ({ class: classes }) => (
                <Poppins className="text-sm font-medium">
                  {classes.name}
                </Poppins>
              ),
            },
            {
              return: ({ class: classes }) => (
                <Poppins className="text-sm font-medium">
                  {classes.category.name}
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
            {
              return: ({ code }) => (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    window.open(
                      `${CONFIG_APP.BASE_URL}/lms/certificates/file?code=${code}`,
                      "_blank"
                    )
                  }
                >
                  <FaEye className="text-gray-600 dark:text-gray-300" />
                </Button>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};
