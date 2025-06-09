import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { Button } from "../../../../_global/components/Button";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { useDetailClass } from "../../../../class/hooks/useClasses";
import { useProfile } from "../../../../profile/useProfile";
import { DrawerStateSession } from "../../../store";
import { SessionDrawerCreation } from "../../drawer/SessionDrawerCreation";

export const CreateSession = () => {
  const {classId, id} = useParams();
  
  const [show, setShow] = useAtom(DrawerStateSession);
  const {data: profile} = useProfile()
  const { data: classess } = useDetailClass();

  const isOwner = profile?.data?.id === classess?.data?.creator?.id
  
  const onHide = () => setShow((prev) => ({...prev, show: !prev.show}));
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
      <SessionDrawerCreation data={show.data} onHide={onHide} show={show.show}  />
    </>
  );
};
