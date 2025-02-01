import { Button } from "../Button";
import { Poppins } from "../Text";

interface AuthSectionProps {
  direction?: "row" | "column";
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  direction = "row",
}) => {
  return (
    <div
      className={`flex gap-4 ${direction === "row" ? "flex-row" : "flex-col"} lg:flex-nowrap flex-wrap items-center justify-center w-full`}
    >
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
    </div>
  );
};
