import { FaEyeSlash } from "react-icons/fa";
import { Button } from "../../_global/components/Button";
import { InputLabel } from "../../_global/components/InputLabel";

export const FormSignIn = () => {
  return (
    <>
      <div className="lg:mt-24 lg:px-10 py-10 w-full flex items-center justify-center">
        <div className="lg:w-full w-[95%] bg-white h-full p-10 rounded-xl flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col lg:w-[75%] w-full gap-2">
            <h1 className="lg:text-4xl text-xl font-medium">
              Sign In here !
            </h1>
            <h1 className="lg:text-3xl text-lg font-medium">
              Let’s upgrade your skills
            </h1>
          </div>
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="lg:w-[75%] w-full">
              <InputLabel
                title="Email"
                inputProps={{
                  rounded: "full",
                  borderColor: "black",
                  placeholder: "Enter your email",
                  placeholderColor: "normal",
                }}
              />
            </div>
            <div className="lg:w-[75%] w-full ">
              <InputLabel
                title="Password"
                inputProps={{
                  rounded: "full",
                  borderColor: "black",
                  placeholder: "Enter your password",
                  placeholderColor: "normal",
                  RightIcon: <FaEyeSlash size={16} />,
                }}
              />
            </div>
            <div className="lg:w-[75%] w-full">
              <Button rounded="full" size="lg" variant="primary">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
