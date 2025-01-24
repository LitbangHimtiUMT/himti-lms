import { Button } from "../Button";
import { Poppins } from "../Text";

export const AuthSection = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="warning" rounded="sm">
        <Poppins className="text-black font-semibold">Register</Poppins>
      </Button>
      <Button variant="disabled" rounded="sm" onClick={() => {}}>
        <Poppins className="text-black font-semibold">Login</Poppins>
      </Button>
    </div>
  );
};
