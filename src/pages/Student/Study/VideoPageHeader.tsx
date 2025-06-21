import React from "react";
import { Calendar, Video } from "lucide-react";
import ReturnButton from "../../../components/common/Button/ReturnButton";
import { Video as VideoType } from "../../../types/VideoTypes";

interface PageHeaderProps {
  meta?: VideoType | null;
  studyId?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ meta, studyId }) => (
  <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
    <div className="flex items-start gap-3">
      <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-1">
        <Video className="h-6 w-6 text-[#4E81BD]" />
      </div>
      <div>
        <h1 className="text-[24px] font-bold text-[#333333] mb-1 line-clamp-1">
          {meta?.original_filename || "Detalle del video"}
        </h1>
        <p className="text-[#666666] flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#4E81BD]" />
          Subido el:{" "}
          {meta
            ? new Date(meta.upload_date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            : ""}
        </p>
      </div>
    </div>
    <ReturnButton to={`/student/studies/${studyId}/videos`} />
  </header>
);