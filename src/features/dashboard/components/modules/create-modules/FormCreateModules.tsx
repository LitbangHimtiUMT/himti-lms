import { useState } from "react";
import { toast } from "react-toastify";
import { InputLabel } from "../../../../_global/components/InputLabel";
import { Poppins } from "../../../../_global/components/Text";
import { TextEditor } from "../../../../_global/components/TextEditor";
import {
  UPLOAD_MAX_SIZE,
  validateUploadFile,
} from "../../../../_global/helper/validate-file";
import { ModuleCreationDTO, ModuleDTO } from "../../../../../core/model/modules";
import { Button } from "../../../../_global/components/Button";
import { useModulesCreation } from "../../../hooks/modules/useModules";

interface FormCreateModulesProps {
  data?: ModuleDTO;
}

export const FormCreateModules = ({ data: moduleData }: FormCreateModulesProps = {}) => {
  const isEdit = !!moduleData;
  const [data, setData] = useState<ModuleCreationDTO>({
    name: moduleData?.name ?? "",
    fileModule: undefined,
    textModule: moduleData?.textModule ?? "",
    videoUrl: moduleData?.videoUrl ?? undefined,
  });

  const mutation = useModulesCreation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const error = validateUploadFile(selectedFile, {
      maxSizeBytes: UPLOAD_MAX_SIZE.moduleFile,
      allowedExtensions: [".pdf", ".ppt", ".pptx", ".doc", ".docx"],
    });
    if (error) {
      toast.error(error);
      e.target.value = "";
      return;
    }
    setData((prev) => ({ ...prev, fileModule: selectedFile }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.fileModule) {
      formData.append("fileModule", data.fileModule);
    }
    if (isEdit) {
      formData.append("videoUrl", data.videoUrl || "");
    } else if (data.videoUrl) {
      formData.append("videoUrl", data.videoUrl || "");
    }
    formData.append("textModule", data.textModule || "");
    if (isEdit && moduleData) {
      await mutation.mutateAsync({
        type: "update",
        id: moduleData.id,
        data: formData,
      });
      return;
    }
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
              value: data.name,
              onChange: (e) => setData(prev => ({ ...prev, name: e.target.value })),
            }}
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <InputLabel
            titleSize="sm"
            title="Youtube URL"
            inputProps={{
              inputSize: "md",
              value: data.videoUrl ?? "",
              onChange: (e) => setData(prev => ({ ...prev, videoUrl: e.target.value })),
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Poppins className="text-sm">File</Poppins>
          {isEdit && moduleData?.file?.fileName && (
            <Poppins className="text-sm text-gray-500">
              Current file: {moduleData.file.fileName}. Upload a new file to
              replace it.
            </Poppins>
          )}
          <input
            type="file"
            className="file-input"
            accept=".pdf, .ppt, .pptx, .doc, .docx"
            multiple={false}
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Poppins className="text-sm">Content</Poppins>
          <TextEditor value={data.textModule} onChange={(e) => setData(prev => ({ ...prev, textModule: e }))} />
        </div>
        <Button
          size="lg"
          onClick={handleSubmit}
          variant={mutation.isPending ? "disabled" : "primary"}
        >
          {mutation.isPending ? "Loading..." : isEdit ? "Update Module" : "Create Module"}
        </Button>
      </div>
    </>
  );
};
