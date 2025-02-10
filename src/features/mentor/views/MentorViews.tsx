import Learning from "@core/assets/learning-assets.jpg";
import { Poppins } from "../../_global/components/Text";
import MentorGrid from "../components/MentorGrid";

export const MentorViews = () => {
  return (
    <div className="-mt-24">
      <div className="relative">
        <div
          className="w-full h-[60vh] bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${Learning})` }}
        >
          <div className="absolute z-30 left-0 right-0 -top-10 bottom-0 bg-[rgba(0,0,0,0.5)] flex justify-center">
            <div className="px-52 flex flex-col gap-6 mt-60 items-center">
              <div className="flex items-center gap-2">
                <Poppins className="text-yellow-600 font-medium text-2xl">
                  Our Mentor
                </Poppins>
              </div>
              <Poppins className="text-white font-bold text-5xl">
                Meet our mentors and start your learning journey
              </Poppins>
            </div>
          </div>
        </div>
        
      </div>
      <MentorGrid />
    </div>
  );
};
