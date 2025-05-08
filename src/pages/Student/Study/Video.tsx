import { ReturnButton } from "../../../components/common/Button/ReturnButton"
import Card from "../../../components/common/Card/Card"
import VideoPlayer from "../../../components/student/videos/VideoPlayer"
import { useStudentVideoPage } from "../../../hooks/student/Videos/VideoPage/useStudentVideoPage"
import { useStudentStudies } from "../../../hooks/student/Studies/useStudentStudies"
import { authService } from "../../../hooks/auth/authServices"
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  FileVideo,
  Info,
  MessageSquare,
  Star,
  User,
  Video,
} from "lucide-react"

export default function StudentVideoPage() {
  const {
    videoRef,
    url,
    meta,
    evaluation,
    loading,
    error,
    isPlaying,
    progress,
    isFullscreen,
    togglePlay,
    handleSeek,
    toggleFullscreen,
  } = useStudentVideoPage()

  const { studies, loading: studiesLoading } = useStudentStudies()
  const study = studies.find((s) => s.id === meta?.study_id)
  const currentUser = authService.getCurrentUser()
  const studentName = currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : ""

  // Page header component
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
      <ReturnButton />
    </header>
  )

  if (loading || studiesLoading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
            <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin mb-6"></div>
          </div>
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando video</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos preparando tu video y su información. Esto tomará solo un momento.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0 self-center md:self-start">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">No se pudo cargar el video</h2>
              <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                {error.toString() || "Ha ocurrido un error al obtener el video."}
              </p>
              <div className="space-y-2 text-[15px] text-red-600 bg-red-100/50 p-4 rounded-lg inline-block md:block">
                <p className="font-medium">Esto puede deberse a:</p>
                <ul className="list-disc pl-5 space-y-2 text-left">
                  <li>Problemas de conexión a internet</li>
                  <li>El servidor no está disponible en este momento</li>
                  <li>El video no existe o ha sido eliminado</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center md:justify-start">
            <button
              onClick={() => {
                window.location.reload()
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[8px] flex items-center shadow-sm hover:shadow transition-all"
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader />

      <div className="flex flex-col lg:flex-row gap-6 animate-fadeIn">
        {/* Left Column - Video and Details */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Video Player Card */}
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

          {/* Video Details Card */}
          <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-[#4E81BD]" />
                <h3 className="text-[16px] font-semibold text-[#333333]">Detalles del video</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Student Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
                      <User className="h-5 w-5 text-[#4E81BD]" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Estudiante</h4>
                      <p className="text-[14px] text-[#666666]">{studentName || "No disponible"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
                      <Calendar className="h-5 w-5 text-[#4E81BD]" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Fecha de subida</h4>
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
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Estudio</h4>
                      <p className="text-[14px] text-[#666666]">{study?.title ?? "No disponible"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
                      <div className="h-5 w-5 rounded-full bg-[#4E81BD] flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">P</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Protocolo</h4>
                      <p className="text-[14px] text-[#666666]">{meta?.protocol || "No disponible"}</p>
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
                    <h4 className="text-[15px] font-medium text-[#333333] mb-2">Información del archivo</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-[13px] text-[#666666]">Nombre original</p>
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
                <h3 className="text-[16px] font-semibold text-[#333333]">Evaluación del video</h3>
              </div>
            </div>

            <div className="p-6">
              {evaluation ? (
                <div className="space-y-6">
                  {/* Score */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-[#4E81BD]" />
                      <span className="text-[15px] font-medium text-[#333333]">Calificación</span>
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
                      {evaluation.feedback_summary || "No hay retroalimentación disponible."}
                    </div>
                  </div>

                  {/* Evaluator */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#4E81BD]/10 h-10 w-10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-[#4E81BD]" />
                      </div>
                      <div>
                        <p className="text-[13px] text-[#666666]">Evaluado por</p>
                        <p className="text-[14px] font-medium text-[#333333]">
                          {evaluation.teacher_id || "Profesor"}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-[13px] text-[#666666]">Fecha</p>
                        <p className="text-[14px] font-medium text-[#333333]">
                          {evaluation.submitted_at
                            ? new Date(evaluation.submitted_at).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
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
                  <h4 className="text-[16px] font-medium text-[#333333] mb-2">Pendiente de evaluación</h4>
                  <p className="text-[14px] text-[#666666] max-w-md">
                    Este video aún no ha sido evaluado por un profesor. Recibirás una notificación cuando esté
                    disponible la retroalimentación.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
