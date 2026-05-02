import Learning from "@core/assets/learning-assets.jpg";
import { Poppins } from "../../_global/components/Text";
import ClassLayout from "../components/ClassLayout";

export const ClassViews = () => {
  return (
    <div className="-mt-24">
      <div className="relative">
        <img src={Learning} className="w-full h-[600px] object-cover" />
        <div className="absolute z-30 left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex">
          <div className="px-52 flex flex-col gap-6 mt-60 items-center">
            <div className="flex items-center gap-2">
              <Poppins className="text-white text-2xl">Seluruh Kelas </Poppins>
              <Poppins className="text-yellow-600 font-medium text-2xl">
                HIMTI LMS
              </Poppins>
            </div>
            <Poppins className="text-white font-bold text-6xl">
              Explore courses and start your learning journey
            </Poppins>
          </div>
        </div>
      </div>
      <ClassLayout />
    </div>
  );
};
