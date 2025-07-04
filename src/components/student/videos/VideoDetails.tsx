import React from "react";
import { Calendar, FileVideo, Info, User, CheckCircle, Clock } from "lucide-react";
import Card from "../../common/Card/Card";
import { Video } from "../../../types/VideoTypes";

interface VideoDetailsProps {
  meta?: Video | null;
  study?: { title?: string } | null;
  studentName: string;
  hasEvaluation?: boolean;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ meta, study, studentName, hasEvaluation }) => {
  return (
    <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-[#4E81BD]" />
          <h3 className="text-[16px] font-semibold text-[#333333]">
            Detalles del video
          </h3>
        </div>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
                <User className="h-5 w-5 text-[#4E81BD]" />
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#333333] mb-1">
                  Estudiante
                </h4>
                <p className="text-[14px] text-[#666666]">
                  {studentName || "No disponible"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
                <Calendar className="h-5 w-5 text-[#4E81BD]" />
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#333333] mb-1">
                  Fecha de subida
                </h4>
                <p className="text-[14px] text-[#666666]">
                  {meta
                    ? new Date(meta.upload_date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "No disponible"}
                </p>
              </div>
            </div>
          </div>

          {/* Study Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
                <FileVideo className="h-5 w-5 text-[#4E81BD]" />
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#333333] mb-1">
                  Estudio
                </h4>
                <p className="text-[14px] text-[#666666]">
                  {study?.title ?? "No disponible"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
                <div className="h-5 w-5 rounded-full bg-[#4E81BD] flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">
                    P
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#333333] mb-1">
                  Protocolo
                </h4>
                <p className="text-[14px] text-[#666666]">
                  {meta?.protocol.toUpperCase() || "No disponible"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* File Info */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-start gap-3">
            <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
              <Info className="h-5 w-5 text-[#4E81BD]" />
            </div>
            <div className="flex-1">
              <h4 className="text-[15px] font-medium text-[#333333] mb-2">
                Información del archivo
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-[13px] text-[#666666]">
                    Nombre original
                  </p>
                  <p className="text-[14px] text-[#333333] font-medium truncate max-w-[200px]">
                    {meta?.original_filename || "No disponible"}
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-[#666666]">Formato</p>
                  <p className="text-[14px] text-[#333333] font-medium">
                    {meta?.original_filename
                      ? meta.original_filename.split(".").pop()?.toUpperCase()
                      : "No disponible"}
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-[#666666]">Estado</p>
                  <p className="text-[14px] text-[#333333] font-medium flex items-center gap-1">
                    {hasEvaluation ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" /> Evaluado
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 text-amber-500" /> Pendiente
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoDetails; 