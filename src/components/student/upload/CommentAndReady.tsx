import { Label } from "../../common/Label/Label";
import { FileWithMetadata } from "../../../types/File";

export function CommentAndReady({
  fileItem,
  index,
  updateFileComment,
  updateFileReady,
}: {
  fileItem: FileWithMetadata;
  index: number;
  updateFileComment: (idx: number, comment: string) => void;
  updateFileReady: (idx: number, isReady: boolean) => void;
}) {
  return (
    <>
      <div className="mt-4">
        <Label htmlFor={`comment-${index}`} className="text-sm font-medium text-[#333333] mb-1 block">
          Comentario opcional
        </Label>
        <textarea
          id={`comment-${index}`}
          value={fileItem.comment || ''}
          onChange={(e) => updateFileComment(index, e.target.value)}
          className="w-full border border-slate-300 rounded-[8px] p-2 text-sm"
          rows={2}
          placeholder="Agrega un comentario..."
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <input
          id={`ready-${index}`}
          type="checkbox"
          checked={fileItem.isReady || false}
          onChange={(e) => updateFileReady(index, e.target.checked)}
          className="h-4 w-4 text-[#4E81BD] border-[#A0A0A0] rounded"
        />
        <Label htmlFor={`ready-${index}`} className="text-sm text-[#333333]">
          Listo
        </Label>
      </div>
    </>
  );
}