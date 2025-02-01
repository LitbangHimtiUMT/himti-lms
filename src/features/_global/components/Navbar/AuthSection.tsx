import { Link } from "react-router-dom";
import { Button } from "../Button";

interface AuthSectionProps {
  direction?: "row" | "column";
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  direction = "row",
}) => {
  return (
    <div
      className={`flex gap-4 ${
        direction === "row" ? "flex-row" : "flex-col"
      } lg:flex-nowrap flex-wrap items-center justify-center w-full`}
    >
      <div className="w-28">
        <Link to="/sign-in">
          <Button size="md" rounded="full" variant="secondary">
            Sign In
          </Button>
        </Link>
      </div>
      <div className="w-28">
        <Link to="/sign-up">
          <Button rounded="full">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};
