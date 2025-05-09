import { Link } from "react-router-dom"
import {
  Calendar,
  CheckCircle,
  Clock,
  Lightbulb,
  BarChart2,
  Users,
  FileVideo,
  ArrowRight,
  Filter,
  AArrowUpIcon as SortAscending,
} from "lucide-react"
import Card from "../../components/common/Card/Card"
import TabsContainer from "../../components/common/Tabs/TabsContainer"
import TabsList from "../../components/common/Tabs/TabsList"
import TabsButton from "../../components/common/Tabs/TabsButton"
import TabsPanel from "../../components/common/Tabs/TabsPanel"
import Button from "../../components/common/Button/Button"
import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies"
import { ErrorDisplay } from "../../components/common/Error/Error"
import { Badge } from "../../components/common/Badge/Badge"

export default function TeacherEvaluationsLayout() {
  const { pending, completed, loading, error } = useAllStudies()

  // Page header component - extracted for reuse in all states
  const PageHeader = () => (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full">
          <FileVideo className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <h1 className="text-[24px] font-bold text-[#333333]">Evaluaciones</h1>
      </div>
      <p className="text-[#666666] ml-12">Historial y gestión de tus evaluaciones de estudiantes</p>
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
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando evaluaciones</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos recuperando la información de tus evaluaciones. Esto tomará solo un momento.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />
        <ErrorDisplay error={error} />
      </div>
    )
  }

  const total = pending.length + completed.length
  const avg =
    completed.length > 0 ? (completed.reduce((sum, s) => sum + s.score, 0) / completed.length).toFixed(1) : "0.0"

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
      <PageHeader />

      {/* Header + stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-[16px] shadow-sm border border-blue-200">
          <div className="flex items-center">
            <div className="bg-[#4E81BD] p-3 rounded-full mr-4 shadow-sm">
              <Badge className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-[#4E81BD] text-sm font-medium">Totales</p>
              <p className="text-3xl font-bold text-[#333333]">{total}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-[16px] shadow-sm border border-amber-200">
          <div className="flex items-center">
            <div className="bg-amber-500 p-3 rounded-full mr-4 shadow-sm">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-amber-800 text-sm font-medium">Pendientes</p>
              <p className="text-3xl font-bold text-[#333333]">{pending.length}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-[16px] shadow-sm border border-green-200">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-full mr-4 shadow-sm">
              <BarChart2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-green-800 text-sm font-medium">Calif. Promedio</p>
              <p className="text-3xl font-bold text-[#333333]">{avg}/10</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-4 mb-6 flex flex-col md:flex-row gap-4 animate-fadeIn">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar evaluaciones..."
            className="w-full pl-4 pr-4 py-2 border border-slate-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700">Filtrar</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors">
            <SortAscending className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700">Ordenar</span>
          </button>
        </div>
      </Card>

      {/* Tabs */}
      <Card className="bg-white p-6 rounded-[16px] shadow-sm border border-slate-200 animate-fadeIn">
        <TabsContainer defaultValue="pending">
          <TabsList className="mb-6 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-hide">
            <TabsButton value="pending">
              <Clock className="h-4 w-4 text-amber-500" />
              Pendientes ({pending.length})
            </TabsButton>
            <TabsButton value="completed">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Completadas ({completed.length})
            </TabsButton>
          </TabsList>

          {/* Pending */}
          <TabsPanel value="pending">
            {pending.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-[12px] border border-slate-100">
                <Clock className="h-16 w-16 text-amber-300 mb-4" />
                <p className="text-xl font-medium text-[#333333] mb-2">No hay evaluaciones pendientes</p>
                <p className="text-[#666666] text-center max-w-md">
                  Cuando tus estudiantes suban estudios, aparecerán aquí para que los evalúes.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map((study) => (
                  <Card
                    key={study.study_id}
                    className="rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <Users className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-medium text-[#333333]">
                            {study.first_name} {study.last_name}
                          </h3>
                          <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
                            Pendiente
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#666666]">
                          <p className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-[#4E81BD]" />
                            {new Date(study.created_at).toLocaleDateString("es-ES")}
                          </p>
                          <p className="flex items-center gap-1">
                            <FileVideo className="h-4 w-4 text-[#4E81BD]" />
                            {study.description.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link to={`/teacher/evaluations/${study.study_id}/videos`}>
                      <Button className="w-full sm:w-auto bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-2.5 rounded-[8px] shadow-sm hover:shadow transition-all">
                        Ver videos
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </TabsPanel>

          {/* Completed */}
          <TabsPanel value="completed">
            {completed.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-[12px] border border-slate-100">
                <CheckCircle className="h-16 w-16 text-green-300 mb-4" />
                <p className="text-xl font-medium text-[#333333] mb-2">No hay evaluaciones completadas</p>
                <p className="text-[#666666] text-center max-w-md">
                  Una vez que evalúes estudios, aparecerán aquí para que puedas revisarlos.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {completed.map((study) => (
                  <Card
                    key={study.study_id}
                    className="rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Users className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-medium text-[#333333]">
                            {study.first_name} {study.last_name}
                          </h3>
                          <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" /> Completada
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#666666]">
                          <p className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-[#4E81BD]" />
                            {new Date(study.created_at).toLocaleDateString("es-ES")}
                          </p>
                          <p className="flex items-center gap-1">
                            <FileVideo className="h-4 w-4 text-[#4E81BD]" />
                            {study.title || "—"}
                          </p>
                          <p className="flex items-center gap-1">
                            <BarChart2 className="h-4 w-4 text-[#4E81BD]" />
                            {study.description.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <span className="block text-sm text-[#666666]">Calif.</span>
                        <span className="block text-xl font-semibold text-[#4E81BD]">{study.score}/10</span>
                      </div>
                      <Link to={`/teacher/evaluations/${study.study_id}/videos`}>
                        <Button className="w-full sm:w-auto bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-2.5 rounded-[8px] shadow-sm hover:shadow transition-all">
                          Ver videos
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsPanel>
        </TabsContainer>
      </Card>

      {/* Suggestions when no evaluations */}
      {total === 0 && (
        <Card className="bg-white p-6 rounded-[16px] shadow-sm border border-slate-200 animate-fadeIn">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="bg-[#4E81BD]/10 p-4 rounded-full">
              <Lightbulb className="h-12 w-12 text-[#4E81BD]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#333333] mb-2">Sin evaluaciones aún</h2>
              <p className="text-[#666666] mb-4 max-w-md">
                Tus estudiantes aún no han subido videos. Invítalos a que comiencen a grabar y subir sus evaluaciones.
              </p>
              <Link to="/teacher/students">
                <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gestionar estudiantes
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Suggestions when few evaluations */}
      {total > 0 && total <= 3 && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-[16px] shadow-sm border border-blue-100 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#4E81BD]/20 p-2 rounded-full">
              <Lightbulb className="h-6 w-6 text-[#4E81BD]" />
            </div>
            <h2 className="text-[18px] font-semibold text-[#333333]">Sugerencias para evaluaciones</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
              <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
                <FileVideo className="h-5 w-5 text-[#4E81BD]" />
                Revisa guías de evaluación
              </h3>
              <p className="text-[14px] text-[#666666]">
                Asegúrate de conocer los criterios antes de comenzar a evaluar los videos de tus estudiantes.
              </p>
              <Link to="/teacher/guides" className="text-[#4E81BD] text-[14px] font-medium flex items-center mt-3">
                Ver guías <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
              <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Prioriza evaluaciones
              </h3>
              <p className="text-[14px] text-[#666666]">
                Completa primero las evaluaciones pendientes para mantener a tus estudiantes al día con su progreso.
              </p>
              <Link
                to={pending.length > 0 ? `/teacher/evaluations/${pending[0].study_id}/videos` : "#"}
                className={`text-[14px] font-medium flex items-center mt-3 ${
                  pending.length > 0 ? "text-[#4E81BD]" : "text-slate-400 cursor-not-allowed"
                }`}
              >
                {pending.length > 0 ? (
                  <>
                    Evaluar pendientes <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  "No hay pendientes"
                )}
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
