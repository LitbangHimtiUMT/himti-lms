import { useState } from "react";
import { InputLabel } from "../../../_global/components/InputLabel";
import { Poppins } from "../../../_global/components/Text";
import { TextEditor } from "../../../_global/components/TextEditor";
import { ModuleCreationDTO } from "../../../../core/model/modules";
import { Button } from "../../../_global/components/Button";
import { useModulesCreation } from "../../hooks/modules/useModules";

export const FormCreateModules = () => {
  const [data, setData] = useState<ModuleCreationDTO>({
    name: "",
    fileModule: undefined,
    textModule: "",
    videoUrl: undefined,
  });

  const mutation = useModulesCreation();
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.fileModule) {
      formData.append("fileModule", data.fileModule);
    }
    if (data.videoUrl) {
      formData.append("videoUrl", data.videoUrl || "");
    }
    formData.append("textModule", data.textModule || "");
    await mutation.mutateAsync({
      type: "create",
      data: formData,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="lg:w-1/2 w-full">
          <InputLabel
            titleSize="sm"
            title="Module Name"
            inputProps={{
              inputSize: "md",
              onChange: (e) => setData({ ...data, name: e.target.value }),
            }}
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <InputLabel
            titleSize="sm"
            title="Youtube URL"
            inputProps={{
              inputSize: "md",
              onChange: (e) => setData({ ...data, videoUrl: e.target.value }),
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Poppins className="text-sm">File</Poppins>
          <input
            type="file"
            className="file-input"
            accept=".pdf, .ppt, .pptx, .doc, .docx"
            multiple={false}
            onChange={(e) =>
              setData({
                ...data,
                fileModule: e.target.files?.[0] as File,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Poppins className="text-sm">Content</Poppins>
          <TextEditor onChange={(e) => setData({ ...data, textModule: e })} />
        </div>
        <Button
          size="lg"
          onClick={handleSubmit}
          variant={mutation.isPending ? "disabled" : "primary"}
        >
          {mutation.isPending ? "Loading..." : "Create Module"}
        </Button>
      </div>
    </>
  );
};

{
  /* <div className="flex items-center gap-2 mt-4 mb-4">
<Poppins className="text-sm w-1/5">Assignment</Poppins>
<div className="flex items-center gap-2">
  <input
    type="checkbox"
    defaultChecked
    className="checkbox rounded-md w-[1.25rem] h-[1.25rem]"
  />
  <Poppins className="text-sm">Include</Poppins>
</div>
</div>
<div className="flex flex-col gap-2 lg:w-1/2 w-full">
<Poppins className="text-sm w-1/5">Due Date</Poppins>
<DatePicker
  animate
  mode="single"
  onDayClick={(e) => console.log({ e })}
/>
</div> */
}
