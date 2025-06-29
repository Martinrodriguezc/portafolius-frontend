import React from "react";
import { Star, MessageSquare, User, Clock } from "lucide-react";
import Card from "../../common/Card/Card";
import { EvaluationForm } from "../../../types/evaluation";

interface VideoEvaluationProps {
  evaluation?: EvaluationForm | null;
}

const VideoEvaluation: React.FC<VideoEvaluationProps> = ({ evaluation }) => {
  return (
    <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden sticky top-6">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#4E81BD]" />
          <h3 className="text-[16px] font-semibold text-[#333333]">
            Evaluación del video
          </h3>
        </div>
      </div>
      <div className="p-6">
        {evaluation ? (
          <div className="space-y-6">
            {/* Score */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[#4E81BD]" />
                <span className="text-[15px] font-medium text-[#333333]">
                  Calificación
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#4E81BD] text-white text-[16px] font-bold h-10 w-10 rounded-full flex items-center justify-center">
                  {evaluation.score}
                </div>
                <span className="text-[14px] text-[#666666]">/ 10</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-[#4E81BD] h-2 rounded-full"
                style={{ width: `${(evaluation.score / 10) * 100}%` }}
              ></div>
            </div>

            {/* Feedback */}
            <div className="space-y-3">
              <h4 className="text-[15px] font-medium text-[#333333] flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#4E81BD]" />
                Retroalimentación
              </h4>
              <div className="bg-slate-50 border border-slate-200 rounded-[12px] p-4 text-[14px] text-[#333333] whitespace-pre-wrap">
                {evaluation.feedback_summary ||
                  "No hay retroalimentación disponible."}
              </div>
            </div>

            {/* Evaluator */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-[#4E81BD]/10 h-10 w-10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-[#4E81BD]" />
                </div>
                <div>
                  <p className="text-[13px] text-[#666666]">
                    Evaluado por
                  </p>
                  <p className="text-[14px] font-medium text-[#333333]">
                    {evaluation.teacher_name || "Profesor"}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-[13px] text-[#666666]">Fecha</p>
                  <p className="text-[14px] font-medium text-[#333333]">
                    {evaluation.submitted_at
                      ? new Date(evaluation.submitted_at).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )
                      : "No disponible"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="bg-amber-100 p-3 rounded-full mb-4">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <h4 className="text-[16px] font-medium text-[#333333] mb-2">
              Pendiente de evaluación
            </h4>
            <p className="text-[14px] text-[#666666] max-w-md">
              Este video aún no ha sido evaluado por un profesor. Recibirás una
              notificación cuando esté disponible la retroalimentación.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VideoEvaluation; 