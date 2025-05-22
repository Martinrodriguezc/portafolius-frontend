import { ClipboardList, ArrowLeft } from "lucide-react";
import Button from "../../common/Button/Button";
import { Link } from "react-router-dom";
import type { Video } from "../../../types/VideoTypes";

interface Props { meta: Video | null; }
export default function PageHeader({ meta }: Props) {
  return (
    <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="flex items-start gap-3">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-1">
          <ClipboardList className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-[#333333] mb-1 line-clamp-1">
            {meta ? `Evaluación: ${meta.original_filename}` : "Evaluación de video"}
          </h1>
          <p className="text-[#666666]">
            {meta
              ? `Protocolo: ${meta.protocol} • Subido: ${new Date(meta.upload_date).toLocaleDateString()}`
              : "Cargando información del video..."}
          </p>
        </div>
      </div>
      <Link to={meta ? `/teacher/evaluations/${meta.study_id}/videos/${meta.id}` : "#"}>
        <Button
          variant="outline"
          className="border-slate-300 text-[#333333] hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al video
        </Button>
      </Link>
    </header>
  );
}
