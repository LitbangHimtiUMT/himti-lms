import { Button } from "../Button";
import { ConditionNode } from "../ConditionNode";
import { EmptyState } from "../Empty";
import { IPaginationProps, Pagination } from "../Pagination";
import { QueryErrorState } from "../QueryErrorState";
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
  onClickItem?: (item: T) => void;
  notFoundMessage?: string[];
  isError?: boolean;
  onRetry?: () => void;
  // Rows of skeleton while loading. Every caller pages 10 rows by
  // default (useClasses defaults perPage to 10; the API defaults the
  // rest to 10), so 10 unless a caller says otherwise.
  perPage?: number;
}

// Bar widths per column, cycled: the first (name/title) column reads
// longest, the rest shorter — like the real text in each cell.
const SKELETON_CELL_WIDTHS = ["70%", "50%", "60%", "45%"];

export const MasterTable = <T extends DefaultKey>({
  data,
  title,
  withAction = false,
  columnTable,
  isLoading,
  pagination,
  onClickItem,
  notFoundMessage = ["Data is not found."],
  isError,
  onRetry,
  perPage = 10,
}: IMasterTableProps<T>) => {
  return (
    <div className="flex flex-col">
      <Table>
        <>
          <TableHead field={title} />
          <TableBody>
            {data?.length ? (
              data?.map((item) => (
                <tr
                  onClick={() => onClickItem?.(item)}
                  className={`hover:bg-gray-500 border-b border-gray-300 last:border-b-0`}
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
              <>
                {/* One <tr> per page row, one <td> per column — the
                    same shape as the real rows below (td p-4 + a
                    24px text line = 56px rows; 64px when withAction,
                    whose cell holds 32px buttons). No wrapper divs:
                    rows are separated by the tbody divide-y. */}
                {Array.from({ length: perPage }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {columnTable.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="p-4 bg-gray-100 text-left"
                      >
                        <Skeleton
                          width={
                            SKELETON_CELL_WIDTHS[
                              colIndex % SKELETON_CELL_WIDTHS.length
                            ]
                          }
                          height="1.5rem"
                        />
                      </td>
                    ))}
                    {withAction && (
                      <td className="p-4 bg-gray-100">
                        <div className="md:w-36 flex items-center justify-center gap-2">
                          <Skeleton width="9rem" height="2rem" />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </>
            ) : isError && onRetry ? (
              <QueryErrorState
                colspan={columnTable.length + (withAction ? 1 : 0)}
                onRetry={onRetry}
              />
            ) : (
              <EmptyState
                colspan={columnTable.length + (withAction ? 1 : 0)}
                description={notFoundMessage}
              />
            )}
          </TableBody>
        </>
      </Table>
      {/* While loading the meta (and so totalPages) is not here yet,
          so the pagination below would pop in after the table. The
          placeholder reserves its exact spot: prev + 3 page buttons
          + next, h-9 squares with my-6, like the real Pagination. */}
      {isLoading ? (
        <div className="my-6 flex items-center gap-2" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              width="2.25rem"
              height="2.25rem"
              borderRadius="0.375rem"
            />
          ))}
        </div>
      ) : (
        <ConditionNode condition={!!pagination && pagination?.totalPages > 1}>
          <Pagination {...(pagination as IPaginationProps)} />
        </ConditionNode>
      )}
    </div>
  );
};
