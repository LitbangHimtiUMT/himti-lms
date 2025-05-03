import { FiLink } from "react-icons/fi";
import { IoDocumentOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../_global/components/Button";
import { EmptyState } from "../../../../_global/components/Empty";
import { Skeleton } from "../../../../_global/components/Shimer";
import {
  Table,
  TableBody,
  TableHead,
} from "../../../../_global/components/Table";
import { formatRupiah } from "../../../../_global/helper";
import { useClasses } from "../../../../class/hooks/useClasses";
import { Input } from "../../../../_global/components/Input";
import { CiSearch } from "react-icons/ci";
import { useSearchParamsInput } from "../../../../_global/hooks/useSearchParamsInput";
import { toast } from "react-toastify";

export const TableCreatedClassessList = () => {
  const navigate = useNavigate();
  const { data: classess, isFetching } = useClasses();

  const { handleInputChange } = useSearchParamsInput("search");

  const handleCopy = (code: string) => {
    navigator.clipboard
      .writeText(`${window.location.origin}/invitation/${code}`)
      .then(() => {
        toast.success("Copied to clipboard");
      });
  };

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
        <TableHead field={["Class Name", "Price", "Category", ""]} />
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
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-10">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate(`/dashboard/class/${item.id}?from=created`)
                        }
                      >
                        <IoDocumentOutline />
                      </Button>
                    </div>
                    <div className="w-10">
                      <Button
                        variant="secondary"
                        onClick={() => handleCopy(item.code ?? "")}
                      >
                        <FiLink />
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : !classess?.data?.length && !isFetching ? (
            <EmptyState
              customMinHeight={400}
              colspan={4}
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
