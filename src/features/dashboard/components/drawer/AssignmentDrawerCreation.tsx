import React, { useEffect, useState } from "react";
import { Button } from "../../../_global/components/Button";
import { Drawer } from "../../../_global/components/Drawer";
import { DropdownRevamp } from "../../../_global/components/Dropdown/DropdownRevamp";
import { InputLabel } from "../../../_global/components/InputLabel";
import { Poppins } from "../../../_global/components/Text";
import { TextEditor } from "../../../_global/components/TextEditor";
import { useAssignmentsCreation } from "../../hooks/assignments/useAssignmentsCreation";
import { DatePicker } from "../../../_global/components/DatePicker";

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

const defaultValue: FormState = {
  description: "",
  dueDate: new Date(),
  title: "",
  type: "FILE",
  allowedFile: undefined,
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
  const [form, setForm] = useState<FormState>(defaultValue);

  const mutation = useAssignmentsCreation();

  const handleCreateAssignment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
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
    setForm(defaultValue);
  };

  useEffect(() => {
    if (show && data) setForm(data);
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
          <InputLabel
            title="Title"
            titleSize="sm"
            inputProps={{
              value: form.title,
              onChange: (e) => setForm({ ...form, title: e.target.value }),
            }}
          />
          <div className="flex flex-col gap-2 w-full">
            <Poppins className="text-sm">Due Date</Poppins>
            <DatePicker
              fullWidth={false}
              mode="date"
              placeholder="Pick a date"
              onChange={(e) => setForm({ ...form, dueDate: e as Date })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Poppins className="text-sm">Description</Poppins>
            <TextEditor
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e }))}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Poppins className="text-sm">Allowed File</Poppins>
            <DropdownRevamp
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
            variant={mutation.isPending ? "disabled" : "primary"}
          >
            {mutation.isPending
              ? "Loading..."
              : data
              ? "Update Assignment"
              : "Create Assignment"}
          </Button>
        </form>
      </Drawer>
    </>
  );
};
