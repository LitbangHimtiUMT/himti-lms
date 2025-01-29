import { Button } from "../Button";
import { Poppins } from "../Text";

export const AuthSection = () => {
  return (
    <>
      <div className="w-28">
        <Button size="md" rounded="full" variant="warning">
          <Poppins className="text-black font-medium">Sign In</Poppins>
        </Button>
      </div>
      <div className="w-28">
        <Button rounded="full">
          <Poppins className="text-white font-medium">Sign Up</Poppins>
        </Button>
      </div>
    </>
  );
};
