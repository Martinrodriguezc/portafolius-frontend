import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../../../components/common/Card/Card";
import VideoPlayer from "../../../components/student/videos/VideoPlayer";
import { useStudentVideoPage } from "../../../hooks/student/Videos/VideoPage/useStudentVideoPage";
import { useStudentStudies } from "../../../hooks/student/Studies/useStudentStudies";
import { authService } from "../../../hooks/auth/authServices";
import {
  Calendar,
  CheckCircle,
  Clock,
  FileVideo,
  Info,
  MessageSquare,
  Star,
  User,
  Video,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useStudyVideos } from "../../../hooks/student/Videos/useStudyVideos";
import VideoCarousel from "../../../components/common/Carousel/VideoCarousel";
import ReturnButton from "../../../components/common/Button/ReturnButton";

export default function StudentVideoPage() {
  const { studyId } = useParams<{ studyId: string }>();
  const { videos } = useStudyVideos(studyId)

  const {
    videoRef,
    url,
    meta,
    evaluation,
    loading,
    error,
    isPlaying,
    progress,
    togglePlay,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
  } = useStudentVideoPage();

  const { studies, loading: studiesLoading } = useStudentStudies();
  const study = studies.find((s) => s.id === meta?.study_id);
  const currentUser = authService.getCurrentUser();
  const studentName = currentUser
    ? `${currentUser.first_name} ${currentUser.last_name}`
    : "";

  const PageHeader = () => (
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


  if (loading || studiesLoading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />
      </div>
    );
  }
  console.log(studyId)
  console.log(videos)

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader />

      <div className="flex flex-col lg:flex-row gap-6 animate-fadeIn">
        <div className="w-full lg:w-2/3 space-y-6">
          <Card className="rounded-[16px] overflow-hidden border border-slate-200 shadow-sm">
            <VideoPlayer
              src={url}
              videoRef={videoRef}
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              progress={progress}
              handleSeek={handleSeek}
              isFullscreen={isFullscreen}
              toggleFullscreen={toggleFullscreen}
            />
          </Card>

          {videos.length > 1 && (
            <VideoCarousel videos={videos} studyId={studyId!} teacher={false}/>
          )}

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
                        {meta?.protocol || "No disponible"}
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
                          {evaluation ? (
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
        </div>

        {/* Right Column - Evaluation */}
        <div className="w-full lg:w-1/3">
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
                          {evaluation.teacher_id || "Profesor"}
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
        </div>
      </div>
    </div>
  );
}
