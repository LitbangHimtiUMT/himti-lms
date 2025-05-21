import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../../_global/components/Button";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { CreateSessionDrawer } from "../../drawer/CreateSessionDrawer";
import { useDetailClass } from "../../../../class/hooks/useClasses";
import { useProfile } from "../../../../profile/useProfile";

export const CreateSession = () => {
  const {classId, id} = useParams();
  
  const [show, setShow] = useState<boolean>(false);
  const {data: profile} = useProfile()
  const { data: classess } = useDetailClass();

  const isOwner = profile?.data?.id === classess?.data?.creator?.id
  
  const onHide = () => setShow((prev) => !prev);
  return (
    <>
      <ConditionNode condition={(!!classId || !!id) && isOwner}>
        <div className="cursor-pointer">
          <Button
            onClick={onHide}
            style={{
              cursor: "pointer",
            }}
          >
            Create Session
          </Button>
        </div>
      </ConditionNode>
      <CreateSessionDrawer onHide={onHide} show={show} />
    </>
  );
};
