import Button from "../../common/Button/Button";
import { FileUploadRow } from "./FileUploadRow";
import {
  FileVideo,
  Upload,
} from "lucide-react";
import { Label } from "../../common/Label/Label";
import { UploadSectionProps } from "../../../types/Props/Video/UploadSectionProps";

export function UploadSection ({
  files,
  handleFileChange,
  removeFile,
  updateFileProtocol,
  updateFileWindow,
  updateFileFinding,
  updateFileDiagnosis,
  updateFileSubdiagnosis,
  updateFileSubSub,
  updateFileThirdOrder,
  updateFileComment,
  updateFileReady,
}: UploadSectionProps) {

  return (
    <div className="mt-8 mb-8 space-y-6">
      <Label className="text-base sm:text-[15px] font-medium text-[#333333] mb-2 block">
        Archivos de video
      </Label>

      {/* Dropzone */}
      <div className="border-2 border-dashed border-[#A0A0A0] rounded-[12px] p-4 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
        <FileVideo className="h-12 w-12 sm:h-14 sm:w-14 mx-auto text-[#4E81BD] mb-3" />
        <p className="text-sm sm:text-[15px] text-[#333333] mb-4">
          Arrastra y suelta tus archivos de video aquí o haz clic para seleccionarlos
        </p>
        <div className="relative max-w-xs mx-auto">
          <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-sm sm:text-[14px] font-medium py-2.5 sm:py-3 px-4 sm:px-5 rounded-[8px] w-full flex items-center justify-center gap-2 shadow-sm">
            <Upload className="h-4 w-4" /> Seleccionar archivos
          </Button>
          <input
            type="file"
            accept="video/mp4,video/avi,video/quicktime"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-xs sm:text-[12px] text-[#666666] mt-3">
          Formatos soportados: .mp4, .avi, .mov (máx. 50 MB por archivo)
        </p>
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="text-base sm:text-[16px] font-medium text-[#333333]">
              Archivos seleccionados ({files.length})
            </h3>
            {files.length > 1 && (
              <Button variant="ghost" className="text-sm sm:text-[14px] text-[#4E81BD] hover:bg-[#4E81BD]/10">
                Ordenar archivos
              </Button>
            )}
          </div>
          <div className="space-y-4">
            {files.map((fileItem, index) => (
              <FileUploadRow
                key={index}
                fileItem={fileItem}
                index={index}
                updateFileProtocol={updateFileProtocol}
                updateFileWindow={updateFileWindow}
                updateFileFinding={updateFileFinding}
                updateFileDiagnosis={updateFileDiagnosis}
                updateFileSubdiagnosis={updateFileSubdiagnosis}
                updateFileSubSub={updateFileSubSub}
                updateFileThirdOrder={updateFileThirdOrder}
                updateFileComment={updateFileComment}
                updateFileReady={updateFileReady}
                removeFile={removeFile}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};