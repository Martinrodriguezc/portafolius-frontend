import { Link } from "react-router-dom"
import Card from "../../../components/common/Card/Card"
import Button from "../../../components/common/Button/Button"
import { useStudentStudies } from "../../../hooks/student/Studies/useStudentStudies"
import { BookOpen, Plus, FileText, Clock, CheckCircle, AlertCircle, Search, Filter, Lightbulb, ArrowRight, Calendar, BarChart, Award, BookOpenCheck } from 'lucide-react'
import type { Study } from "../../../types/Study"

export default function StudentStudiesPage() {
  const { studies, loading, error } = useStudentStudies()

  // Page header component - extracted for reuse in all states
  const PageHeader = () => (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full">
          <FileText className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <h1 className="text-[24px] font-bold text-[#333333]">Mis Estudios</h1>
      </div>
      <p className="text-[#666666] ml-12">Revisa tus estudios evaluados y pendientes de evaluación</p>
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
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando tus estudios</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos recuperando la información de tus estudios. Esto tomará solo un momento.
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
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">No se pudieron cargar tus estudios</h2>
              <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                {error.toString() || "Ha ocurrido un error al obtener los datos de tus estudios."}
              </p>
              <div className="space-y-2 text-[15px] text-red-600 bg-red-100/50 p-4 rounded-lg inline-block md:block">
                <p className="font-medium">Esto puede deberse a:</p>
                <ul className="list-disc pl-5 space-y-2 text-left">
                  <li>Problemas de conexión a internet</li>
                  <li>El servidor no está disponible en este momento</li>
                  <li>Tu sesión ha expirado</li>
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

  if (studies.length === 0) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10 text-center">
          <div className="bg-[#4E81BD]/10 p-6 rounded-full mb-6">
            <BookOpen className="h-12 w-12 text-[#4E81BD]" />
          </div>
          <h2 className="text-[22px] font-semibold text-[#333333] mb-3">No hay estudios disponibles</h2>
          <p className="text-[16px] text-[#666666] mb-8 max-w-md">
            Crea o sube un estudio para que aparezca en esta lista y comienza a recibir retroalimentación de tus
            profesores.
          </p>
          <Link to="/student/create_study">
            <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[16px] font-medium py-3 px-8 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Crear nuevo estudio
            </Button>
          </Link>
        </div>

        {/* Added: Getting Started Guide */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[16px] shadow-sm border border-blue-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#4E81BD]/20 p-2 rounded-full">
              <Lightbulb className="h-6 w-6 text-[#4E81BD]" />
            </div>
            <h2 className="text-[20px] font-semibold text-[#333333]">Cómo empezar con PortafoliUS</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#4E81BD]/10 h-8 w-8 rounded-full flex items-center justify-center text-[#4E81BD] font-bold">
                  1
                </div>
                <h3 className="text-[16px] font-medium text-[#333333]">Crea un estudio</h3>
              </div>
              <p className="text-[14px] text-[#666666] mb-4">
                Comienza creando un nuevo estudio para organizar tus videos de ultrasonido por protocolo.
              </p>
              <Link to="/student/create_study" className="text-[#4E81BD] text-[14px] font-medium flex items-center">
                Crear estudio <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#4E81BD]/10 h-8 w-8 rounded-full flex items-center justify-center text-[#4E81BD] font-bold">
                  2
                </div>
                <h3 className="text-[16px] font-medium text-[#333333]">Sube tus videos</h3>
              </div>
              <p className="text-[14px] text-[#666666] mb-4">
                Sube videos de ultrasonido (3-5 segundos) para cada protocolo que quieras evaluar.
              </p>
              <Link to="/student/upload" className="text-[#4E81BD] text-[14px] font-medium flex items-center">
                Subir videos <ArrowRight className="h-4 w-4 ml-1" />
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
      </div>
    )
  }

  // For few studies (1-3), add additional content to make the page look fuller
  const hasFewStudies = studies.length <= 3

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <PageHeader />
        <Link to="/student/create_study" className="md:self-start">
          <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white font-medium py-3 px-6 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2 w-full md:w-auto">
            <Plus className="h-5 w-5" />
            Crear nuevo estudio
          </Button>
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar estudios..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700">Filtrar</span>
          </button>
          <select className="px-4 py-2 border border-slate-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD] bg-white">
            <option value="recent">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="evaluated">Evaluados</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>
      </div>

      {/* Studies Summary Card - Only show when there are studies */}
      <div className="mb-8 bg-gradient-to-r from-[#4E81BD]/5 to-[#4E81BD]/10 rounded-[16px] shadow-sm border border-[#4E81BD]/20 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#4E81BD]/20 p-3 rounded-full">
              <BookOpenCheck className="h-8 w-8 text-[#4E81BD]" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#333333]">Resumen de estudios</h2>
              <p className="text-[#666666]">
                Tienes <span className="font-medium text-[#4E81BD]">{studies.length}</span>{" "}
                {studies.length === 1 ? "estudio" : "estudios"} en tu portafolio
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-[#4E81BD]/20 text-center">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="h-5 w-5 text-[#4E81BD]" />
              </div>
              <p className="text-xs text-[#666666]">Más reciente</p>
              <p className="text-sm font-medium text-[#333333]">
                {studies.length > 0
                  ? new Date(
                      Math.max(...studies.map((s) => new Date(s.created_at).getTime()))
                    ).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                    })
                  : "-"}
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-[#4E81BD]/20 text-center">
              <div className="flex items-center justify-center mb-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-[#666666]">Evaluados</p>
              <p className="text-sm font-medium text-[#333333]">
                {studies.filter((s) => s.status === "EVALUADO").length}
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-[#4E81BD]/20 text-center">
              <div className="flex items-center justify-center mb-1">
                <BarChart className="h-5 w-5 text-[#4E81BD]" />
              </div>
              <p className="text-xs text-[#666666]">Promedio</p>
              <p className="text-sm font-medium text-[#333333]">
                {studies.some((s) => s.status === "EVALUADO" && s.score !== null)
                  ? (
                      studies
                        .filter((s) => s.status === "EVALUADO" && s.score !== null)
                        .reduce((acc, s) => acc + s.score!, 0) /
                      studies.filter((s) => s.status === "EVALUADO" && s.score !== null).length
                    ).toFixed(1)
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
        {studies.map((study: Study) => (
          <Card
            key={study.id}
            className="rounded-[16px] overflow-hidden hover:shadow-md transition-shadow border border-slate-200"
          >
            <div
              className={`p-1 ${
                study.status === "EVALUADO" ? "bg-green-100" : "bg-amber-100"
              } text-center text-xs font-medium uppercase tracking-wider`}
            >
              {study.status === "EVALUADO" ? (
                <span className="text-green-800 flex items-center justify-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Evaluado
                </span>
              ) : (
                <span className="text-amber-800 flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" /> Pendiente
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#333333] mb-1">{study.title}</h2>
                  <p className="text-sm text-[#666666] mb-2">
                    Creado: {new Date(study.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    study.status === "EVALUADO" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {study.status === "EVALUADO" ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-[#666666] mb-1">
                  <span className="font-medium">Descripción:</span> {study.description}
                </p>
              </div>

              {study.status === "EVALUADO" && study.score !== null && (
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#333333]">Calificación:</span>
                    <span className="text-sm font-bold text-[#4E81BD]">{study.score}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-[#4E81BD] h-2 rounded-full"
                      style={{ width: `${(study.score / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <Link to={`/student/studies/${study.id}/videos`}>
                <Button className="mt-2 w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white font-medium py-2.5 rounded-[8px] transition-colors">
                  Ver videos
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional content for when there are few studies */}
      {hasFewStudies && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tips Card */}
          <Card className="rounded-[16px] border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-blue-100">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#4E81BD]" />
                <h3 className="text-[16px] font-semibold text-[#333333]">Consejos para mejorar tus estudios</h3>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-[#4E81BD]/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-4 w-4 text-[#4E81BD]" />
                  </div>
                  <p className="text-sm text-[#666666]">
                    <span className="font-medium text-[#333333]">Mantén el transductor estable</span> durante la
                    adquisición de imágenes para obtener videos de mejor calidad.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#4E81BD]/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-4 w-4 text-[#4E81BD]" />
                  </div>
                  <p className="text-sm text-[#666666]">
                    <span className="font-medium text-[#333333]">Ajusta la profundidad y ganancia</span> adecuadamente
                    para visualizar correctamente las estructuras anatómicas.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#4E81BD]/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-4 w-4 text-[#4E81BD]" />
                  </div>
                  <p className="text-sm text-[#666666]">
                    <span className="font-medium text-[#333333]">Etiqueta correctamente tus videos</span> con el
                    protocolo y las estructuras anatómicas correspondientes.
                  </p>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Link
                  to="/student/materials"
                  className="text-[#4E81BD] text-sm font-medium flex items-center hover:underline"
                >
                  Ver más recursos de aprendizaje <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </Card>

          {/* Next Steps Card */}
          <Card className="rounded-[16px] border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-600" />
                <h3 className="text-[16px] font-semibold text-[#333333]">Próximos pasos</h3>
              </div>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 h-7 w-7 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#333333] mb-1">Crea más estudios</h4>
                    <p className="text-xs text-[#666666]">
                      Organiza tus videos por protocolos específicos para un mejor seguimiento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 h-7 w-7 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#333333] mb-1">Sube videos regularmente</h4>
                    <p className="text-xs text-[#666666]">
                      Mantén un registro constante de tu progreso subiendo videos periódicamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 h-7 w-7 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#333333] mb-1">Revisa la retroalimentación</h4>
                    <p className="text-xs text-[#666666]">
                      Analiza los comentarios de tus profesores para mejorar tus técnicas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
                <Link to="/student/create_study" className="text-emerald-600 text-sm font-medium hover:underline">
                  Crear nuevo estudio
                </Link>
                <Link to="/student/upload" className="text-emerald-600 text-sm font-medium hover:underline">
                  Subir videos
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

