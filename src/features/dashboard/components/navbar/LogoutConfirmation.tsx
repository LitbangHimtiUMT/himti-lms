import React from "react";
import { Dialog } from "../../../_global/components/Dialog";
import { IoWarning } from "react-icons/io5";
import { Poppins } from "../../../_global/components/Text";
import { Button } from "../../../_global/components/Button";
import { CONFIG_APP } from "../../../../core/configs/app";
import { useNavigate } from "react-router-dom";
import { ConditionNode } from "../../../_global/components/ConditionNode";

interface LogoutConfirmationProps {
  show: boolean;
  onHide: VoidFunction;
}

export const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({
  onHide,
  show,
}) => {
  const navigate = useNavigate();
  const handleConfirmLogout = () => {
    onHide();
    localStorage.removeItem(CONFIG_APP.TOKEN_KEY);
    localStorage.removeItem(CONFIG_APP.REFRESH_TOKEN_KEY);
    navigate("/");
  };

  return (
    <ConditionNode condition={show}>
      <Dialog onHide={onHide} show={show}>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <IoWarning className="text-2xl text-red-600" />
            <Poppins className="text-md font-medium text-black">
              Logout Confirmation
            </Poppins>
          </div>
          <div>
            <Poppins className="text-sm text-black">
              Are you sure you want to log out? Logging out will end your
              current session and you may need to sign in again to access.
              Please make sure you have saved all your work before proceeding.
            </Poppins>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4">
              <Button variant="secondary" onClick={onHide}>
                <Poppins>Cancel</Poppins>
              </Button>
              <Button variant="danger" onClick={handleConfirmLogout}>
                <Poppins>Yes</Poppins>
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </ConditionNode>
  );
};
