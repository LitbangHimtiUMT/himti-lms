import React from "react";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { YoutubeEmbed } from "../../dashboard/components/modules/detail-modules/EmbededYoutube";
import { ModuleDTO } from "../../../core/model/modules";
import { AssignmentView } from "../views/AssignmentView";
import { ModuleAttachment } from "../../dashboard/components/modules/detail-modules/ModuleAttachment";
import { IoDocument } from "react-icons/io5";

interface LearningModuleContentProps {
  module: ModuleDTO;
}

export const LearningModuleContent: React.FC<LearningModuleContentProps> = ({
  module,
}) => {
  return (
    <>
      <div className="md:p-6 p-4 pb-48">
        {" "}
        <h1 className="text-2xl font-bold mb-2">{module.name}</h1>
        <div className="md:p-3 p-0">
          <ConditionNode condition={!!module.youtubeId}>
            <div>
              <YoutubeEmbed videoId={module?.youtubeId || ""} />
            </div>
          </ConditionNode>
          <div
            className={`prose max-w-none dark:prose-invert prose-base mt-4`}
            dangerouslySetInnerHTML={{
              __html: module?.textModule || "",
            }}
          />
          <ConditionNode
            condition={!!module?.file.url && !!module.file.fileName}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 border border-gray-100 mt-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <IoDocument size={20} />
                </div>
                <span>Material File</span>
              </h3>
              <div className="mt-2">
                <ModuleAttachment />
              </div>
            </div>
          </ConditionNode>
        </div>
        <ConditionNode condition={!!module?.assignment}>
          <AssignmentView modules={module} />
        </ConditionNode>
      </div>
    </>
  );
};
