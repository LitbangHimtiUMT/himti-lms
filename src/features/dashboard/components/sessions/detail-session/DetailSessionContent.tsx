import { useState } from "react";
import { IoDocumentOutline, IoWarningOutline } from "react-icons/io5";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../../../_global/components/Button";
import { MasterTable } from "../../../../_global/components/MasterTable";
import { Poppins } from "../../../../_global/components/Text";
import { convertQueryParamsToObject } from "../../../../_global/helper";
import {
  useModules,
  useModulesCreation,
} from "../../../hooks/modules/useModules";
import { AssignmentDrawerCreation } from "../../drawer/AssignmentDrawerCreation";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { Dialog } from "../../../../_global/components/Dialog";
import { BiTrashAlt } from "react-icons/bi";

interface IShowDrawer {
  show: boolean;
  moduleId: string;
}

export const DetailSessionContent = () => {
  const { sessionId, classId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queries = convertQueryParamsToObject(searchParams.toString());

  const [show, setShow] = useState<IShowDrawer>({
    moduleId: "",
    show: false,
  });

  const mutation = useModulesCreation();
  const [moduleId, setModuleId] = useState("");

  const { data: modules, isFetching } = useModules(sessionId);
  const navigate = useNavigate();

  const handleChangePage = (page: string) =>
    setSearchParams({ ...queries, page });

  const handleDeleteModule = async () => {
    mutation.mutateAsync({
      type: "delete",
      id: moduleId,
    });
    setModuleId("");
  };

  return (
    <>
      <MasterTable
        pagination={{
          totalPages: modules?.meta?.totalPages || 1,
          currentPage: modules?.meta?.page || 1,
          onPageChange: (page) => handleChangePage(String(page)),
        }}
        notFoundMessage={["Modules is not found."]}
        title={["Title", "Have Assignment", ""]}
        data={modules?.data || []}
        isLoading={isFetching}
        columnTable={[
          {
            return: (item) => <Poppins>{item.name}</Poppins>,
          },
          {
            return: (item) => (
              <Poppins> {item.assignment ? "Yes" : "No"}</Poppins>
            ),
          },
          {
            return: (item) => (
              <>
                <div className="flex items-center gap-2 justify-end pr-2">
                  <div className="w-10 flex items-center">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        navigate(
                          `/dashboard/${classId}/${sessionId}/${item.id}`
                        )
                      }
                    >
                      <IoDocumentOutline />
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant={item.assignment ? "secondary" : "success"}
                      size="sm"
                      onClick={() => {
                        if (!item.assignment) {
                          setShow((prev) => ({
                            ...prev,
                            moduleId: item.id,
                            show: !prev.show,
                          }));
                          return;
                        }
                        navigate(
                          `/dashboard/${classId}/${sessionId}/${item.id}/${item.assignment?.id}`
                        );
                      }}
                    >
                      {item.assignment
                        ? "View Assignment"
                        : "Create Assignment"}
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant={"danger"}
                      size="md"
                      onClick={() => {
                        setModuleId(item.id);
                      }}
                    >
                      <BiTrashAlt />
                    </Button>
                  </div>
                </div>
              </>
            ),
          },
        ]}
      />
      <AssignmentDrawerCreation
        show={show.show}
        onHide={() => setShow({ show: false, moduleId: "" })}
        moduleId={show.moduleId}
      />
      <ConditionNode condition={!!moduleId}>
        <Dialog onHide={() => setModuleId("")} show={!!moduleId}>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <IoWarningOutline className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Delete Module
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  This action will permanently delete the module and all its
                  contents. Are you sure you want to continue?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setModuleId("")}>
                Cancel
              </Button>
              <Button
                variant={mutation.isPending ? "disabled" : "danger"}
                onClick={handleDeleteModule}
              >
                {mutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </Dialog>
      </ConditionNode>
    </>
  );
};
