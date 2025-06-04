import React, { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Poppins } from "../Text";
import { bytesToMB } from "../../utils/byteToMB";

interface UploadFileProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file?: File | null;
  extensions?: string[];
}

export const UploadFile: React.FC<UploadFileProps> = ({
  onChange,
  file,
  extensions,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleBrowseClick = () => fileInputRef.current?.click();

  const allowedExtensions = (extensions || [])
    .map((ext) => `${ext.trim()}`)
    .join(",");
  return (
    <>
      <div className="mb-6">
        <label className="block text-gray-700 mb-3 font-medium">
          Upload Files
        </label>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
          onClick={handleBrowseClick}
        >
          {file ? (
            <div className="space-y-3">
              <FaCloudUploadAlt size={48} className="mx-auto text-blue-400" />
              <p className="font-medium">File Selected</p>
              <Poppins>
                {file.name} - {bytesToMB(file.size)} MB
              </Poppins>
            </div>
          ) : (
            <>
              <FaCloudUploadAlt
                size={48}
                className="mx-auto text-gray-400 mb-3"
              />
              <p className="text-gray-600 mb-1">Drag and drop files here</p>
              <p className="text-sm text-gray-500">or click to browse</p>
              <p className="text-xs text-gray-400 mt-3">
                Allowed: {allowedExtensions || "Any"} | Max size: 10MB
              </p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept={allowedExtensions}
          ref={fileInputRef}
          onChange={onChange}
        />
      </div>
    </>
  );
};
