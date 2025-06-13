import { Button } from "../Button";
import { ConditionNode } from "../ConditionNode";
import { EmptyState } from "../Empty";
import { IPaginationProps, Pagination } from "../Pagination";
import { Skeleton } from "../Shimer";
import { Table, TableBody, TableHead } from "../Table";

interface DefaultKey {
  id: number | string;
}

interface ColumnTable<T> {
  return?: (record: T) => React.ReactNode | string;
}

interface IMasterTableProps<T extends DefaultKey> {
  data?: T[];
  title: string[];
  isLoading?: boolean;
  withAction?: boolean;
  columnTable: ColumnTable<T>[];
  pagination?: IPaginationProps;
}

export const MasterTable = <T extends DefaultKey>({
  data,
  title,
  withAction = true,
  columnTable,
  isLoading,
  pagination,
}: IMasterTableProps<T>) => {
  return (
    <div className="flex flex-col">
      <Table>
        <>
          <TableHead field={title} />
          <TableBody>
            {data?.length ? (
              data?.map((item, index) => (
                <tr
                  className={`${
                    index === (data?.length as number) - 1
                      ? ""
                      : "border-b border-solid border-[#a5a5a5]"
                  }`}
                >
                  {columnTable.map((column, index) => (
                    <td key={index} className="p-4 bg-gray-100 text-left">
                      {column.return ? column.return(item) : null}
                    </td>
                  ))}
                  {withAction && (
                    <td className="p-4 bg-gray-100">
                      <div className="md:w-36 flex items-center justify-center gap-2">
                        <Button size="md">Detail</Button>
                        <Button size="md" variant="success">
                          Update
                        </Button>
                        <Button size="md" variant="danger">
                          Delete
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : isLoading ? (
              <td colSpan={columnTable.length + (withAction ? 1 : 0)}>
                <div className="flex flex-col gap-4 mt-4 py-2 px-4">
                  <Skeleton width="100%" height="3rem" />
                  <Skeleton width="100%" height="3rem" />
                  <Skeleton width="100%" height="3rem" />
                </div>
              </td>
            ) : (
              <EmptyState
                colspan={columnTable.length + (withAction ? 1 : 0)}
                description={["Data is not found."]}
              />
            )}
          </TableBody>
        </>
      </Table>
      <ConditionNode condition={!!pagination && pagination?.totalPages > 1}>
        <Pagination {...pagination as IPaginationProps} />
      </ConditionNode>
    </div>
  );
};
