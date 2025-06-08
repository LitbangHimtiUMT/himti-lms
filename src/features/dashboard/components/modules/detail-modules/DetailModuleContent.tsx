import { FiArrowRight, FiFileText } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { useDetailModule } from "../../../hooks/modules/useModules";
import { YoutubeEmbed } from "./EmbededYoutube";
import { ModuleAttachment } from "./ModuleAttachment";
import { Skeleton } from "../../../../_global/components/Shimer";

export type SubmissionStatus = "REVIEW" | "APPROVE" | "REJECT";

export interface Submission {
  id: string;
  name: string;
  files: {
    name: string;
    size: number;
    url: string;
  };
  status: SubmissionStatus;
  submittedAt: Date;
  grade?: number;
  feedback?: string;
}

export const DetailModuleContent = () => {
  const { data: modules, isFetching: isFetchingModules } = useDetailModule();
  const { classId, sessionId, moduleId } = useParams();
  const navigate = useNavigate();

  const handleViewAssignment = () => {
    if (modules?.data?.assignment?.id) {
      navigate(
        `/dashboard/${classId}/${sessionId}/${moduleId}/${modules?.data?.assignment?.id}`
      );
    }
  };

  if (isFetchingModules) {
    return (
      <>
        <Skeleton width="100%" height="500px" />
        <Skeleton width="100%" height="300px" />
      </>
    );
  }
  return (
    <>
      <div
        className={`flex flex-col gap-6 mb-6 ${
          isFetchingModules ? "opacity-70" : ""
        }`}
      >
        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="p-6 md:p-8">
            {/* Header with type indicator */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`}
              >
                Learning Material
              </div>
              {modules?.data?.name ||
                (modules?.data?.assignment?.title && (
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {modules?.data?.name}
                  </h2>
                ))}
            </div>

            {/* Content */}
            <div
              className={`prose max-w-none dark:prose-invert 
                prose-base`}
              dangerouslySetInnerHTML={{
                __html: modules?.data?.textModule || "",
              }}
            />
            {/* Tombol View Assignment (hanya muncul jika ini assignment) */}
            <ConditionNode condition={!!modules?.data?.assignment}>
              <div className="mt-6">
                <button
                  onClick={handleViewAssignment}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <FiFileText className="w-5 h-5" />
                  <span>View Assignment Details</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ConditionNode>
          </div>
        </div>

        {/* YouTube Video */}
        <ConditionNode condition={!!modules?.data?.youtubeId}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              Video Content
            </h3>
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <YoutubeEmbed videoId={modules?.data?.youtubeId || ""} />
            </div>
          </div>
        </ConditionNode>

        {/* Attachments */}
        <ConditionNode
          condition={
            !!modules?.data?.file.url &&
            !!modules.data.file.fileName &&
            !isFetchingModules
          }
        >
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Downloadable Materials
            </h3>
            <ModuleAttachment />
          </div>
        </ConditionNode>
      </div>
    </>
  );
};
