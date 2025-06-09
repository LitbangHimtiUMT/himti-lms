import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SessionCreationDTO } from "../../../../core/model/sessions";
import { Button } from "../../../_global/components/Button";
import { Drawer } from "../../../_global/components/Drawer";
import { InputLabel } from "../../../_global/components/InputLabel";
import { useSessionsCreation } from "../../hooks/sessions/useSessions";

interface Props {
  onHide: VoidFunction;
  show: boolean;
  data?: {
    id: string;
    name: string;
  }
}

export const SessionDrawerCreation: React.FC<Props> = ({ onHide, show, data }) => {
  const mutation = useSessionsCreation();
  const { classId } = useParams();

  const [form, setForm] = useState<SessionCreationDTO>({
    name: data?.name || "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(data) {
      await mutation.mutateAsync({
        type: "update",
        data: {
          ...form,
          id: data.id
        },
      });
    } else {
      await mutation.mutateAsync({
        type: "create",
        data: form,
        classId,
      });
    }
    onHide();
    setForm({ name: "" });
  };

  return (
    <>
       <Drawer
          onHide={() => {
            onHide();
            setForm({ name: "" });
          }}
          close={{
            title: 'Back'
          }}
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
                value: form?.name || data?.name || '',
              }}
            />
            <Button
              type="submit"
              variant={mutation.isPending ? "disabled" : "primary"}
            >
              {mutation.isPending ? "Loading..." : data? "Update" : "Create"}
            </Button>
          </form>
        </Drawer>
    </>
  );
};
