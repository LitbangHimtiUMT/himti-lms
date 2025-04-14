import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../../_global/components/Button";
import { ConditionNode } from "../../../_global/components/ConditionNode";
import { CreateSessionDrawer } from "../drawer/CreateSessionDrawer";

export const CreateSession = () => {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");

  const [show, setShow] = useState<boolean>(false);
  const onHide = () => setShow((prev) => !prev);
  return (
    <>
      <ConditionNode condition={!!classId}>
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
