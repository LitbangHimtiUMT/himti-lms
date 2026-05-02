import { FaFileAlt, FaFileDownload } from "react-icons/fa";
import { Poppins } from "../../../../_global/components/Text";
import { useDetailModule } from "../../../hooks/modules/useModules";
import { Skeleton } from "../../../../_global/components/Shimer";

export const ModuleAttachment = () => {
  const { data: modules, isFetching } = useDetailModule();
  if (isFetching) return <Skeleton width="100%" height="6rem" />;
  return (
    <div className="group relative">
      <div
        className="w-full h-24 rounded-lg p-4 border-2 border-dashed border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden flex items-center justify-between cursor-pointer hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
        onClick={() => window.open(modules?.data?.file.url ?? "")}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-white shadow-sm hover:bg-blue-50 transition-colors">
            <FaFileAlt className="text-gray-500" size={24} />
          </div>
          <div>
            <Poppins className="font-medium text-gray-800 truncate max-w-[180px] md:max-w-[240px]">
              {modules?.data?.file.fileName || "Loading..."}
            </Poppins>
            <Poppins className="text-xs text-gray-500 mt-1">
              Click to download
            </Poppins>
          </div>
        </div>
        <div className="p-2 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
          <FaFileDownload size={18} />
        </div>
      </div>

      {/* Optional: Add a subtle animation on hover */}
      <div className="absolute inset-0 rounded-lg bg-blue-200 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
    </div>
  );
};
