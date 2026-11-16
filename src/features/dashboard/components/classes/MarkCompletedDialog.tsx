import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { Button } from "../../../_global/components/Button";
import { Dialog } from "../../../_global/components/Dialog";
import {
  useClassesCreation,
  useDetailClass,
} from "../../../class/hooks/useClasses";
import { useDashboardStats } from "../../hooks/dashboard/useDashboardStats";

interface MarkCompletedDialogProps {
  onHide: () => void;
  classId: string;
  className: string;
  participantCount: number;
}

// Mounted only while open: the detail and stats queries below run
// only when the mentor actually opens the confirmation.
export const MarkCompletedDialog: React.FC<MarkCompletedDialogProps> = ({
  onHide,
  classId,
  className,
  participantCount,
}) => {
  const mutation = useClassesCreation();
  const { data: detail, isFetching } = useDetailClass("id", classId);
  const { data: stats } = useDashboardStats();
  const pendingReviews = stats?.data?.perClass.find(
    (item) => item.id === classId
  )?.pendingReviews;

  const handleConfirm = async () => {
    try {
      await mutation.mutateAsync({ id: classId, type: "complete" });
      onHide();
    } catch {
      // The mutation's onError toast already reports the failure;
      // keep the dialog open so the user can retry.
    }
  };

  return (
    <Dialog onHide={onHide} show>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-red-100 text-red-600">
            <IoWarningOutline className="text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Mark Class as Completed
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Mark <span className="font-medium">{className}</span> as
              completed? This action is permanent and cannot be undone.
            </p>
          </div>
        </div>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
          <li>{participantCount} participants enrolled</li>
          <li>
            {isFetching
              ? "Loading certificate count…"
              : `${detail?.data?.totalCertificates ?? 0} certificates issued`}
          </li>
          {pendingReviews !== undefined && (
            <li>{pendingReviews} submissions awaiting review</li>
          )}
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Once completed, the class content is locked: sessions, modules,
          assignments, and class details can no longer be created or edited.
          Participants can still submit assignments, mentors can still review
          submissions, and certificates can still be claimed.
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button
            variant={mutation.isPending ? "disabled" : "danger"}
            onClick={handleConfirm}
          >
            {mutation.isPending ? "Processing..." : "Mark Completed"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
