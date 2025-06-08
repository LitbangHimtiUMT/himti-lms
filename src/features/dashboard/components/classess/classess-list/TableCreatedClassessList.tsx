import { CiSearch } from "react-icons/ci";
import { FiLink } from "react-icons/fi";
import { IoDocumentOutline, IoWarning } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import {
  useClasses,
  useClassesCreation,
} from "../../../../class/hooks/useClasses";
import { useProfile } from "../../../../profile/useProfile";
import { BiTrashAlt } from "react-icons/bi";
import { Dialog } from "../../../../_global/components/Dialog";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { Poppins } from "../../../../_global/components/Text";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const TableCreatedClassessList = () => {
  const navigate = useNavigate();
  const { data: classess, isFetching } = useClasses();
  const {data: profile} = useProfile()

  const { handleInputChange } = useSearchParamsInput("search");
  const [dialog, setDialog] = useState<string>('')

  const handleCopy = (code: string) => {
    navigator.clipboard
      .writeText(`${window.location.origin}/invitation/${code}`)
      .then(() => {
        toast.success("Copied to clipboard");
      });
  };

  const mutation = useClassesCreation();
  const queryClient = useQueryClient()

  const handlePublishClass = async (id: string) => {
    await mutation.mutateAsync({
      id,
      type: "publish",
    });
  };

  const handleDeleteClass = async (id: string) => {
    await mutation.mutateAsync({
      id,
      type: "delete",
    });
    setDialog('')
    queryClient.invalidateQueries({
      queryKey: ['classes']
    })
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
        <TableHead field={["Class Name", "Price", "Category", "Total Participant",""]} />
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
                <td className="py-4 px-6 text-gray-900">{`${item.totalParticipant}`}</td>
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
                    {item.status === "DRAFT" ? (
                      <>
                        <div className="w-10">
                          <Button
                            variant="secondary"
                            onClick={() => handlePublishClass(item.id)}
                          >
                            <MdOutlineFileUpload />
                          </Button>
                        </div>
                      </>
                    ) : null}
                    {item.creator.id === profile?.data?.id ? (
                      <>
                        <div className="w-10">
                          <Button
                            variant="danger"
                            onClick={() => setDialog(item.id)}
                          >
                            <BiTrashAlt />
                          </Button>
                        </div>
                      </>
                    ) : null}
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
        <ConditionNode condition={!!dialog}>
          <Dialog onHide={() => setDialog('')} show={!!dialog}>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <IoWarning className="text-2xl text-red-600" />
                <Poppins className="text-md font-medium text-black">
                  Delete Class
                </Poppins>
              </div>
              <div>
                <Poppins className="text-sm text-black">
                  Are you sure you want to delete class? this action will delete
                  class permanently
                </Poppins>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-4">
                  <Button variant="secondary" onClick={() => setDialog('')}>
                    <Poppins>Cancel</Poppins>
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteClass(dialog)}>
                    <Poppins>Yes</Poppins>
                  </Button>
                </div>
              </div>
            </div>
          </Dialog>
        </ConditionNode>
    </div>
  );
};
