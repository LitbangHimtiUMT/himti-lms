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
import { useProfile } from "../../../../profile/useProfile";

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
    <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          My Learning Journey
        </h2>
        <div className="w-full md:w-1/3">
          <Input
            LeftIcon={<CiSearch className="text-lg text-purple-500" />}
            placeholder="Find your class..."
            onChange={handleInputChange}
            className="bg-gray-50 border-0 focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table className="min-w-full">
          <TableHead
            field={[
              "Class Name",
              "Price",
              "Category",
              "Sessions",
              "Progress",
              "Actions",
            ]}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium"
          />
          <TableBody className="divide-y divide-gray-200">
            {classess?.data?.length && !isFetching ? (
              (classess?.data ?? [])?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">
                    <span className="line-clamp-1">{item.name}</span>
                  </td>
                  <td className="py-4 px-6 text-black font-medium">
                    {formatRupiah(item.price)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] block text-center">
                      {item.category.name}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600">
                    {item.totalSession}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full"
                          style={{ width: `${item.total.precentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium min-w-[40px]">
                        {item.total.precentage}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        rounded="lg"
                        onClick={() => navigate(`/learning/${item.id}`)}
                      >
                        <div className="flex items-center gap-4">
                          <IoDocumentOutline className="text-indigo-600 text-lg" />
                          <Poppins>Detail</Poppins>
                        </div>
                      </Button>

                      {item.certificate &&
                      item.progressStatus === "Completed" ? (
                        <Button variant="success" size="sm" rounded="lg">
                          <FaEye className="text-lg" />
                        </Button>
                      ) : item.progressStatus === "Completed" &&
                        !item.certificate &&
                        !isMentor ? (
                        <Button
                          variant="primary"
                          size="sm"
                          rounded="lg"
                          onClick={() => handleGenerate(item.id)}
                        >
                          <span className="text-white">Claim Certificate</span>
                        </Button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            ) : !classess?.data?.length && !isFetching ? (
              <tr>
                <EmptyState
                  customMinHeight={400}
                  colspan={6}
                  description={["You haven't enrolled in any classes yet"]}
                  // iconSize={80}
                />
              </tr>
            ) : (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-6">
                    <Skeleton width="180px" height="20px" />
                  </td>
                  <td className="py-4 px-6">
                    <Skeleton width="80px" height="20px" />
                  </td>
                  <td className="py-4 px-6">
                    <Skeleton width="100px" height="24px" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Skeleton width="40px" height="20px" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Skeleton width="120px" height="10px" />
                      <Skeleton width="40px" height="16px" />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-2">
                      <Skeleton width="40px" height="40px" />
                      <Skeleton width="100px" height="40px" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
