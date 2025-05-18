import { useState } from "react"
import { useStudyVideos } from "../../../hooks/student/Videos/useStudyVideos"
import Card from "../../../components/common/Card/Card"
import Button from "../../../components/common/Button/Button"
import { Link } from "react-router-dom"
import { Select, SelectValue } from "../../../components/common/Select/SelectBase"
import { SelectTrigger, SelectContent } from "../../../components/common/Select/SelectInteraction"
import { SelectItem } from "../../../components/common/Select/SelectItems"
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Clock,
  FileVideo,
  Filter,
  RefreshCw,
  Video,
  CheckCircle,
} from "lucide-react"
import ReturnButton from "../../../components/common/Button/ReturnButton"

export default function StudentMultipleVideosPage() {
  const { videos, loading, error, study_id } = useStudyVideos()
  const [selectedProtocol, setSelectedProtocol] = useState<string>()
  const protocols = Array.from(new Set(videos.map((v) => v.protocol)))
  const filteredVideos =
    selectedProtocol && selectedProtocol !== "all" ? videos.filter((v) => v.protocol === selectedProtocol) : videos

  const label = selectedProtocol ? (selectedProtocol === "all" ? "Mostrar todos" : selectedProtocol) : ""

  const PageHeader = () => (
    <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="flex items-start gap-3">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-1">
          <FileVideo className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-[#333333] mb-1">Videos del estudio</h1>
          <p className="text-[#666666]">
            {study_id ? `Estudio: ${study_id}` : "Revisa los videos del estudio y su retroalimentación"}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:mt-0 ml-0 md:ml-4">
        <div className="relative w-full sm:w-auto">
          <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
            <SelectTrigger className="h-[42px] text-[14px] border-slate-300 rounded-[8px] pl-9 pr-4 min-w-[220px] bg-white">
              {label ? (
                <div className="flex items-center">
                  <Filter className="h-4 w-4 text-[#4E81BD] absolute left-3" />
                  <span>{`Filtrado por: ${label}`}</span>
                </div>
              ) : (
                <>
                  <Filter className="h-4 w-4 text-[#666666] absolute left-3" />
                  <SelectValue placeholder="Filtrar por protocolo" />
                </>
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Mostrar todos</SelectItem>
              {protocols.map((proto) => (
                <SelectItem key={proto} value={proto}>
                  {proto}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ReturnButton/>
      </div>
    </header>
  )

  if (loading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
            <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin mb-6"></div>
          </div>
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando videos</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos recuperando los videos del estudio. Esto tomará solo un momento.
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
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">No se pudieron cargar los videos</h2>
              <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                {error.toString() || "Ha ocurrido un error al obtener los videos del estudio."}
              </p>
              <div className="space-y-2 text-[15px] text-red-600 bg-red-100/50 p-4 rounded-lg inline-block md:block">
                <p className="font-medium">Esto puede deberse a:</p>
                <ul className="list-disc pl-5 space-y-2 text-left">
                  <li>Problemas de conexión a internet</li>
                  <li>El servidor no está disponible en este momento</li>
                  <li>El estudio no existe o ha sido eliminado</li>
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

      {/* Videos Summary Card */}
      <div className="mb-8 bg-gradient-to-r from-[#4E81BD]/5 to-[#4E81BD]/10 rounded-[16px] shadow-sm border border-[#4E81BD]/20 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#4E81BD]/20 p-3 rounded-full">
              <Video className="h-8 w-8 text-[#4E81BD]" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#333333]">Resumen de videos</h2>
              <p className="text-[#666666]">
                Este estudio tiene <span className="font-medium text-[#4E81BD]">{videos.length}</span>{" "}
                {videos.length === 1 ? "video" : "videos"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-[#4E81BD]/20 text-center">
              <div className="flex items-center justify-center mb-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-[#666666]">Evaluados</p>
              <p className="text-sm font-medium text-[#333333]">
                {videos.filter((v) => v.status === "EVALUADO").length}
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-[#4E81BD]/20 text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-xs text-[#666666]">Pendientes</p>
              <p className="text-sm font-medium text-[#333333]">
                {videos.filter((v) => v.status !== "EVALUADO").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10 text-center">
          <div className="bg-slate-100 p-6 rounded-full mb-6">
            <Video className="h-12 w-12 text-slate-400" />
          </div>
          <p className="text-xl font-medium text-[#333333] mb-2">No hay videos disponibles</p>
          <p className="text-[#666666] max-w-md mb-6">
            Este estudio aún no tiene videos. El estudiante debe subir videos para que puedas evaluarlos.
          </p>
          <Button
            onClick={() => window.history.back()}
            className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            <ArrowRight className="h-5 w-5" />
            Volver a estudios
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-[#666666]">
              <span className="font-medium text-[#333333]">{filteredVideos.length}</span>{" "}
              {filteredVideos.length === 1 ? "video encontrado" : "videos encontrados"}
              {selectedProtocol && selectedProtocol !== "all" && (
                <span>
                  {" "}
                  para el protocolo <span className="text-[#4E81BD] font-medium">{selectedProtocol}</span>
                </span>
              )}
            </p>
          </div>

          <div className="space-y-4 animate-fadeIn">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className="rounded-[12px] p-0 overflow-hidden border border-slate-200 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row items-stretch">
                  <div
                    className={`p-4 sm:p-6 flex items-center justify-center sm:w-[120px] ${
                      video.status === "EVALUADO" ? "bg-green-100" : "bg-amber-100"
                    }`}
                  >
                    {video.status === "EVALUADO" ? (
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    ) : (
                      <Clock className="h-10 w-10 text-amber-500" />
                    )}
                  </div>
                  <div className="flex-1 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-[#333333] mb-2 line-clamp-1">
                        {video.original_filename}
                      </h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#666666]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-[#4E81BD]" />
                          <span>
                            {new Date(video.upload_date).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FileVideo className="h-4 w-4 text-[#4E81BD]" />
                          <span className="font-medium">{video.protocol.toUpperCase()}</span>
                        </div>
                        {video.status === "EVALUADO" && video.size_bytes !== undefined && (
                          <div className="flex items-center gap-1.5">
                            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                              {video.size_bytes}/10
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Link to={`/teacher/evaluations/${study_id}/videos/${video.id}`}>
                      <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-2.5 px-5 rounded-[8px] shadow-sm hover:shadow transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                        {video.status === "EVALUADO" ? "Ver evaluación" : "Evaluar video"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
