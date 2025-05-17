import { useState } from "react"
import { useStudyVideos } from "../../../hooks/student/Videos/useStudyVideos"
import Card from "../../../components/common/Card/Card"
import Button from "../../../components/common/Button/Button"
import { Link } from "react-router-dom"
import { Select, SelectValue } from "../../../components/common/Select/SelectBase"
import { SelectTrigger, SelectContent } from "../../../components/common/Select/SelectInteraction"
import { SelectItem } from "../../../components/common/Select/SelectItems"
import { AlertCircle, ArrowRight, ArrowUpRight, Calendar, Camera, FileVideo, Filter, Lightbulb, Play, Upload, Video, VideoIcon, Volume2, Wand2 } from 'lucide-react'
import ReturnButton from "../../../components/common/Button/ReturnButton"

export default function StudentMultipleVideosPage() {
  const { videos, loading, error, study_id,  } = useStudyVideos()
  const [selectedProtocol, setSelectedProtocol] = useState<string>()
  const protocols = Array.from(new Set(videos.map((v) => v.protocol)))
  const filteredVideos =
    selectedProtocol && selectedProtocol !== "all" ? videos.filter((v) => v.protocol === selectedProtocol) : videos

  const label = selectedProtocol ? (selectedProtocol === "all" ? "Mostrar todos" : selectedProtocol) : ""
  
  // Check if there are few videos (3 or less)
  const hasFewVideos = videos.length > 0 && videos.length <= 3

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-[#4E81BD]/10 p-2 rounded-full mt-1">
            <FileVideo className="h-6 w-6 text-[#4E81BD]" />
          </div>
          <div>
            <h1 className="text-[24px] font-bold text-[#333333] mb-1">Videos del estudio</h1>
            <p className="text-[#666666]">
              {study_id ? `Estudio: ${study_id}` : "Revisa los videos de tu estudio y su retroalimentación"}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:mt-0 ml-0 md:ml-4">
          <div className="relative w-full sm:w-auto">
            <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
              <SelectTrigger className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px] pl-9 pr-4 min-w-[220px] bg-white">
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

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
            <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin mb-6"></div>
          </div>
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando videos</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos recuperando los videos de tu estudio. Esto tomará solo un momento.
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 shadow-sm">
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
      ) : videos.length === 0 ? (
        <div className="space-y-8">
          {/* Empty state card */}
          <div className="flex flex-col items-center justify-center py-10">
            <Card className="w-full max-w-3xl rounded-[16px] p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#4E81BD]/10 p-6 rounded-full mb-6">
                  <Video className="h-12 w-12 text-[#4E81BD]" />
                </div>
                <h2 className="text-[22px] font-semibold text-[#333333] mb-3">Aún no hay videos</h2>
                <p className="text-[16px] text-[#666666] mb-8 max-w-md">
                  Este estudio aún no tiene videos. Sube tu primer video para comenzar a recibir retroalimentación.
                </p>
                <Link to={`/student/upload`} className="w-full max-w-xs">
                  <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] font-medium shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 w-full">
                    <Upload className="h-5 w-5" />
                    Subir Video
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Video upload guide */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[16px] shadow-sm border border-blue-100 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#4E81BD]/20 p-2 rounded-full">
                <Lightbulb className="h-6 w-6 text-[#4E81BD]" />
              </div>
              <h2 className="text-[20px] font-semibold text-[#333333]">Guía para subir videos de ultrasonido</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#4E81BD]/10 h-8 w-8 rounded-full flex items-center justify-center text-[#4E81BD] font-bold">
                    1
                  </div>
                  <h3 className="text-[16px] font-medium text-[#333333]">Prepara tus videos</h3>
                </div>
                <p className="text-[14px] text-[#666666] mb-4">
                  Asegúrate de que tus videos sean cortos (3-5 segundos) y muestren claramente las estructuras anatómicas.
                </p>
                <div className="flex items-center gap-2 text-[14px] text-[#4E81BD]">
                  <Camera className="h-4 w-4" />
                  <span>Formatos: MP4, MOV, MPEG</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#4E81BD]/10 h-8 w-8 rounded-full flex items-center justify-center text-[#4E81BD] font-bold">
                    2
                  </div>
                  <h3 className="text-[16px] font-medium text-[#333333]">Sube tus videos</h3>
                </div>
                <p className="text-[14px] text-[#666666] mb-4">
                  Utiliza la función de carga para subir tus videos y asignarles el protocolo correspondiente.
                </p>
                <Link to="/student/upload" className="text-[#4E81BD] text-[14px] font-medium flex items-center">
                  Ir a subir videos <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#4E81BD]/10 h-8 w-8 rounded-full flex items-center justify-center text-[#4E81BD] font-bold">
                    3
                  </div>
                  <h3 className="text-[16px] font-medium text-[#333333]">Recibe retroalimentación</h3>
                </div>
                <p className="text-[14px] text-[#666666] mb-4">
                  Tus profesores evaluarán tus videos y te proporcionarán retroalimentación detallada.
                </p>
                <span className="text-slate-400 text-[14px] font-medium flex items-center">
                  Disponible después de subir videos
                </span>
              </div>
            </div>
          </div>

          {/* Video quality tips */}
          <Card className="rounded-[16px] border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-emerald-600" />
                <h3 className="text-[16px] font-semibold text-[#333333]">Consejos para videos de calidad</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full mt-0.5">
                      <VideoIcon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Duración óptima</h4>
                      <p className="text-[13px] text-[#666666]">
                        Mantén tus videos entre 3-5 segundos para capturar adecuadamente la estructura sin ocupar demasiado espacio.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full mt-0.5">
                      <Camera className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Estabilidad</h4>
                      <p className="text-[13px] text-[#666666]">
                        Mantén el transductor estable durante la grabación para obtener imágenes claras y evitar artefactos.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full mt-0.5">
                      <Play className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Formato adecuado</h4>
                      <p className="text-[13px] text-[#666666]">
                        Utiliza formatos de video comunes como MP4 o MOV con una resolución mínima de 720p.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full mt-0.5">
                      <Volume2 className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#333333] mb-1">Audio</h4>
                      <p className="text-[13px] text-[#666666]">
                        Si tu video incluye audio, asegúrate de que sea claro y sin ruido de fondo excesivo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          {/* Video summary card - Only show when there are videos */}
          <div className="mb-8 bg-gradient-to-r from-[#4E81BD]/5 to-[#4E81BD]/10 rounded-[16px] shadow-sm border border-[#4E81BD]/20 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#4E81BD]/20 p-3 rounded-full">
                  <VideoIcon className="h-8 w-8 text-[#4E81BD]" />
                </div>
                <div>
                  <h2 className="text-[18px] font-semibold text-[#333333]">Resumen de videos</h2>
                  <p className="text-[#666666]">
                    Tienes <span className="font-medium text-[#4E81BD]">{videos.length}</span>{" "}
                    {videos.length === 1 ? "video" : "videos"} en este estudio
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-[#4E81BD]/20 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="h-5 w-5 text-[#4E81BD]" />
                  </div>
                  <p className="text-xs text-[#666666]">Más reciente</p>
                  <p className="text-sm font-medium text-[#333333]">
                    {videos.length > 0
                      ? new Date(Math.max(...videos.map((v) => new Date(v.upload_date).getTime()))).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "2-digit",
                          },
                        )
                      : "-"}
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg shadow-sm border border-[#4E81BD]/20 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className="h-5 w-5 rounded-full bg-[#4E81BD] flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">P</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#666666]">Protocolos</p>
                  <p className="text-sm font-medium text-[#333333]">{protocols.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-[#666666]">
              <span className="font-medium text-[#333333]">{filteredVideos.length}</span>{" "}
              {filteredVideos.length === 1 ? "video encontrado" : "videos encontrados"}
            </p>
            <Link to={`/student/upload`}>
              <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-2 px-4 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Subir más videos
              </Button>
            </Link>
          </div>

          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="rounded-[12px] p-0 overflow-hidden border border-slate-200 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row items-stretch">
                <div className="bg-[#4E81BD]/10 p-4 sm:p-6 flex items-center justify-center sm:w-[120px]">
                  <FileVideo className="h-10 w-10 text-[#4E81BD]" />
                </div>
                <div className="flex-1 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-[#333333] mb-2 line-clamp-1">{video.original_filename}</h3>
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
                        <div className="h-4 w-4 rounded-full bg-[#4E81BD] flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">P</span>
                        </div>
                        <span className="font-medium">{video.protocol}</span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/student/${study_id}/videos/${video.id}`}>
                    <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-2.5 px-5 rounded-[8px] shadow-sm hover:shadow transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                      Ver Video
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}

          {/* Additional content for when there are few videos */}
          {hasFewVideos && (
            <div className="mt-10 bg-gradient-to-r from-slate-50 to-blue-50 rounded-[16px] shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#4E81BD]/20 p-2 rounded-full">
                  <Lightbulb className="h-6 w-6 text-[#4E81BD]" />
                </div>
                <h2 className="text-[18px] font-semibold text-[#333333]">Mejora tu portafolio de videos</h2>
              </div>
              
              <p className="text-[15px] text-[#666666] mb-4">
                Para obtener una evaluación más completa, te recomendamos subir más videos que cubran diferentes aspectos del protocolo.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
                    <VideoIcon className="h-5 w-5 text-[#4E81BD]" />
                    Beneficios de tener más videos
                  </h3>
                  <ul className="space-y-2 text-[14px] text-[#666666]">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-[#4E81BD]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] text-[#4E81BD] font-bold">✓</span>
                      </div>
                      <span>Evaluación más completa de tus habilidades</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-[#4E81BD]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] text-[#4E81BD] font-bold">✓</span>
                      </div>
                      <span>Retroalimentación más detallada de tus profesores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-[#4E81BD]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] text-[#4E81BD] font-bold">✓</span>
                      </div>
                      <span>Mejor seguimiento de tu progreso a lo largo del tiempo</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-[#4E81BD]" />
                    Próximos pasos
                  </h3>
                  <p className="text-[14px] text-[#666666] mb-4">
                    Te recomendamos subir al menos 5 videos por protocolo para obtener una evaluación completa.
                  </p>
                  <Link to={`/student/upload`}>
                    <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-2.5 px-5 rounded-[8px] shadow-sm hover:shadow transition-all w-full flex items-center justify-center gap-2">
                      <Upload className="h-4 w-4" />
                      Subir más videos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

