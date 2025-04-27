import { IoDocumentOutline } from "react-icons/io5";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../_global/components/Button";
import { EmptyState } from "../../_global/components/Empty";
import { Pagination } from "../../_global/components/Pagination";
import { Skeleton } from "../../_global/components/Shimer";
import { Table, TableBody, TableHead } from "../../_global/components/Table";
import { Poppins } from "../../_global/components/Text";
import { convertQueryParamsToObject } from "../../_global/helper";
import { useProfile } from "../../profile/useProfile";
import { useSessions } from "../hooks/sessions/useSessions";

export const AssignmentTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: profile, isFetching: isFetchingProfile } = useProfile();
  const { classId } = useParams();
  const { data: sessions, isFetching } = useSessions();
  const queries = convertQueryParamsToObject(searchParams.toString());
  const navigate = useNavigate();

  const handleChangePage = (page: string) =>
    setSearchParams({ ...queries, page });

  return (
    <>
      <div className="w-full rounded-md">
        <Table>
          <TableHead field={["Title", "Total Module", ""]} />
          <TableBody>
            {sessions?.data?.length && !isFetching ? (
              (sessions?.data ?? [])?.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index !== (sessions?.data?.length as number) - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <td className="py-4 px-6 text-gray-900">{item.name}</td>
                  <td className="py-4 px-6 text-gray-900">{`${item.module.length} Module`}</td>
                  {!profile?.data?.isMentor && !isFetchingProfile && (
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
                  )}
                  <td>
                    <div className="w-10">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate(`/dashboard/${classId}/${item.id}`)
                        }
                      >
                        <IoDocumentOutline />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : !sessions?.data?.length && !isFetching ? (
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
          </TableBody>
        </Table>
        {(sessions?.meta?.page as number) > 1 && (
          <Pagination
            totalPages={sessions?.meta?.totalPages ?? 1}
            currentPage={sessions?.meta?.page ?? 1}
            onPageChange={(page) => handleChangePage(String(page))}
          />
        )}
      </div>
    </>
  );
};
