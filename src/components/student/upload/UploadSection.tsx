import React from "react";
import Button from "../../common/Button/Button";
import BaseInput from "../../common/Input/Input";
import { Upload, X } from "lucide-react";

interface UploadSectionProps {
  files: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
}

export function UploadSection({ files, handleFileChange, removeFile }: UploadSectionProps) {
  return (
    <div className="border-2 border-dashed border-[#A0A0A0] rounded-[16px] p-8 text-center">
      <Upload className="mx-auto h-12 w-12 text-[#A0A0A0] mb-4" />
      <h3 className="text-[16px] font-medium mb-2 text-[#333333]">
        Arrastra tus videos aquí o haz clic para seleccionarlos
      </h3>
      <p className="text-[14px] text-[#A0A0A0] mb-4">
        Puedes subir entre 4 y 8 videos en formato .mp4, .avi o .mov
      </p>
      <BaseInput
        type="file"
        accept="video/mp4,video/avi,video/quicktime"
        className="hidden"
        id="video-upload"
        multiple
        onChange={handleFileChange}
      />
      <Button
        asChild
        className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]"
      >
        <label htmlFor="video-upload" className="cursor-pointer">
          Seleccionar Archivos
        </label>
      </Button>

      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-[16px] font-medium text-[#333333]">
            Archivos seleccionados ({files.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {files.map((file, index) => (
              <div key={index} className="bg-[#F4F4F4] rounded-[8px] p-3 flex justify-between items-center">
                <span className="text-[14px] text-[#333333] truncate">{file.name}</span>
                <button onClick={() => removeFile(index)} className="text-[#A0A0A0] hover:text-[#333333]">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}