import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../../_global/components/Badge";
import { Button } from "../../../../_global/components/Button";
import { EmptyState } from "../../../../_global/components/Empty";
import { Input } from "../../../../_global/components/Input";
import { Skeleton } from "../../../../_global/components/Shimer";
import {
  Table,
  TableBody,
  TableHead,
} from "../../../../_global/components/Table";
import { formatRupiah } from "../../../../_global/helper";
import { useSearchParamsInput } from "../../../../_global/hooks/useSearchParamsInput";
import { useClasses } from "../../../../class/hooks/useClasses";
import { useProfile } from "../../../../profile/useProfile";
import { useGenerateCertificate } from "../../../hooks/certificates/useCertificates";

export const TableEnrolledClassessList = () => {
  const navigate = useNavigate();
  const { data: classess, isFetching } = useClasses({
    path: "user",
  });
  const { data: profile } = useProfile();
  const isMentor = profile?.data?.isMentor;

  const { handleInputChange } = useSearchParamsInput("search");
  const mutation = useGenerateCertificate();

  const handleGenerate = async (classId: string) =>
    await mutation.mutateAsync({
      classId,
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white hidden md:block">
          My Learning Journey
        </h2>
        <div className="w-full md:w-1/2 lg:w-1/3 min-w-[250px]">
          <Input
            LeftIcon={<CiSearch className="text-lg text-gray-400" />}
            placeholder="Search classes..."
            onChange={handleInputChange}
            className="bg-white dark:bg-gray-800 w-full"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHead
            field={[
              "Class Name",
              "Price",
              "Category",
              "Sessions",
              "Status",
              "Progress",
              "",
            ]}
            // className="bg-gray-50 dark:bg-gray-800"
          />
          <TableBody>
            {isFetching ? (
              <tr>
                <td colSpan={7}>
                  <div className="p-4 space-y-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Skeleton key={idx} width="100%" height="48px" />
                    ))}
                  </div>
                </td>
              </tr>
            ) : classess?.data?.length ? (
              classess.data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-700 dark:text-gray-300">
                      {formatRupiah(item.price)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className="capitalize">
                      {item.category.name}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-700 dark:text-gray-300 text-center">
                      {item.totalSession}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge
                      size="sm"
                      variant={
                        item.progressStatus === "In Progress"
                          ? "warning"
                          : "success"
                      }
                    >
                      {item.progressStatus}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-center text-gray-700 dark:text-gray-300 min-w-[40px]">
                      {item.total.precentage}%
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-max flex items-center">
                        <Button
                          tooltip="Detail Class"
                          size="md"
                          variant="secondary"
                          onClick={() => navigate(`/learning/${item.id}`)}
                        >
                          <IoDocumentOutline className="text-gray-600 dark:text-gray-300" />
                        </Button>
                      </div>

                      {item.certificate &&
                      item.progressStatus === "Completed" ? (
                        <div className="w-max">
                          <Button
                            size="md"
                            variant="disabled"
                            tooltip="View Certificate"
                          >
                            <FaEye className="text-white" />
                          </Button>
                        </div>
                      ) : item.progressStatus === "Completed" &&
                        !item.certificate &&
                        !isMentor ? (
                        <Button
                          tooltip="Claim Certificate"
                          size="md"
                          onClick={() => handleGenerate(item.id)}
                        >
                            Claim
                        </Button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <EmptyState
                    variant="table"
                    customMinHeight={400}
                    description={[
                      "You haven't enrolled in any classes yet",
                      "Explore available classes to start learning",
                    ]}
                  />
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
