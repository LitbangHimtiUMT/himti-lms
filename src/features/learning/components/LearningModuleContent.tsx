import React from "react";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { YoutubeEmbed } from "../../dashboard/components/modules/detail-modules/EmbededYoutube";
import { ModuleDTO } from "../../../core/model/modules";
import { AssignmentView } from "../views/AssignmentView";

interface LearningModuleContentProps {
  module: ModuleDTO;
}

export const LearningModuleContent: React.FC<LearningModuleContentProps> = ({
  module,
}) => {
  return (
    <>
      <div className="p-6 pb-48">
        {" "}
        {/* Tambahkan pb-24 untuk spacing di bawah */}
        <h1 className="text-2xl font-bold mb-2">{module.name}</h1>
        <div className="p-3">
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
        </div>
        <ConditionNode condition={!!module?.assignment}>
          <AssignmentView modules={module} />
        </ConditionNode>
      </div>
    </>
  );
};
