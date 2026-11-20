import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { Button } from "../../../../_global/components/Button";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { useDetailClass } from "../../../../class/hooks/useClasses";
import { useProfile } from "../../../../profile/useProfile";
import { DrawerStateSession } from "../../../store";
import { SessionDrawerCreation } from "../../drawer/SessionDrawerCreation";

export const CreateSession = () => {
  const { classId, id } = useParams();

  const [show, setShow] = useAtom(DrawerStateSession);
  const { data: profile } = useProfile();
  const { data: classes } = useDetailClass();

  const isOwner = profile?.data?.id === classes?.data?.creator?.id;
  const isCompleted = !!classes?.data?.completedAt;

  const onHide = () => setShow((prev) => ({ ...prev, show: !prev.show }));
  return (
    <>
      {/* The button slot renders only for a confirmed owner: during the
          profile fetch a non-owner would otherwise see a skeleton
          that vanishes with nothing in its place. */}
      <ConditionNode condition={(!!classId || !!id) && isOwner}>
        <div className="cursor-pointer">
          <Button
            variant={isCompleted ? "disabled" : "primary"}
            onClick={onHide}
            style={{
              cursor: "pointer",
            }}
          >
            Create Session
          </Button>
        </div>
      </ConditionNode>
      <SessionDrawerCreation
        data={show.data}
        onHide={() => {
          onHide()
          setShow((prev) => ({ ...prev, data: undefined }))
        }}
        show={show.show}
      />
    </>
  );
};
