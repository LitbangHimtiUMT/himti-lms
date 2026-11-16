import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../_global/components/Button";
import { Drawer } from "../../../_global/components/Drawer";
import { DropdownRevamp } from "../../../_global/components/Dropdown/DropdownRevamp";
import { InputLabel } from "../../../_global/components/InputLabel";
import { Poppins } from "../../../_global/components/Text";
import { TextEditor } from "../../../_global/components/TextEditor";
import { useAssignmentsCreation } from "../../hooks/assignments/useAssignmentsCreation";
import { useDetailClass } from "../../../class/hooks/useClasses";
import { DatePicker } from "../../../_global/components/DatePicker";
import {
  CertificatesIssuedNotice,
  CompletedClassNotice,
  ConfirmContentChangeDialog,
} from "../classes/ClassContentNotices";

interface Props {
  onHide: VoidFunction;
  show: boolean;
  moduleId?: string;
  data?: FormState;
}

interface FormState {
  title: string;
  dueDate: Date;
  id?: string;
  description: string;
  allowedFile?: string;
  type: "URL" | "FILE";
}

const getDefaultFormState = (): FormState => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);
  return {
    description: "",
    dueDate,
    title: "",
    type: "FILE",
    allowedFile: undefined,
  };
};

// Mirrors the API's checkDueDate: a due date stays open until the end
// of its day, so today is still valid and only past days are rejected.
// Accepts Date or string — prefilled values arrive from the API as
// strings, picker selections arrive as Date objects.
const isDueDateOpen = (dueDate: Date | string): boolean => {
  const due = new Date(dueDate);
  if (isNaN(due.getTime())) return false;
  due.setHours(23, 59, 59, 999);
  return new Date() <= due;
};

const AllowedFileMap: Record<".zip" | ".rar" | ".pdf", string> = {
  ".rar": "RAR",
  ".zip": "ZIP",
  ".pdf": "PDF",
};

export const AssignmentDrawerCreation: React.FC<Props> = ({
  onHide,
  show,
  moduleId,
  data,
}) => {
  const [form, setForm] = useState<FormState>(data || getDefaultFormState());

  const mutation = useAssignmentsCreation();
  const { data: classes } = useDetailClass();
  const isCompleted = !!classes?.data?.completedAt;
  const totalCertificates = classes?.data?.totalCertificates ?? 0;
  const showWarning = !isCompleted && totalCertificates > 0;
  const [showConfirm, setShowConfirm] = useState(false);

  const doSubmit = async () => {
    try {
      if (data) {
        await mutation.mutateAsync({
          type: "update",
          data: {
            ...form,
            id: data.id,
            allowedFile: form.type === "URL" ? undefined : form.allowedFile,
          },
          moduleId: moduleId ?? "",
        });
      } else {
        await mutation.mutateAsync({
          type: "create",
          data: {
            ...form,
            allowedFile: form.type === "URL" ? undefined : form.allowedFile,
          },
          moduleId: moduleId ?? "",
        });
      }
      onHide();
      setForm(getDefaultFormState());
    } catch {
      // The mutation's onError toast already reports the failure;
      // leave the drawer open so the user can retry.
    }
  };

  const handleCreateAssignment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (isCompleted) return;
    if (!isDueDateOpen(form.dueDate)) {
      toast.error("Due date must not be in the past.");
      return;
    }
    if (showWarning) {
      setShowConfirm(true);
      return;
    }
    await doSubmit();
  };

  useEffect(() => {
    if (show) {
      setForm(data || getDefaultFormState());
    }
  }, [show, data]);
  
  return (
    <>
      <Drawer
        onHide={onHide}
        show={!!show}
        style={{
          marginTop: "3rem",
          minWidth: "600px",
          paddingBottom: "4rem",
        }}
      >
        <Poppins className="text-left text-lg px-5 mb-5 font-semibold">
          {data ? "Update" : "Create"} Assignment
        </Poppins>
        <form
          className="px-5 flex flex-col items-center gap-3"
          onSubmit={handleCreateAssignment}
        >
          {isCompleted && <CompletedClassNotice />}
          {showWarning && (
            <CertificatesIssuedNotice totalCertificates={totalCertificates} />
          )}
          <InputLabel
            title="Title"
            titleSize="sm"
            inputProps={{
              value: form.title,
              onChange: (e) => setForm({ ...form, title: e.target.value }),
              disabled: isCompleted,
            }}
          />
          <div className="flex flex-col gap-2 w-full">
            <Poppins className="text-sm">Due Date</Poppins>
            {/* DatePicker has no disabled prop: block pointer input
                instead of leaving an editable picker in a locked form. */}
            <div className={isCompleted ? "pointer-events-none opacity-60" : undefined}>
              <DatePicker
                value={form?.dueDate}
                fullWidth={false}
                mode="date"
                placeholder="Pick a date"
                onChange={(e) => setForm({ ...form, dueDate: e as Date })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Poppins className="text-sm">Description</Poppins>
            <TextEditor
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e }))}
              textEditorProps={{ disable: isCompleted }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Poppins className="text-sm">Allowed File</Poppins>
            <DropdownRevamp
              disabled={isCompleted}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  allowedFile: e.value,
                  type: e.value?.toLowerCase() === "url" ? "URL" : "FILE",
                }))
              }
              defaultValue={
                data && data?.type !== "URL"
                  ? {
                      label:
                        AllowedFileMap[
                          data.allowedFile as ".zip" | ".rar" | ".pdf"
                        ] ?? "ZIP",
                      value: data.allowedFile ?? ".zip",
                    }
                  : data
                  ? {
                      label: "URL",
                      value: "URL",
                    }
                  : undefined
              }
              list={[
                {
                  label: "ZIP",
                  value: ".zip",
                },
                {
                  label: "RAR",
                  value: ".rar",
                },
                {
                  label: "PDF",
                  value: ".pdf",
                },
                {
                  label: "URL",
                  value: "URL",
                },
              ]}
            />
          </div>

          <Button
            type="submit"
            variant={mutation.isPending || isCompleted ? "disabled" : "primary"}
          >
            {mutation.isPending
              ? "Loading..."
              : data
              ? "Update Assignment"
              : "Create Assignment"}
          </Button>
        </form>
      </Drawer>
      <ConfirmContentChangeDialog
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          void doSubmit();
        }}
        isPending={mutation.isPending}
        totalCertificates={totalCertificates}
      />
    </>
  );
};
