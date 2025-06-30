import React from "react";
import { MessageSquare } from "lucide-react";
import Card from "../../common/Card/Card";
import { Interaction } from "../../../types/interaction";

interface VideoCommentsProps {
  interactions: Interaction[];
}

const VideoComments: React.FC<VideoCommentsProps> = ({ interactions }) => {
  const student = interactions.find((i) => i.role === "estudiante");
  const professor = interactions.find((i) => i.role === "profesor");

  return (
    <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#4E81BD]" />
          <h3 className="text-[16px] font-semibold text-[#333333]">Comentarios del estudio</h3>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {student ? (
          <div>
            <h4 className="text-[15px] font-semibold text-[#333333]">Comentario del Estudiante</h4>
            <p className="mt-2 text-[14px] text-[#333333] whitespace-pre-wrap">
              {student.comment}
            </p>
          </div>
        ) : (
          <p className="text-[14px] text-[#666666]">El estudiante no dejó ningún comentario.</p>
        )}

        {student && professor && <div className="border-t border-slate-200 opacity-50" />}

        {professor ? (
          <div>
            <h4 className="text-[15px] font-semibold text-[#333333]">Comentario del Profesor</h4>
            <p className="mt-2 text-[14px] text-[#333333] whitespace-pre-wrap">
              {professor.professorComment}
            </p>
          </div>
        ) : (
          <p className="text-[14px] text-[#666666]">El profesor no ha agregado comentarios aún.</p>
        )}
      </div>
    </Card>
  );
};

export default VideoComments;