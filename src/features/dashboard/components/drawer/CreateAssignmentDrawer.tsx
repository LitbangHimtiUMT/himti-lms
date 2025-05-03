import React, { useState } from "react";
import { Button } from "../../../_global/components/Button";
import { DatePicker } from "../../../_global/components/Date";
import { Drawer } from "../../../_global/components/Drawer";
import { DropdownRevamp } from "../../../_global/components/Dropdown/DropdownRevamp";
import { InputLabel } from "../../../_global/components/InputLabel";
import { Poppins } from "../../../_global/components/Text";
import { TextEditor } from "../../../_global/components/TextEditor";
import { useAssignmentsCreation } from "../../hooks/assignments/useAssignmentsCreation";

interface Props {
  onHide: VoidFunction;
  show: boolean;
  moduleId: string;
}

interface FormState {
  title: string;
  dueDate: Date;
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

export const CreateAssignmentDrawer: React.FC<Props> = ({
  onHide,
  show,
  moduleId,
}) => {
  const [form, setForm] = useState<FormState>(defaultValue);

  const mutation = useAssignmentsCreation();

  const handleCreateAssignment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await mutation.mutateAsync({
      type: "create",
      data: {
        ...form,
        allowedFile: form.type === "URL" ? undefined : form.allowedFile,
      },
      moduleId,
    });
    onHide();
    setForm(defaultValue);
  };
  return (
    <>
      <Drawer
        onHide={onHide}
        show={!!(show && moduleId)}
        style={{
          marginTop: "3rem",
          minWidth: "600px",
          paddingBottom: "3rem",
        }}
      >
        <Poppins className="text-left text-lg px-5 mb-5 font-semibold">
          Create Assignment
        </Poppins>
        <form
          className="px-5 flex flex-col items-center gap-3"
          onSubmit={handleCreateAssignment}
        >
          <InputLabel
            title="Title"
            titleSize="sm"
            inputProps={{
              onChange: (e) => setForm({ ...form, title: e.target.value }),
            }}
          />
          <div className="flex flex-col gap-2 w-full">
            <Poppins className="text-sm">Due Date</Poppins>
            <DatePicker
              animate
              mode="single"
              onDayClick={(e) =>
                setForm((prev) => ({ ...prev, dueDate: new Date(e) }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Poppins className="text-sm">Description</Poppins>
            <TextEditor
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
                  type: e.value === "url" ? "URL" : "FILE",
                }))
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
                  label: "URL",
                  value: "url",
                },
              ]}
            />
          </div>

          <Button
            type="submit"
            variant={mutation.isPending ? "disabled" : "primary"}
          >
            {mutation.isPending ? "Loading..." : "Create Assignment"}
          </Button>
        </form>
      </Drawer>
    </>
  );
};
