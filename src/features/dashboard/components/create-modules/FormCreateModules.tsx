import { InputLabel } from "../../../_global/components/InputLabel";
import { Poppins } from "../../../_global/components/Text";
import { TextEditor } from "../../../_global/components/TextEditor";

export const FormCreateModules = () => {
  return (
    <div className="mt-6">
      <form className="flex flex-col gap-4">
        <div className="lg:w-1/2 w-full">
          <InputLabel
            titleSize="sm"
            title="Youtube URL"
            inputProps={{
              inputSize: "md",
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Poppins className="text-sm">File</Poppins>
          <input
            type="file"
            className="file-input"
            accept=".pdf, .ppt, .pptx, .doc, .docx"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Poppins className="text-sm">Content</Poppins>
          <TextEditor onChange={(e) => console.log({ e })} value="" />
        </div>
      </form>
    </div>
  );
};
