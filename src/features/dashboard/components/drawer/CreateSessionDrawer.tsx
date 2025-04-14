import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SessionCreationDTO } from "../../../../core/model/sessions";
import { Button } from "../../../_global/components/Button";
import { Drawer } from "../../../_global/components/Drawer";
import { InputLabel } from "../../../_global/components/InputLabel";
import { useSessionsCreation } from "../../hooks/sessions/useSessions";

interface Props {
  onHide: VoidFunction;
  show: boolean;
}

export const CreateSessionDrawer: React.FC<Props> = ({ onHide, show }) => {
  const mutation = useSessionsCreation();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId") || "";

  const [form, setForm] = useState<SessionCreationDTO>({
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutation.mutateAsync({
      type: "create",
      data: form,
      classId,
    });
    onHide();
    setForm({ name: "" });
  };

  return (
    <>
      <Drawer
        onHide={onHide}
        show={show}
        style={{
          marginTop: "3rem",
        }}
      >
        <form
          className="px-5 flex flex-col items-center gap-3"
          onSubmit={handleSubmit}
        >
          <InputLabel
            title="Session Name"
            titleSize="sm"
            inputProps={{
              onChange: (e) => setForm({ ...form, name: e.target.value }),
            }}
          />
          <Button
            type="submit"
            variant={mutation.isPending ? "disabled" : "primary"}
          >
            {mutation.isPending ? "Loading..." : "Create"}
          </Button>
        </form>
      </Drawer>
    </>
  );
};
