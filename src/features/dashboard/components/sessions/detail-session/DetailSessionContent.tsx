import { useState } from "react";
import { IoDocumentOutline } from "react-icons/io5";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../../../_global/components/Button";
import { EmptyState } from "../../../../_global/components/Empty";
import { Pagination } from "../../../../_global/components/Pagination";
import { Skeleton } from "../../../../_global/components/Shimer";
import { Table, TableHead } from "../../../../_global/components/Table";
import { convertQueryParamsToObject } from "../../../../_global/helper";
import { useModules } from "../../../hooks/modules/useModules";
import { AssignmentDrawerCreation } from "../../drawer/AssignmentDrawerCreation";

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
  const { data: modules, isFetching } = useModules(sessionId);
  const navigate = useNavigate();

  const handleChangePage = (page: string) =>
    setSearchParams({ ...queries, page });

  return (
    <>
      <div className="w-full rounded-md">
        <Table>
          <TableHead field={["Title", "Have Assignment", ""]} />

          {/* Table Body */}
          <tbody className="bg-gray-50">
            {modules?.data?.length && !isFetching ? (
              (modules?.data ?? [])?.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index !== (modules?.data?.length as number) - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <td className="py-4 px-6 text-gray-900">{item.name}</td>
                  <td className="py-4 px-6 text-gray-900">
                    {item.assignment ? "Yes" : "No"}
                  </td>
                  <td>
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
                    </div>
                  </td>
                </tr>
              ))
            ) : !modules?.data?.length && !isFetching ? (
              <EmptyState
                customMinHeight={400}
                colspan={4}
                description={["Session not found"]}
              />
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td colSpan={3} className="py-4 px-6 text-gray-900">
                    <Skeleton width="100%" height="40px" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {(modules?.meta?.page as number) > 1 && (
          <Pagination
            totalPages={modules?.meta?.totalPages ?? 1}
            currentPage={modules?.meta?.page ?? 1}
            onPageChange={(page) => handleChangePage(String(page))}
          />
        )}
      </div>
      <AssignmentDrawerCreation
        show={show.show}
        onHide={() => setShow({ show: false, moduleId: "" })}
        moduleId={show.moduleId}
      />
    </>
  );
};
