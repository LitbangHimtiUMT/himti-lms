import { useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { formatTime } from "../../../../_global/lib/format-time";
import { useProfile } from "../../../../profile/useProfile";
import { useDetailModule } from "../../../hooks/modules/useModules";
import { YoutubeEmbed } from "./EmbededYoutube";
import { ModuleAttachment } from "./ModuleAttachment";
import { TableHistorySubmission } from "./TableHistorySubmission";

export type SubmissionStatus = "REVIEWED" | "APPROVED" | "REJECTED";

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
  const { data: profile } = useProfile();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const isAssignment = type === "assignment";
  const isCreator = modules?.data?.createdBy?.id === profile?.data?.id;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);


  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      setFile(files[0]);
      console.log("Files selected:", files);
      // Anda bisa menambahkan state untuk menyimpan file yang dipilih
      // atau langsung menguploadnya ke server
    }
  };

  // const handleSubmitAssignment = () => {
  //   if (newSubmission.files.length === 0) return;

  //   setIsSubmitting(true);

  //   // Simulasi proses upload
  //   setTimeout(() => {
  //     const newHistoryItem: Submission = {
  //       id: Date.now().toString(),
  //       name: `Submission ${submissionHistory.length + 1}`,
  //       files: newSubmission.files.map((file) => ({
  //         name: file.name,
  //         size: file.size,
  //         url: URL.createObjectURL(file),
  //       })),
  //       status: "submitted",
  //       submittedAt: new Date(),
  //     };

  //     setSubmissionHistory((prev) => [newHistoryItem, ...prev]);
  //     setNewSubmission({ files: [] });
  //     setIsSubmitting(false);
  //   }, 1500);
  // };

  // const handleRemoveFile = (index: number) => {
  //   setNewSubmission((prev) => {
  //     const newFiles = [...prev.files];
  //     newFiles.splice(index, 1);
  //     return { ...prev, files: newFiles };
  //   });
  // };

  return (
    // <div className="flex flex-col gap-4 mb-4">
    //   {/* {parse(data?.data?.textModule || "")} */}
    //   <div
    //     dangerouslySetInnerHTML={{
    //       __html:
    //         type === "assignment"
    //           ? modules?.data?.assignment?.description || ''
    //           : modules?.data?.textModule || "",
    //     }}
    //     style={{
    //       padding: "10px",
    //       whiteSpace: "normal", // memastikan teks bisa turun
    //       wordBreak: "break-word", // memaksa teks panjang untuk turun
    //       overflowX: "auto", // jika perlu scroll horizontal (optional)
    //     }}
    //   />

    //   <ConditionNode condition={!!modules?.data?.youtubeId}>
    //     <div className="lg:w-1/2 w-full">
    //       <YoutubeEmbed videoId={modules?.data?.youtubeId || ""} />
    //     </div>
    //   </ConditionNode>

    //   <ConditionNode
    //     condition={
    //       !!modules?.data?.file.url &&
    //       !!modules.data.file.fileName &&
    //       type !== 'assigment' &&
    //       !isFetching
    //     }
    //   >
    //     <ModuleAttachment />
    //   </ConditionNode>
    // </div>
    <>
      <div
        className={`flex flex-col gap-6 mb-6 ${
          isFetchingModules ? "opacity-70" : ""
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple // Hapus ini jika hanya ingin mengizinkan satu file
        />
        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="p-6 md:p-8">
            {/* Header with type indicator */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isAssignment
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                }`}
              >
                {isAssignment ? "Assignment" : "Learning Material"}
              </div>
              {modules?.data?.name ||
                (modules?.data?.assignment?.title && (
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {type === "assignment"
                      ? modules.data?.assignment?.title
                      : modules?.data?.name}
                  </h2>
                ))}
            </div>

            {/* Content */}
            <div
              className={`prose max-w-none dark:prose-invert ${
                isAssignment ? "prose-lg" : "prose-base"
              }`}
              dangerouslySetInnerHTML={{
                __html: isAssignment
                  ? modules?.data?.assignment?.description || ""
                  : modules?.data?.textModule || "",
              }}
            />
          </div>

          {/* Due Date for Assignments */}
          <ConditionNode
            condition={!!(isAssignment && modules?.data?.assignment?.dueDate)}
          >
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-6 py-4">
              <div className="flex items-center gap-2 text-sm">
                <MdDateRange className="text-red-500 text-2xl" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Due Date:
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {formatTime(
                    modules?.data?.assignment?.dueDate as Date,
                    false
                  )}
                </span>
              </div>
            </div>
          </ConditionNode>
        </div>

        {/* YouTube Video */}
        <ConditionNode condition={!!modules?.data?.youtubeId && !isAssignment}>
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
            !isAssignment &&
            !isFetchingModules
          }
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
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

        {/* Assignment Submission */}
        <ConditionNode condition={isAssignment && !isCreator}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 border-2 border-dashed border-gray-300 dark:border-gray-600">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Submit Your Assignment
            </h3>
            <div className="flex flex-col gap-3">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  {file ? file.name : "Upload your assignment files here"}
                </p>
              </div>
              <button
                onClick={handleUploadClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <AiOutlineCloudUpload className="text-2xl text-white" />
                Upload Files
              </button>
            </div>
          </div>
        </ConditionNode>
        <TableHistorySubmission submissions={[]} />
      </div>
    </>
  );
};
