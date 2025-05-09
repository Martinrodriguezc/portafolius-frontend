import { Link } from "react-router-dom"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  BarChart,
  Users,
  FileVideo,
  ArrowRight,
  Lightbulb,
  Calendar,
} from "lucide-react"
import Button from "../../components/common/Button/Button"
import Card from "../../components/common/Card/Card"
import TabsButton from "../../components/common/Tabs/TabsButton"
import TabsContainer from "../../components/common/Tabs/TabsContainer"
import TabsList from "../../components/common/Tabs/TabsList"
import TabsPanel from "../../components/common/Tabs/TabsPanel"
import { useTeacherDashboard } from "../../hooks/teacher/dashboard/useTeacherDashboard"
import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies"

export default function TeacherDashboardPage() {
  const { lastName, stats, statsLoading, statsError, pending, evaluated, vidsLoading, vidsError } =
    useTeacherDashboard()

  const {
    pending: studiesPending,
    completed: studiesCompleted,
    loading: studiesLoading,
    error: studiesError,
  } = useAllStudies()

  // Page header component - extracted for reuse in all states
  const PageHeader = () => (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full">
          <BarChart className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <h1 className="text-[24px] font-bold text-[#333333]">Dashboard de Profesor</h1>
      </div>
      <p className="text-[#666666] ml-12">
        Bienvenido de nuevo, {lastName ? `Dr. ${lastName}` : "Profesor"}. Aquí tienes un resumen de tu actividad.
      </p>
    </header>
  )

  if (statsLoading || vidsLoading || studiesLoading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
            <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin mb-6"></div>
          </div>
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando dashboard</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos recuperando la información de tu dashboard. Esto tomará solo un momento.
          </p>
        </div>
      </div>
    )
  }

  if (statsError || vidsError || studiesError) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0 self-center md:self-start">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">Error al cargar el dashboard</h2>
              <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                {(statsError || vidsError || studiesError)?.toString() ||
                  "Ha ocurrido un error al obtener los datos del dashboard."}
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
              <RefreshCw className="h-5 w-5 mr-2 animate-spin-slow" />
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const allStudies = [...studiesPending, ...studiesCompleted]

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
      <PageHeader />

      {/* Stats panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-[16px] shadow-sm border border-amber-200">
          <div className="flex items-center">
            <div className="bg-amber-500 p-3 rounded-full mr-4 shadow-sm">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-amber-800 text-sm font-medium">Pendientes</p>
              <p className="text-3xl font-bold text-[#333333]">{stats.pendingCount}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-[16px] shadow-sm border border-green-200">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-full mr-4 shadow-sm">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-green-800 text-sm font-medium">Evaluados hoy</p>
              <p className="text-3xl font-bold text-[#333333]">{stats.evaluatedToday}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-[16px] shadow-sm border border-blue-200">
          <div className="flex items-center">
            <div className="bg-[#4E81BD] p-3 rounded-full mr-4 shadow-sm">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-[#4E81BD] text-sm font-medium">Estudiantes</p>
              <p className="text-3xl font-bold text-[#333333]">{stats.studentCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Videos tabs panel */}
      <Card className="bg-white p-6 rounded-[16px] shadow-sm border border-slate-200 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#333333] mb-1">Videos de estudiantes</h2>
            <p className="text-[#666666]">Revisa y evalúa los videos de tus estudiantes</p>
          </div>
          <Link to="/teacher/evaluations">
            <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-4 py-2 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2">
              Ver todas las evaluaciones <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <TabsContainer defaultValue="pendiente">
          <TabsList className="mb-6 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-hide">
            <TabsButton value="pendiente">
              <Clock className="h-4 w-4 text-amber-500" />
              Pendiente ({pending.length})
            </TabsButton>
            <TabsButton value="evaluado">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Evaluado ({evaluated.length})
            </TabsButton>
          </TabsList>

          <TabsPanel value="pendiente">
            {pending.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-[12px] border border-slate-100">
                <Clock className="h-16 w-16 text-amber-300 mb-4" />
                <p className="text-xl font-medium text-[#333333] mb-2">No hay videos pendientes</p>
                <p className="text-[#666666] text-center max-w-md">
                  Cuando tus estudiantes suban videos, los verás aquí para evaluarlos.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map((v) => {
                  const study = allStudies.find((s) => s.study_id === v.study_id)
                  const studentName = study ? `${study.first_name} ${study.last_name}` : "Desconocido"
                  return (
                    <Card
                      key={v.id}
                      className="rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <FileVideo className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-[#333333] mb-1 line-clamp-1">
                            {v.original_filename}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#666666]">
                            <p className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-[#4E81BD]" />
                              {studentName}
                            </p>
                            <p className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-[#4E81BD]" />
                              {new Date(v.upload_date).toLocaleDateString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link to={`/teacher/evaluations/${v.study_id}/videos/${v.id}`}>
                        <Button className="w-full sm:w-auto bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-2.5 rounded-[8px] shadow-sm hover:shadow transition-all">
                          Evaluar
                        </Button>
                      </Link>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsPanel>

          <TabsPanel value="evaluado">
            {evaluated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-[12px] border border-slate-100">
                <CheckCircle className="h-16 w-16 text-green-300 mb-4" />
                <p className="text-xl font-medium text-[#333333] mb-2">No hay videos evaluados</p>
                <p className="text-[#666666] text-center max-w-md">
                  Una vez que evalúes videos, sus resultados aparecerán aquí.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {evaluated.map((v) => {
                  const study = allStudies.find((s) => s.study_id === v.study_id)
                  const studentName = study ? `${study.first_name} ${study.last_name}` : "Desconocido"
                  return (
                    <Card
                      key={v.id}
                      className="rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <FileVideo className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium text-[#333333] mb-1 line-clamp-1">
                              {v.original_filename}
                            </h3>
                            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                              {v.score}/10
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#666666]">
                            <p className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-[#4E81BD]" />
                              {studentName}
                            </p>
                            <p className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-[#4E81BD]" />
                              {new Date(v.evaluated_at!).toLocaleDateString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link to={`/teacher/evaluations/${v.study_id}/videos/${v.id}`}>
                        <Button className="w-full sm:w-auto bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-2.5 rounded-[8px] shadow-sm hover:shadow transition-all">
                          Ver
                        </Button>
                      </Link>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsPanel>
        </TabsContainer>
      </Card>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-[16px] shadow-sm border border-blue-100 animate-fadeIn">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#4E81BD]/20 p-2 rounded-full">
            <Lightbulb className="h-6 w-6 text-[#4E81BD]" />
          </div>
          <h2 className="text-[18px] font-semibold text-[#333333]">Consejos para profesores</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
            <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Prioriza evaluaciones
            </h3>
            <p className="text-[14px] text-[#666666]">
              Evalúa primero los videos más antiguos para mantener a tus estudiantes motivados y al día con su progreso.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
            <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Retroalimentación detallada
            </h3>
            <p className="text-[14px] text-[#666666]">
              Proporciona comentarios específicos y constructivos para ayudar a tus estudiantes a mejorar sus técnicas.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
            <h3 className="text-[16px] font-medium text-[#333333] mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-[#4E81BD]" />
              Seguimiento de progreso
            </h3>
            <p className="text-[14px] text-[#666666]">
              Revisa regularmente el progreso de tus estudiantes para identificar áreas de mejora y celebrar sus logros.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
