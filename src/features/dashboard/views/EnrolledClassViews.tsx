import { TableEnrolledClassessList } from "../components/classess/classess-list/TableEnrolledClassList";

export const EnrolledClassViews = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex lg:flex-row flex-col lg:items-start justify-between lg:gap-0 gap-4">
        <h1 className="text-3xl font-bold">Enrolled Class</h1>
      </div>
      <TableEnrolledClassessList />
    </div>
  );
};
