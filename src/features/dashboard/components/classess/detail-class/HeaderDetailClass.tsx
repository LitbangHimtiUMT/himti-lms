import { useState } from "react";
import { Button } from "../../../../_global/components/Button";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { Skeleton } from "../../../../_global/components/Shimer";
import { useDetailClass } from "../../../../class/hooks/useClasses";
import { useProfile } from "../../../../profile/useProfile";
import { DrawerParticipants } from "../../drawer/DrawerParticipants";
import { Poppins } from "../../../../_global/components/Text";
import { DrawerMentorClass } from "../../drawer/DrawerMentorClass";

export const HeaderDetailClass = () => {
  const { isFetching } = useProfile();
  const { data: classess } = useDetailClass();
  const [show, setShow] = useState({
    participant: false,
    mentor: false
  });
  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between w-full gap-4">
        <Poppins className="text-2xl font-bold">Detail Class</Poppins>
        <div className="flex md:flex-row flex-col gap-4">
          <div className="md:w-48 w-full">
            <ConditionNode
              condition={!isFetching}
              option={<Skeleton width="100%" height="2rem" />}
            >
              <Button variant="success" onClick={() => setShow((prev) => ({...prev,  mentor: !prev.mentor}))}>
                View Mentors
              </Button>
            </ConditionNode>
          </div>
          <div className="md:w-48 w-full">
            <ConditionNode
              condition={!isFetching}
              option={<Skeleton width="100%" height="2rem" />}
            >
              <Button onClick={() => setShow((prev) => ({...prev,  participant: !prev.participant}))}>
                View Participants
              </Button>
            </ConditionNode>
          </div>
        </div>
      </div>
      <DrawerParticipants
        classId={classess?.data?.id || ""}
        onHide={() => setShow((prev) => ({...prev,  participant: !prev.participant}))}
        show={show.participant}
        title={`List Participant`}
      />
      <DrawerMentorClass
        onHide={() => setShow((prev) => ({...prev,  mentor: !prev.mentor}))}
        show={show.mentor}
        title={`List Mentor`}
      />
    </>
  );
};
