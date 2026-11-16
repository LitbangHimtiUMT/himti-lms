import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { Button } from "../../../_global/components/Button";
import { Dialog } from "../../../_global/components/Dialog";

export const CompletedClassNotice: React.FC = () => (
  <div className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
    This class is marked as completed. Its content is locked — sessions,
    modules, assignments, and class details can no longer be created or
    edited. Submissions and reviews still work.
  </div>
);

export const CertificatesIssuedNotice: React.FC<{
  totalCertificates: number;
}> = ({ totalCertificates }) => (
  <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
    Certificates have already been issued for this class (
    {totalCertificates}). New content will not apply retroactively to
    existing certificate holders.
  </div>
);

interface ConfirmContentChangeDialogProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  isPending: boolean;
  totalCertificates: number;
}

export const ConfirmContentChangeDialog: React.FC<
  ConfirmContentChangeDialogProps
> = ({ show, onHide, onConfirm, isPending, totalCertificates }) => (
  <Dialog onHide={onHide} show={show}>
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-full bg-amber-100 text-amber-600">
          <IoWarningOutline className="text-xl" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Certificates Already Issued
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {totalCertificates} certificate
            {totalCertificates === 1 ? " has" : "s have"} already been issued
            for this class. New content will not apply retroactively to
            existing certificate holders. Are you sure you want to continue?
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant={isPending ? "disabled" : "warning"}
          onClick={onConfirm}
        >
          {isPending ? "Loading..." : "Continue"}
        </Button>
      </div>
    </div>
  </Dialog>
);
