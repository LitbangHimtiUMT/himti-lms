import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useProfile } from "../../../profile/useProfile";
import { CONFIG_APP } from "../../../../core/configs/app";
import { Poppins } from "../Text";
import DefaultImage from "@core/assets/default-photo.svg";

interface AuthSectionProps {
  direction?: "row" | "column";
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  direction = "row",
}) => {
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
  const { data: profile, isFetching } = useProfile();
  return (
    <>
      {token ? (
        <>
          <div className="flex items-center gap-2">
            <Poppins className="text-xs">
              {profile?.data?.name || "unknown"}
            </Poppins>
            <img
              src={
                !profile?.data?.photo || isFetching
                  ? DefaultImage
                  : profile?.data?.photo
              }
              onError={(e) =>
                ((e.target as HTMLImageElement).src = DefaultImage)
              }
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </div>
        </>
      ) : (
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
      )}
    </>
  );
};
