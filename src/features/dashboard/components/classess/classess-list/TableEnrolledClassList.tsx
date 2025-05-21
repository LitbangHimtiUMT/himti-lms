import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../_global/components/Button";
import { EmptyState } from "../../../../_global/components/Empty";
import { Input } from "../../../../_global/components/Input";
import { Skeleton } from "../../../../_global/components/Shimer";
import {
  Table,
  TableBody,
  TableHead,
} from "../../../../_global/components/Table";
import { Poppins } from "../../../../_global/components/Text";
import { formatRupiah } from "../../../../_global/helper";
import { useSearchParamsInput } from "../../../../_global/hooks/useSearchParamsInput";
import { useClasses } from "../../../../class/hooks/useClasses";
import { useGenerateCertificate } from "../../../hooks/certificates/useCertificates";

export const TableEnrolledClassessList = () => {
  const navigate = useNavigate();
  const { data: classess, isFetching } = useClasses({
    path: "user",
  });

  const { handleInputChange } = useSearchParamsInput("search");
  const mutation = useGenerateCertificate();

  const handleGenerate = async (classId: string) =>
    await mutation.mutateAsync({
      classId,
    });

  return (
    <div className="flex flex-col gap-2">
      <div className="w-1/3">
        <Input
          LeftIcon={<CiSearch className="text-lg" />}
          placeholder="Search Class..."
          onChange={handleInputChange}
        />
      </div>
      <Table>
        <TableHead
          field={["Class Name", "Price", "Category", "Progress", ""]}
        />
        <TableBody>
          {classess?.data?.length && !isFetching ? (
            (classess?.data ?? [])?.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index !== (classess?.data?.length as number) - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <td className="py-4 px-6 text-gray-900">{item.name}</td>
                <td className="py-4 px-6 text-gray-900">{`${formatRupiah(
                  item.price
                )}`}</td>
                <td className="py-4 px-6 text-gray-900">{`${item.category.name}`}</td>
                <td className="py-4 px-6 text-gray-900">{`${item.total.precentage}%`}</td>
                <td>
                  <div className="w-full flex justify-end gap-2 px-2">
                    <div className="w-10">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate(`/dashboard/class/${item.id}?from=enrolled`)
                        }
                      >
                        <IoDocumentOutline />
                      </Button>
                    </div>
                    {item.certificate && item.progressStatus === "Completed" ? (
                      <>
                        <div className="w-10">
                          <Button
                            variant="secondary"
                            // onClick={() =>
                            //   navigate(`/dashboard/class/${item.id}?from=enrolled`)
                            // }
                          >
                            <FaEye />
                          </Button>
                        </div>
                      </>
                    ) : item.progressStatus === "Completed" &&
                      !item.certificate ? (
                      <div>
                        <Button
                          variant="primary"
                          onClick={() => handleGenerate(item.id)}
                        >
                          <Poppins>Generate Certificate</Poppins>
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))
          ) : !classess?.data?.length && !isFetching ? (
            <EmptyState
              customMinHeight={400}
              colspan={5}
              description={["Class not found"]}
            />
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td colSpan={4} className="py-4 px-6 text-gray-900">
                  <Skeleton width="100%" height="40px" />
                </td>
              </tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
