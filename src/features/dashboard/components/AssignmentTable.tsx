import { useSearchParams } from "react-router-dom";
import HIMTI from "../../../core/assets/logo/HIMTI.png";
import { Pagination } from "../../_global/components/Pagination";
import { useSessions } from "../hooks/sessions/useSessions";
import { Poppins } from "../../_global/components/Text";
import { convertQueryParamsToObject } from "../../_global/helper";
import { Skeleton } from "../../_global/components/Shimer";

export const AssignmentTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("classId");
  const { data: sessions, isFetching } = useSessions();
  const queries = convertQueryParamsToObject(searchParams.toString());

  const handleChangePage = (page: string) =>
    setSearchParams({ ...queries, page });
  return (
    <>
      {sessionId ? (
        <div className="w-full rounded-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-[#2B4B7C] text-white">
                  <th className="py-3 px-6 text-left font-medium text-sm">
                    Title
                  </th>
                  <th className="py-3 px-6 text-left font-medium text-sm">
                    Total Module
                  </th>
                  <th className="py-3 px-6 text-left font-medium text-sm">
                    Progress
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-gray-50">
                {sessions?.data?.length && !isFetching
                  ? (sessions?.data ?? [])?.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-4 px-6 text-gray-900">{item.name}</td>
                        <td className="py-4 px-6 text-gray-900">{`${item.module.length} Module`}</td>
                        <td className="py-4 px-6 text-gray-900 flex items-center gap-2">
                          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden flex items-center">
                            <div
                              className={`h-full rounded-full ${
                                item.progressStatus === "Completed"
                                  ? "bg-[#2B4B7C]"
                                  : "bg-orange-500"
                              }`}
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <Poppins className="text-sm">{`${item.progress}%`}</Poppins>
                        </td>
                      </tr>
                    ))
                  : Array.from({ length: 4 }).map((_, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200"
                        // className={`mb-4 ${
                        //   index === (classess?.data?.length as number) - 1
                        //     ? ""
                        //     : "mb-6"
                        // }`}
                      >
                        <td colSpan={3} className="py-4 px-6 text-gray-900">
                          <Skeleton width="100%" height="40px" />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          {(sessions?.meta?.page as number) > 1 && (
            <Pagination
              totalPages={sessions?.meta?.totalPages ?? 1}
              currentPage={sessions?.meta?.page ?? 1}
              onPageChange={(page) => handleChangePage(String(page))}
            />
          )}
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-center">
            <>
              <img src={HIMTI} width={500} />
            </>
          </div>
        </>
      )}
    </>
  );
};
