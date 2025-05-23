import Card from "../../common/Card/Card";
import { CheckCircle, Star, User } from "lucide-react";
import type { EvaluationForm } from "../../../types/evaluation";

interface Props { existing: EvaluationForm; }
export default function ExistingEvaluationCard({ existing }: Props) {
  return (
    <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 border-b border-green-200">
        <h3 className="flex items-center gap-2 text-[16px] font-semibold text-[#333333]">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Evaluación existente
        </h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500 fill-current" />
            <span className="font-medium">Calificación</span>
          </div>
          <div className="bg-[#4E81BD] text-white text-[16px] font-bold h-10 w-10 rounded-full flex items-center justify-center">
            {existing.score}
          </div>
        </div>
        <div>
          <h4 className="text-[15px] font-medium text-[#333333] mb-2">
            Retroalimentación
          </h4>
          <div className="bg-slate-50 border border-slate-200 rounded-[12px] p-4 whitespace-pre-wrap text-[14px] text-[#333333]">
            {existing.feedback_summary || "No hay retroalimentación disponible."}
          </div>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div className="bg-[#4E81BD]/10 h-10 w-10 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-[#4E81BD]" />
          </div>
          <div>
            <p className="text-[13px] text-[#666666]">Evaluado por</p>
            <p className="text-[14px] font-medium text-[#333333]">
              {existing.teacher_name}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[13px] text-[#666666]">Fecha</p>
            <p className="text-[14px] font-medium text-[#333333]">
              {new Date(existing.submitted_at).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
