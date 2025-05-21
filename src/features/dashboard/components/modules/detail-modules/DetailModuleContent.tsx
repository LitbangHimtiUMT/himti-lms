import { useSearchParams } from "react-router-dom";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { useDetailModule } from "../../../hooks/modules/useModules";
import { YoutubeEmbed } from "./EmbededYoutube";
import { ModuleAttachment } from "./ModuleAttachment";

export const DetailModuleContent = () => {
  const { data: modules, isFetching } = useDetailModule();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* {parse(data?.data?.textModule || "")} */}
      <div
        dangerouslySetInnerHTML={{
          __html:
            type === "assignment"
              ? modules?.data?.assignment?.description || ''
              : modules?.data?.textModule || "",
        }}
        style={{
          padding: "10px",
          whiteSpace: "normal", // memastikan teks bisa turun
          wordBreak: "break-word", // memaksa teks panjang untuk turun
          overflowX: "auto", // jika perlu scroll horizontal (optional)
        }}
      />

      <ConditionNode condition={!!modules?.data?.youtubeId}>
        <div className="lg:w-1/2 w-full">
          <YoutubeEmbed videoId={modules?.data?.youtubeId || ""} />
        </div>
      </ConditionNode>

      <ConditionNode
        condition={
          !!modules?.data?.file.url &&
          !!modules.data.file.fileName &&
          !isFetching
        }
      >
        <ModuleAttachment />
      </ConditionNode>
    </div>
  );
};
