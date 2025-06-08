import { IoDocumentOutline } from "react-icons/io5";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../../../_global/components/Button";
import { EmptyState } from "../../../../_global/components/Empty";
import { Pagination } from "../../../../_global/components/Pagination";
import { Skeleton } from "../../../../_global/components/Shimer";
import { convertQueryParamsToObject } from "../../../../_global/helper";
import { useModules } from "../../../hooks/modules/useModules";
import { CreateAssignmentDrawer } from "../../drawer/CreateAssignmentDrawer";
import { useState } from "react";
import { useProfile } from "../../../../profile/useProfile";
import { useDetailClass } from "../../../../class/hooks/useClasses";
import { TableHead } from "../../../../_global/components/Table";

interface IShowDrawer {
  show: boolean;
  moduleId: string;
}

export const DetailSessionContent = () => {
  const { sessionId, classId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queries = convertQueryParamsToObject(searchParams.toString());

  const { data: classess } = useDetailClass();


  const { data: profile } = useProfile();
  const [show, setShow] = useState<IShowDrawer>({
    moduleId: "",
    show: false,
  });
  const { data: modules, isFetching } = useModules(sessionId);
  const from = searchParams.get("from");
  const navigate = useNavigate()

  const handleChangePage = (page: string) =>
    setSearchParams({ ...queries, page });

  const isOwner = profile?.data?.id === classess?.data?.creator?.id

  return (
    <>
      <div className="w-full rounded-md">
        <div className="overflow-x-auto rounded-md border border-solid border-gray-300">
          <table className="w-full">
          <TableHead
          field={['Title', 'Have Assignment', '']}
          />

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
                        {!item.isCompleted && !isOwner ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-green-600"></div>
                          </>
                        ) : null}
                        <Link
                          to={`/dashboard/${classId}/${sessionId}/${item.id}${
                            from ? `?from=${from}` : ""
                          }`}
                        >
                          <div className="w-10">
                            <Button variant="secondary">
                              <IoDocumentOutline />
                            </Button>
                          </div>
                        </Link>
                        <div>
                          {item.assignment || isOwner ? (
                            <Button
                              variant={
                                item.assignment || !isOwner ? "secondary" : "success"
                              }
                              size="sm"
                              onClick={() => {
                                if (!item.assignment) {
                                  setShow((prev) => ({
                                    ...prev,
                                    moduleId: item.id,
                                    show: !prev.show,
                                  }));
                                  return
                                }
                                navigate(`/dashboard/${classId}/${sessionId}/${item.id}/${item.assignment?.id}`)
                              }}
                            >
                              {item.assignment || !isOwner
                                ? "View Assignment"
                                : "Create Assignment"}
                            </Button>
                          ) : null}
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
          </table>
        </div>
        {(modules?.meta?.page as number) > 1 && (
          <Pagination
            totalPages={modules?.meta?.totalPages ?? 1}
            currentPage={modules?.meta?.page ?? 1}
            onPageChange={(page) => handleChangePage(String(page))}
          />
        )}
      </div>
      <CreateAssignmentDrawer
        show={show.show}
        onHide={() => setShow({ show: false, moduleId: "" })}
        moduleId={show.moduleId}
      />
    </>
  );
};
