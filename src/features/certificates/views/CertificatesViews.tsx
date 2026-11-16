import { Button } from "../../_global/components/Button";
import { FaExternalLinkAlt, FaEye } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { CONFIG_APP } from "../../../core/configs/app";
import { MasterTable } from "../../_global/components/MasterTable";
import { Poppins } from "../../_global/components/Text";
import { convertQueryParamsToObject } from "../../_global/helper";
import { formatTime } from "../../_global/lib/format-time";
import { useCertificates } from "../hooks/useCertificates";

export const CertificatesViews = () => {
  const { data: certificates, isFetching, isError, refetch } =
    useCertificates();
  const [searchParams, setSearchParams] = useSearchParams();
  const queries = convertQueryParamsToObject(searchParams.toString());

  const handleChangePage = (page: string) =>
    setSearchParams({ ...queries, page });
  return (
    <>
      <div className="flex justify-end mb-3">
        <div className="w-max">
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              window.open(
                "https://himtiumt.org/sertifikat",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
              <FaExternalLinkAlt
                size={11}
                className="text-gray-600 dark:text-gray-300"
              />
              <Poppins>Verify a certificate</Poppins>
            </div>
          </Button>
        </div>
      </div>
      <div>
        <MasterTable
          data={certificates?.data}
          withAction={false}
          isLoading={isFetching}
          pagination={{
            totalPages: certificates?.meta?.totalPages || 1,
            currentPage: certificates?.meta?.page || 1,
            onPageChange: (page) => handleChangePage(String(page)),
          }}
          title={["Certificate ID", "Class", "Category", "Issue Date" , '']}
          isError={isError}
          onRetry={refetch}
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
                      "_blank",
                      "noopener,noreferrer"
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
