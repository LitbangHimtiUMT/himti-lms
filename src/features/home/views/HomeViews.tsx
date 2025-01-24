import StaticImage from "../../../core/assets/example-image.svg";
import { Button } from "../../_global/components/Button";
import { Poppins } from "../../_global/components/Text";

export const HomeViews = () => {
  return (
    <>
      <div className="w-full h-[70vh] bg-gradient-to-r from-[#023A6B] to-[#0471D1]">
        <div className="flex items-center relative top-32 px-28">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2">
              <Poppins className="text-[#F1CC14]">#SpiritLearning</Poppins>
              <div className="flex flex-col justify-center gap-4">
                <Poppins className="text-6xl text-white font-semibold">
                  Your Dream Career
                </Poppins>
                <Poppins className="text-6xl text-white font-semibold">
                  Start With Us
                </Poppins>
              </div>
              <Poppins className="text-[#F1CC14] w-[36rem]">
                LMS HIMTI UMT Menyediakan Kelas UI/UX Design,Web
                Development,Cyber Security dan Android Development
              </Poppins>
              <div className="w-36 mt-4">
                <Button rounded="sm" variant="warning">
                  <Poppins className="text-black font-bold">
                    Learning Now
                  </Poppins>
                </Button>
              </div>
            </div>
          </div>
          <img src={StaticImage} width={320} />
        </div>
      </div>
    </>
  );
};
