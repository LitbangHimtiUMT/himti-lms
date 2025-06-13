import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BiCopyAlt, BiTrashAlt } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { IoDocumentOutline, IoWarningOutline } from "react-icons/io5";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClassModel } from "../../../../../core/model/classes";
import { Badge } from "../../../../_global/components/Badge";
import { Button } from "../../../../_global/components/Button";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { Dialog } from "../../../../_global/components/Dialog";
import { DropdownMenu } from "../../../../_global/components/DropdownMenu";
import { Input } from "../../../../_global/components/Input";
import { MasterTable } from "../../../../_global/components/MasterTable";
import { formatRupiah } from "../../../../_global/helper";
import { useSearchParamsInput } from "../../../../_global/hooks/useSearchParamsInput";
import {
  useClasses,
  useClassesCreation,
} from "../../../../class/hooks/useClasses";
import { useProfile } from "../../../../profile/useProfile";
import { DrawerParticipants } from "../../drawer/DrawerParticipants";
import { UpdateClassDrawer } from "../../drawer/UpdateClassDrawer";

export const TableCreatedClassessList = () => {
  const navigate = useNavigate();
  const { data: classes, isFetching } = useClasses();
  const { data: profile } = useProfile();
  const { handleInputChange } = useSearchParamsInput("search");
  const [dialog, setDialog] = useState<string>("");
  const queryClient = useQueryClient();
  const mutation = useClassesCreation();
  const [data, setData] = useState<
    (Omit<ClassModel, "thumbnail"> & { thumbnail: File }) | undefined
  >(undefined);

  const handleCopyInviteLink = (code: string) => {
    navigator.clipboard
      .writeText(`${window.location.origin}/invitation/${code}`)
      .then(() => toast.success("Invitation link copied to clipboard"));
  };

  const [classId, setClassId] = useState("");

  const handlePublishClass = async (id: string) => {
    await mutation.mutateAsync({ id, type: "publish" });
  };

  const handleDeleteClass = async (id: string) => {
    await mutation.mutateAsync({ id, type: "delete" });
    setDialog("");
    queryClient.invalidateQueries({ queryKey: ["classes"] });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white hidden md:block">
          My Classes
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

      <MasterTable
        isLoading={isFetching}
        withAction={false}
        data={classes?.data || []}
        title={[
          "Class Name",
          "Price",
          "Category",
          "Participants",
          "Status",
          "",
        ]}
        columnTable={[
          {
            return: ({ name }) => (
              <div className="font-medium text-gray-900 dark:text-white">
                {name}
              </div>
            ),
          },
          {
            return: ({ price }) => (
              <div className="text-gray-700 dark:text-gray-300">
                {formatRupiah(price)}
              </div>
            ),
          },
          {
            return: ({ category }) => (
              <Badge variant="default" size="sm" className="capitalize">
                {category.name}
              </Badge>
            ),
          },
          {
            return: ({ totalParticipant }) => (
              <div className="text-gray-700 dark:text-gray-300">
                {totalParticipant}
              </div>
            ),
          },
          {
            return: ({ status }) => (
              <Badge
                size="sm"
                variant={status === "PUBLISH" ? "success" : "outline"}
                className="capitalize"
              >
                {status.toLowerCase()}
              </Badge>
            ),
          },
          {
            return: (item) => (
              <div className="flex items-center justify-center">
                <DropdownMenu
                  items={[
                    {
                      label: "Detail",
                      icon: <IoDocumentOutline />,
                      onClick: () => navigate(`/dashboard/my-class/${item.id}`),
                    },
                    {
                      label: "Copy Invite Link",
                      icon: <BiCopyAlt />,
                      onClick: () => handleCopyInviteLink(item.code ?? ""),
                    },
                    {
                      label: "Participants",
                      icon: (
                        <FaUserGroup className="text-gray-600 dark:text-gray-300" />
                      ),
                      onClick: () => setClassId(item.id),
                    },
                    ...(item.status === "DRAFT"
                      ? [
                          {
                            label:
                              mutation.isPending &&
                              mutation.variables.type === "publish"
                                ? "Publishing..."
                                : "Publish Class",
                            icon: <MdOutlinePublishedWithChanges />,
                            onClick: () => handlePublishClass(item.id),
                            disabled:
                              mutation.isPending &&
                              mutation.variables.type === "publish",
                          },
                        ]
                      : []),
                    ...(item.creator.id === profile?.data?.id
                      ? [
                          {
                            label: "Edit Class",
                            icon: <FiEdit2 />,
                            onClick: () =>
                              setData({
                                ...item,
                                thumbnail: item.thumbnail as unknown as File,
                              }),
                          },
                          {
                            label: "Delete Class",
                            icon: <BiTrashAlt />,
                            onClick: () => setDialog(item.id),
                            variant: "danger" as const,
                          },
                        ]
                      : []),
                  ]}
                />
              </div>
            ),
          },
        ]}
      />
      {/* <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHead
            field={[
              "Class Name",
              "Price",
              "Category",
              "Participants",
              "Status",
              "Actions",
            ]}
          />
          <TableBody>
            {isFetching ? (
              <tr>
                <td colSpan={6}>
                  <div className="p-4 space-y-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Skeleton key={idx} width="100%" height="48px" />
                    ))}
                  </div>
                </td>
              </tr>
            ) : classes?.data?.length ? (
              classes.data.map((item) => (
                <tr
                  key={item.id}
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
                    <Badge variant="default" size="sm" className="capitalize">
                      {item.category.name}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-700 dark:text-gray-300">
                      {item.totalParticipant}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge
                      size="sm"
                      variant={
                        item.status === "PUBLISH" ? "success" : "outline"
                      }
                      className="capitalize"
                    >
                      {item.status.toLowerCase()}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Button
                        tooltip="Detail Class"
                        size="md"
                        variant="secondary"
                        onClick={() =>
                          navigate(
                            `/dashboard/my-class/${item.id}?from=created`
                          )
                        }
                      >
                        <IoDocumentOutline className="text-gray-600 dark:text-gray-300" />
                      </Button>
                      <Button
                        tooltip="View Participants"
                        size="md"
                        variant="secondary"
                        onClick={() => setClassId(item.id)}
                      >
                        <FaUserGroup className="text-gray-600 dark:text-gray-300" />
                      </Button>

                      <Button
                        size="md"
                        variant="secondary"
                        tooltip="Copy Link"
                        onClick={() => handleCopyInviteLink(item.code ?? "")}
                      >
                        <BiCopyAlt className="text-gray-600 dark:text-gray-300" />
                      </Button>

                      {item.status === "DRAFT" && (
                        <Button
                          size="md"
                          variant={
                            mutation.isPending &&
                            mutation.variables.type === "publish"
                              ? "disabled"
                              : "primary"
                          }
                          tooltip="Publish Class"
                          onClick={() => handlePublishClass(item.id)}
                        >
                          {mutation.isPending &&
                          mutation.variables.type === "publish" ? (
                            "..."
                          ) : (
                            <MdOutlinePublishedWithChanges className="text-white" />
                          )}
                        </Button>
                      )}

                      {item.creator.id === profile?.data?.id && (
                        <>
                          <Button
                            size="md"
                            variant="disabled"
                            tooltip="Update Class"
                            onClick={() =>
                              navigate(`/dashboard/class/${item.id}/edit`)
                            }
                          >
                            <FiEdit2 className="text-white" />
                          </Button>

                          <Button
                            size="md"
                            variant="danger"
                            tooltip="Delete Class"
                            onClick={() => setDialog(item.id)}
                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <BiTrashAlt />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <EmptyState
                    variant="table"
                    customMinHeight={400}
                    description={[
                      "No classes found",
                      "Create your first class to get started",
                    ]}
                  />
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div> */}

      <ConditionNode condition={!!dialog}>
        <Dialog onHide={() => setDialog("")} show={!!dialog}>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <IoWarningOutline className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Delete Class
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  This action will permanently delete the class and all its
                  contents. Are you sure you want to continue?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setDialog("")}>
                Cancel
              </Button>
              <Button
                variant={mutation.isPending ? "disabled" : "danger"}
                onClick={() => handleDeleteClass(dialog)}
              >
                {mutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </Dialog>
      </ConditionNode>
      <DrawerParticipants
        onHide={() => setClassId("")}
        show={!!classId}
        title="Participants"
        classId={classId}
      />
      <UpdateClassDrawer
        onHide={() => setData(undefined)}
        show={!!data}
        data={data}
      />
    </div>
  );
};
