import { Button } from "../Button";
import { EmptyState } from "../Empty";
import { Poppins } from "../Text";

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
}

export const MasterTable = <T extends DefaultKey>({
  data,
  title,
  withAction = true,
  columnTable,
  isLoading,
}: IMasterTableProps<T>) => {
  return (
    <div className="border-[1.5px] border-solid border-[#cdcdcd] overflow-auto rounded-md bg-[#fefefe]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-solid border-[#ababab]">
            {title?.map((item, index) => (
              <th className="p-4 text-left">
                <Poppins key={index} className="text-medium">
                  {item}
                </Poppins>
              </th>
            ))}
            {withAction ? <th></th> : null}
          </tr>
        </thead>
        <tbody className="w-full">
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
              <div className="w-full h-64 flex items-center justify-center">
                <Poppins>Loading...</Poppins>
              </div>
            </td>
          ) : (
            <EmptyState
              colspan={columnTable.length + (withAction ? 1 : 0)}
              description={[
                "Data is not found.",
                "Create a new data to views of list.",
              ]}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};
