import { Link } from "react-router-dom"
import Button from "../../../components/common/Button/Button"
import Card from "../../../components/common/Card/Card"
import VideoPlayer from "../../../components/student/videos/VideoPlayer"
import { useVideoPage } from "../../../hooks/video/useVideoPage"
import { ReturnButton } from "../../../components/common/Button/ReturnButton"
import { useAllStudies } from "../../../hooks/teacher/useAllStudies/useAllStudies"
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  FileVideo,
  RefreshCw,
  User,
  Video,
  ClipboardList,
  ArrowRight,
} from "lucide-react"

export default function TeacherVideoPage() {
  const {
    videoRef,
    videoUrl,
    meta,
    loading,
    error,
    isPlaying,
    togglePlay,
    progress,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
  } = useVideoPage()

  const { pending, completed, loading: studiesLoading } = useAllStudies()
  const allStudies = [...pending, ...completed]
  const currentStudy = meta ? allStudies.find((s) => s.study_id === meta.study_id) : undefined

  // Page header component - extracted for reuse in all states
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
          <p className="text-[#666666]">
            {meta
              ? `Subido el: ${new Date(meta.upload_date).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}`
              : "Cargando información del video..."}
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
            Estamos preparando el video y su información. Esto tomará solo un momento.
          </p>
        </div>
      </div>
    )
  }

  if (error || !meta) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0 self-center md:self-start">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">No se pudo cargar el video</h2>
              <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                {error?.toString() || "Ha ocurrido un error al obtener el video."}
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
              <RefreshCw className="h-5 w-5 mr-2 animate-spin-slow" />
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
              src={videoUrl}
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
                <FileVideo className="h-5 w-5 text-[#4E81BD]" />
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
                      <p className="text-[14px] text-[#666666]">
                        {currentStudy ? `${currentStudy.first_name} ${currentStudy.last_name}` : "No disponible"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
                      <Calendar className="h-5 w-5 text-[#4E81BD]" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Fecha de subida</h4>
                      <p className="text-[14px] text-[#666666]">
                        {new Date(meta.upload_date).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Study Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
                      <ClipboardList className="h-5 w-5 text-[#4E81BD]" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Estudio</h4>
                      <p className="text-[14px] text-[#666666]">{currentStudy?.title ?? "No disponible"}</p>
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
                      <p className="text-[14px] text-[#666666]">{meta.protocol || "No disponible"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Info */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-0.5 shrink-0">
                    <FileVideo className="h-5 w-5 text-[#4E81BD]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[15px] font-medium text-[#333333] mb-2">Información del archivo</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-[13px] text-[#666666]">Nombre original</p>
                        <p className="text-[14px] text-[#333333] font-medium truncate max-w-[200px]">
                          {meta.original_filename}
                        </p>
                      </div>
                      <div>
                        <p className="text-[13px] text-[#666666]">Formato</p>
                        <p className="text-[14px] text-[#333333] font-medium">
                          {meta.original_filename.split(".").pop()?.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[13px] text-[#666666]">Estado</p>
                        <p className="text-[14px] text-[#333333] font-medium flex items-center gap-1">
                          {meta.status === "EVALUADO" ? (
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
                <ClipboardList className="h-5 w-5 text-[#4E81BD]" />
                <h3 className="text-[16px] font-semibold text-[#333333]">Formulario de evaluación</h3>
              </div>
            </div>

            <div className="p-6">
              {meta.status === "EVALUADO" ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="bg-green-100 p-4 rounded-full">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-[16px] font-medium text-[#333333] mb-2">Video ya evaluado</h4>
                    <p className="text-[14px] text-[#666666] mb-6">
                      Este video ya ha sido evaluado. Puedes ver los detalles de la evaluación o modificarla si es
                      necesario.
                    </p>
                  </div>
                  <Link to={`/teacher/evaluations/${meta.study_id}/videos/${meta.id}/evaluate`}>
                    <Button className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2">
                      Ver evaluación
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="bg-amber-100 p-4 rounded-full">
                      <Clock className="h-10 w-10 text-amber-500" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-[16px] font-medium text-[#333333] mb-2">Pendiente de evaluación</h4>
                    <p className="text-[14px] text-[#666666] mb-6">
                      Este video aún no ha sido evaluado. Completa el formulario de evaluación para proporcionar
                      retroalimentación al estudiante.
                    </p>
                  </div>
                  <Link to={`/teacher/evaluations/${meta.study_id}/videos/${meta.id}/evaluate`}>
                    <Button className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2">
                      Ir a evaluar
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
