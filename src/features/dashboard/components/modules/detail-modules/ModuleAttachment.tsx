import { FaFileLines } from "react-icons/fa6";
import { Poppins } from "../../../../_global/components/Text";
import { useDetailModule } from "../../../hooks/modules/useModules";

export const ModuleAttachment = () => {
  const { data: modules } = useDetailModule();
  return (
    <>
      <div
        className="lg:w-80 w-full h-20 rounded-md p-2 border border-solid border-blue-700 overflow-hidden flex items-center justify-between cursor-pointer hover:bg-gray-300 duration-300"
        onClick={() => window.open(modules?.data?.file.url ?? "")}
      >
        <div className="flex items-center gap-2">
          <FaFileLines className="text-gray-600" size={28} />
          <Poppins className="truncate overflow-hidden whitespace-nowrap lg:max-w-[16rem] max-w-[60%] text-sm text-black">
            {modules?.data?.file.fileName || 'Loading...'}
          </Poppins>
        </div>
      </div>
    </>
  );
};
