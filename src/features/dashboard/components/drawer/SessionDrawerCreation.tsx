import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SessionCreationDTO } from "../../../../core/model/sessions";
import { Button } from "../../../_global/components/Button";
import { Drawer } from "../../../_global/components/Drawer";
import { InputLabel } from "../../../_global/components/InputLabel";
import { useDetailClass } from "../../../class/hooks/useClasses";
import { useSessionsCreation } from "../../hooks/sessions/useSessions";
import {
  CertificatesIssuedNotice,
  CompletedClassNotice,
  ConfirmContentChangeDialog,
} from "../classes/ClassContentNotices";

interface Props {
  onHide: VoidFunction;
  show: boolean;
  data?: {
    id: string;
    name: string;
  };
}

export const SessionDrawerCreation: React.FC<Props> = ({
  onHide,
  show,
  data,
}) => {
  const mutation = useSessionsCreation();
  const { classId } = useParams();
  const { data: classes } = useDetailClass();
  const isCompleted = !!classes?.data?.completedAt;
  const totalCertificates = classes?.data?.totalCertificates ?? 0;
  const showWarning = !isCompleted && totalCertificates > 0;
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState<SessionCreationDTO>({
    name: data?.name || "",
  });

  const doSubmit = async () => {
    try {
      if (data) {
        await mutation.mutateAsync({
          type: "update",
          data: {
            ...form,
            id: data.id,
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
    } catch {
      // The mutation's onError toast already reports the failure;
      // leave the drawer open so the user can retry.
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCompleted) return;
    if (showWarning) {
      setShowConfirm(true);
      return;
    }
    await doSubmit();
  };
  return (
    <>
      <Drawer
        onHide={() => {
          onHide();
          setForm({ name: "" });
        }}
        close={{
          title: "Back",
        }}
        show={show}
        style={{
          marginTop: "3rem",
        }}
      >
        {show ? (
          <form
            className="px-5 flex flex-col items-center gap-3"
            onSubmit={handleSubmit}
          >
            {isCompleted && <CompletedClassNotice />}
            {showWarning && (
              <CertificatesIssuedNotice totalCertificates={totalCertificates} />
            )}
            <InputLabel
              title="Session Name"
              titleSize="sm"
              inputProps={{
                onChange: (e) => setForm({ ...form, name: e.target.value }),
                value: form?.name || data?.name || "",
                placeholder: 'Session name',
                disabled: isCompleted,
              }}
            />
            <Button
              type="submit"
              variant={
                mutation.isPending || isCompleted ? "disabled" : "primary"
              }
            >
              {mutation.isPending ? "Loading..." : data ? "Update" : "Create"}
            </Button>
          </form>
        ) : null}
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
