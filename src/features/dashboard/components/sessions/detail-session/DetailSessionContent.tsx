import { IoDocumentOutline } from "react-icons/io5";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../../../_global/components/Button";
import { EmptyState } from "../../../../_global/components/Empty";
import { Pagination } from "../../../../_global/components/Pagination";
import { Skeleton } from "../../../../_global/components/Shimer";
import { convertQueryParamsToObject } from "../../../../_global/helper";
import { useModules } from "../../../hooks/modules/useModules";
import { ConditionNode } from "../../../../_global/components/ConditionNode";

export const DetailSessionContent = () => {
  const { sessionId, classId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queries = convertQueryParamsToObject(searchParams.toString());

  const { data: modules, isFetching } = useModules(sessionId);
  const from = searchParams.get("from");

  const handleChangePage = (page: string) =>
    setSearchParams({ ...queries, page });

  return (
    <>
      <div className="w-full rounded-md">
        <div className="overflow-x-auto rounded-md border border-solid border-gray-300">
          <table className="w-full">
            <thead>
              <tr className="bg-[#192d4c] text-white">
                <th className="py-3 px-6 text-left font-medium text-sm">
                  Title
                </th>
                <th className="py-3 px-6 text-left font-medium text-sm">
                  Have Submission
                </th>
                <th className="py-3 px-6 text-left font-medium text-sm"></th>
              </tr>
            </thead>

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
                          <Button variant={item.assignment ? "secondary" : "success"} size="sm">
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
                  colspan={3}
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
    </>
  );
};
