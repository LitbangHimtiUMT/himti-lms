import React from "react";

export const CompletedClassNotice: React.FC = () => (
  <div className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
    This class is marked as completed. Its content is locked — sessions,
    modules, assignments, and class details can no longer be created or
    edited. Submissions and reviews still work.
  </div>
);
