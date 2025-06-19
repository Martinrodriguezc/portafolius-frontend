import Button from "../../common/Button/Button";
import { FileVideo, Trash2 } from "lucide-react";
import { FileWithMetadata } from "../../../types/File";

export function FileRowHeader({
  fileItem,
  index,
  removeFile,
}: {
  fileItem: FileWithMetadata;
  index: number;
  removeFile: (idx: number) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50 p-3 sm:p-4 border-b border-slate-200 gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="bg-[#4E81BD]/10 p-2 rounded-md flex-shrink-0">
          <FileVideo className="h-5 w-5 text-[#4E81BD]" />
        </div>
        <div className="min-w-0">
          <span className="text-sm sm:text-[15px] font-medium text-[#333333] block truncate">
            {fileItem.file.name}
          </span>
          <span className="text-xs sm:text-[12px] text-[#666666]">
            {(fileItem.file.size / (1024 * 1024)).toFixed(2)} MB
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={() => removeFile(index)}
        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full flex-shrink-0"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}