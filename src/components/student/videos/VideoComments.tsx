import React from "react";
import { MessageSquare } from "lucide-react";
import Card from "../../common/Card/Card";
import { Interaction } from "../../../types/interaction";

interface VideoCommentsProps {
  interactions: Interaction[];
}

const VideoComments: React.FC<VideoCommentsProps> = ({ interactions }) => {
  return (
    <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#4E81BD]" />
          <h3 className="text-[16px] font-semibold text-[#333333]">Comentarios</h3>
        </div>
      </div>
      <div className="p-6 space-y-2">
        {interactions.length > 0 ? (
          interactions.map((i) => (
            <div key={i.id}>
              <p>
                <strong>{i.role === "estudiante" ? "Estudiante" : "Profesor"}:</strong>{" "}
                {i.role === "estudiante" ? i.comment : i.professorComment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-[14px] text-[#666666]">No hay comentarios.</p>
        )}
      </div>
    </Card>
  );
};

export default VideoComments; 