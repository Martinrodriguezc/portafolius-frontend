import type React from "react"

import Card from "../../components/common/Card/Card"
import Button from "../../components/common/Button/Button"
import { Textarea } from "../../components/common/Textarea/Textarea"
import VideoPlayer from "../../components/student/videos/VideoPlayer"
import { useTeacherEvaluateVideo } from "../../hooks/teacher/evaluations/useTeacherEvaluateVideo/useTeacherEvaluateVideo"
import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies"
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  ClipboardList,
  FileVideo,
  RefreshCw,
  Star,
  User,
  Video,
} from "lucide-react"
import { Link } from "react-router-dom"

interface ExistingEvaluation {
  id: number
  study_id: number
  teacher_id: number
  submitted_at: string
  score: number
  feedback_summary: string
  created_at: string
  protocol: string
  title: string
  student_first_name: string
  student_last_name: string
  teacher_name: string
}

const TeacherEvaluateVideoPage: React.FC = () => {
  const {
    videoRef,
    url,
    meta,
    existing,
    loading,
    error,
    score,
    feedback,
    setScore,
    setFeedback,
    submitting,
    isPlaying,
    progress,
    isFullscreen,
    togglePlay,
    handleSeek,
    toggleFullscreen,
    onSubmit,
  } = useTeacherEvaluateVideo()

  const { pending, completed } = useAllStudies()
  const allStudies = [...pending, ...completed]
  const currentStudy = meta ? allStudies.find((s) => s.study_id === meta.study_id) : undefined

  // Page header component - extracted for reuse in all states
  const PageHeader = () => (
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
  )

  if (loading || !meta) {
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
            Estamos preparando el video y el formulario de evaluación. Esto tomará solo un momento.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
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
        {/* Video y Detalles del estudio */}
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
                      <Video className="h-5 w-5 text-[#4E81BD]" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Archivo</h4>
                      <p className="text-[14px] text-[#666666]">{meta.original_filename}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Formulario y Evaluación existente */}
        <div className="w-full lg:w-1/3 space-y-6">
          <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[#4E81BD]" />
                <h3 className="text-[16px] font-semibold text-[#333333]">
                  {existing ? "Actualizar evaluación" : "Nueva evaluación"}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <label className="block text-[15px] font-medium text-[#333333]">Calificación (1–10):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={score === 0 ? "" : score}
                    onChange={(e) => {
                      const val = e.target.value
                      const num = Number(val)
                      if (val === "") {
                        setScore(0)
                      } else if (!isNaN(num) && num >= 1 && num <= 10) {
                        setScore(num)
                      }
                    }}
                    placeholder="Ingresa una nota del 1 al 10"
                    className="w-full px-3 py-2 border border-slate-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                  />
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="font-medium">/10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <label className="block text-[15px] font-medium text-[#333333]">Retroalimentación:</label>
                <Textarea
                  placeholder="Proporciona retroalimentación detallada sobre el video..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full min-h-[200px] text-[14px] border-slate-300 rounded-[8px] placeholder:text-slate-400 focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                />
              </div>

              <Button
                onClick={onSubmit}
                disabled={submitting || score < 1 || !feedback.trim()}
                className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    {existing ? "Actualizando..." : "Enviando..."}
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    {existing ? "Actualizar evaluación" : "Enviar evaluación"}
                  </>
                )}
              </Button>
            </div>
          </Card>

          {existing && (
            <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 border-b border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-[16px] font-semibold text-[#333333]">Evaluación existente</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500 fill-current" />
                    <span className="text-[15px] font-medium text-[#333333]">Calificación</span>
                  </div>
                  <div className="bg-[#4E81BD] text-white text-[16px] font-bold h-10 w-10 rounded-full flex items-center justify-center">
                    {(existing as ExistingEvaluation).score}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="text-[15px] font-medium text-[#333333]">Retroalimentación</h4>
                  <div className="bg-slate-50 border border-slate-200 rounded-[12px] p-4 text-[14px] text-[#333333] whitespace-pre-wrap">
                    {(existing as ExistingEvaluation).feedback_summary || "No hay retroalimentación disponible."}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#4E81BD]/10 h-10 w-10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-[#4E81BD]" />
                    </div>
                    <div>
                      <p className="text-[13px] text-[#666666]">Evaluado por</p>
                      <p className="text-[14px] font-medium text-[#333333]">
                        {(existing as ExistingEvaluation).teacher_name || "Profesor"}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-[13px] text-[#666666]">Fecha</p>
                      <p className="text-[14px] font-medium text-[#333333]">
                        {new Date((existing as ExistingEvaluation).submitted_at).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeacherEvaluateVideoPage
