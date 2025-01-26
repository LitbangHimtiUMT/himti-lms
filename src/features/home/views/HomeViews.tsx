import Learning from "@core/assets/learning-assets.jpg";
import { Poppins } from "../../_global/components/Text";
import { CategoriesList } from "../components/CategoriesList";

export const HomeViews = () => {
  return (
    <div className="-mt-24">
      <div className="relative">
        <img src={Learning} className="w-full h-[150vh]" />
        <div className="absolute z-30 left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex">
          <div className="px-52 flex flex-col gap-6 mt-60">
            <div className="flex items-center gap-2">
              <Poppins className="text-white text-2xl">
                Welcome to{" "}
              </Poppins>
              <Poppins className="text-yellow-600 font-medium text-2xl">
                HIMTI LMS
              </Poppins>
            </div>
            <Poppins className="text-white font-bold text-6xl">
              Explore courses and start your learning journey
            </Poppins>
            <Poppins className="text-white max-w-[40rem]">
              Come on, make every day an opportunity to learn something new.
              With us, discover knowledge, achieve dreams, and make real changes
              in your life. Because this world is a big classroom, and every day
              is a new lesson waiting for you.
            </Poppins>
          </div>
        </div>
      </div>
      <CategoriesList />
    </div>
  );
};
