import Learning from "@core/assets/learning-assets.jpg";
import { Poppins } from "../../_global/components/Text";
import FaqComponent from "../components/FaqComponent";

export const FaqViews = () => {
  return (
    <div className="-mt-24">
      <div className="relative">
        <img src={Learning} className="w-full h-[45vh] object-cover" />
        <div className="absolute z-30 left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex justify-center">
          <div className="px-52 flex flex-col gap-6 mt-60 items-center">
            <div className="flex items-center gap-2">
              <Poppins className="text-yellow-600 font-medium text-2xl">
                FAQ
              </Poppins>
            </div>
            <Poppins className="text-white font-bold text-6xl">
              Frequently Asked Questions
            </Poppins>
          </div>
        </div>
      </div>
      <FaqComponent />
    </div>
  );
};
