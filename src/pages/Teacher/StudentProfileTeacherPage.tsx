import { useNavigate, useParams, Link } from "react-router-dom"
import {
  BookOpen,
  ClipboardList,
  Lightbulb,
  PlusCircle,
  User,
  Mail,
  Calendar,
  BarChart,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  Clock,
  Search,
  FileText,
  ChevronRight,
  Award,
  Bell,
  MessageSquare,
  Download,
  Share2,
  Bookmark,
  History,
  HelpCircle,
  Zap,
  Layers,
} from "lucide-react"
import Card from "../../components/common/Card/Card"
import Button from "../../components/common/Button/Button"
import { useStudentProfile } from "../../hooks/teacher/student/useStudentProfile"
import { useState } from "react"
import SearchAndFilterControls from "../../components/common/SeacrhFilter/SearchFilter"

export default function StudentProfileTeacherPage() {
  const { studentId } = useParams<{ studentId: string }>()
  const nav = useNavigate()

  const { student, studentLoading, studentError, studies, studiesLoading, studiesError } = useStudentProfile()

  // State for filtering and sorting studies
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date") // date, title, status, score
  const [statusFilter, setStatusFilter] = useState("all") // all, evaluated, pending
  const [activeTab, setActiveTab] = useState("studies") // studies, activity, notes

  // summary metrics
  const total = studies.length
  const completedCount = studies.filter((s) => s.status === "EVALUADO").length
  const average =
    completedCount > 0
      ? (
          studies.filter((s) => s.status === "EVALUADO").reduce((sum, s) => sum + (s.score || 0), 0) / completedCount
        ).toFixed(1)
      : "—"

  // Filter and sort studies
  const filteredStudies = studies.filter((study) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (study.description && study.description.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filter by status
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "evaluated" && study.status === "EVALUADO") ||
      (statusFilter === "pending" && study.status === "PENDIENTE")

    return matchesSearch && matchesStatus
  })

  const sortedStudies = [...filteredStudies].sort((a, b) => {
    if (sortBy === "date") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    if (sortBy === "title") return a.title.localeCompare(b.title)
    if (sortBy === "status") {
      if (a.status === b.status) return 0
      return a.status === "EVALUADO" ? -1 : 1
    }
    if (sortBy === "score") {
      if (a.score === null && b.score === null) return 0
      if (a.score === null) return 1
      if (b.score === null) return -1
      return b.score - a.score
    }
    return 0
  })

  // Sample activity data (for demonstration)
  const recentActivity = [
    { id: 1, type: "login", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { id: 2, type: "study_view", studyId: 1, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { id: 3, type: "profile_update", date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  ]

  // Sample notes (for demonstration)
  const teacherNotes = [
    {
      id: 1,
      text: "Estudiante muy comprometido con su aprendizaje",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      text: "Necesita mejorar en técnicas de ultrasonido abdominal",
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    },
  ]

  // Sample recommended resources (for demonstration)
  const recommendedResources = [
    { id: 1, title: "Guía de ultrasonido básico", type: "pdf" },
    { id: 2, title: "Video tutorial: Técnicas avanzadas", type: "video" },
    { id: 3, title: "Práctica recomendada: Protocolo FAST", type: "protocol" },
  ]

  // Page header component - extracted for reuse in all states
  const PageHeader = () => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="bg-[#4E81BD]/10 p-3 rounded-full">
          <User className="h-8 w-8 text-[#4E81BD]" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">
            {student ? `${student.first_name} ${student.last_name}` : "Perfil de Estudiante"}
          </h1>
          <p className="text-[#666666] mt-1">{student?.email || "Cargando información del estudiante..."}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={() => nav(-1)}
          variant="outline"
          className="border-slate-300 text-[#333333] hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </div>
    </div>
  )

  if (studentLoading || studiesLoading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
            <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin mb-6"></div>
          </div>
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando perfil</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos recuperando la información del estudiante y sus estudios. Esto tomará solo un momento.
          </p>
        </div>
      </div>
    )
  }

  if (studentError || studiesError || !student) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0 self-center md:self-start">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">Error al cargar el perfil</h2>
              <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                {(studentError || studiesError)?.toString() ||
                  "Ha ocurrido un error al obtener la información del estudiante."}
              </p>
              <div className="space-y-2 text-[15px] text-red-600 bg-red-100/50 p-4 rounded-lg inline-block md:block">
                <p className="font-medium">Esto puede deberse a:</p>
                <ul className="list-disc pl-5 space-y-2 text-left">
                  <li>Problemas de conexión a internet</li>
                  <li>El servidor no está disponible en este momento</li>
                  <li>El estudiante no existe o ha sido eliminado</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center md:justify-start">
            <button
              onClick={() => nav(0)}
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

  const few = total > 0 && total <= 2

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8 animate-fadeIn bg-slate-50">
      <PageHeader />

      {/* Student Info Card */}
      <Card className="bg-white rounded-[16px] shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="bg-[#4E81BD]/10 h-24 w-24 rounded-full flex items-center justify-center">
            <User className="h-12 w-12 text-[#4E81BD]" />
          </div>
          <div className="space-y-3 flex-1">
            <h2 className="text-2xl font-bold text-[#333333]">
              {student.first_name} {student.last_name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#4E81BD]" />
                <span className="text-[#666666]">{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#4E81BD]" />
                <span className="text-[#666666]">
                  Registrado: {new Date(student.last_activity).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#4E81BD]" />
                <span className="text-[#666666]">
                  Última actividad: {new Date(student.last_activity).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:border-l md:pl-6 md:border-slate-200">
            <div className="flex items-center gap-2 text-sm text-[#666666]">
              <Award className="h-4 w-4 text-green-500" />
              <span>Nivel: Principiante</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#666666]">
              <Layers className="h-4 w-4 text-amber-500" />
              <span>Especialidad: Medicina General</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#666666]">
              <Zap className="h-4 w-4 text-purple-500" />
              <span>Progreso: 25%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="bg-white border-slate-200 text-[#4E81BD] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
        >
          <MessageSquare className="h-4 w-4" />
          Enviar mensaje
        </Button>
        <Button
          variant="outline"
          className="bg-white border-slate-200 text-[#4E81BD] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Download className="h-4 w-4" />
          Exportar datos
        </Button>
        <Button
          variant="outline"
          className="bg-white border-slate-200 text-[#4E81BD] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Bell className="h-4 w-4" />
          Notificar
        </Button>
        <Button
          variant="outline"
          className="bg-white border-slate-200 text-[#4E81BD] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Share2 className="h-4 w-4" />
          Compartir perfil
        </Button>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-[16px] shadow-sm border border-blue-200">
          <div className="flex items-center">
            <div className="bg-[#4E81BD] p-3 rounded-full mr-4 shadow-sm">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-[#4E81BD] text-sm font-medium">Total estudios</p>
              <p className="text-3xl font-bold text-[#333333]">{total}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200/50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-700">Último estudio:</span>
              <span className="font-medium text-[#333333]">
                {studies.length > 0
                  ? new Date(
                      studies.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
                        .created_at,
                    ).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-[16px] shadow-sm border border-green-200">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-full mr-4 shadow-sm">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-green-800 text-sm font-medium">Completados</p>
              <p className="text-3xl font-bold text-[#333333]">{completedCount}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200/50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-green-700">Tasa de finalización:</span>
              <span className="font-medium text-[#333333]">
                {total > 0 ? `${Math.round((completedCount / total) * 100)}%` : "N/A"}
              </span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-[16px] shadow-sm border border-amber-200">
          <div className="flex items-center">
            <div className="bg-amber-500 p-3 rounded-full mr-4 shadow-sm">
              <BarChart className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-amber-800 text-sm font-medium">Promedio</p>
              <p className="text-3xl font-bold text-[#333333]">{average}/10</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-amber-200/50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-amber-700">Mejor calificación:</span>
              <span className="font-medium text-[#333333]">
                {studies.some((s) => s.score !== null)
                  ? `${Math.max(...studies.filter((s) => s.score !== null).map((s) => s.score || 0))}/10`
                  : "N/A"}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-[16px] shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${
              activeTab === "studies"
                ? "text-[#4E81BD] border-b-2 border-[#4E81BD]"
                : "text-[#666666] hover:bg-slate-50"
            }`}
            onClick={() => setActiveTab("studies")}
          >
            <BookOpen className="h-4 w-4" />
            Estudios
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${
              activeTab === "activity"
                ? "text-[#4E81BD] border-b-2 border-[#4E81BD]"
                : "text-[#666666] hover:bg-slate-50"
            }`}
            onClick={() => setActiveTab("activity")}
          >
            <History className="h-4 w-4" />
            Actividad
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${
              activeTab === "notes" ? "text-[#4E81BD] border-b-2 border-[#4E81BD]" : "text-[#666666] hover:bg-slate-50"
            }`}
            onClick={() => setActiveTab("notes")}
          >
            <FileText className="h-4 w-4" />
            Notas
          </button>
        </div>

        <div className="p-6">
          {/* Studies Tab */}
          {activeTab === "studies" && (
            <div className="space-y-6">
              {/* Studies section header with search and filters */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#4E81BD]/10 p-2 rounded-full">
                      <ClipboardList className="h-6 w-6 text-[#4E81BD]" />
                    </div>
                    <h2 className="text-[20px] font-bold text-[#333333]">Estudios</h2>
                  </div>
                </div>

                {/* Search and filter controls */}
                <SearchAndFilterControls
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  total={total}
                />
              </div>

              {/* No studies */}
              {total === 0 && (
                <div className="flex flex-col items-center justify-center py-16 bg-slate-50 rounded-[16px] border border-slate-200 text-center">
                  <div className="bg-[#4E81BD]/10 p-6 rounded-full mb-6">
                    <BookOpen className="h-12 w-12 text-[#4E81BD]" />
                  </div>
                  <p className="text-xl font-medium text-[#333333] mb-2">Sin estudios</p>
                  <p className="text-[#666666] mb-8 max-w-md">
                    Este estudiante no ha creado estudios aún. Puedes crear un estudio para que el estudiante comience a
                    subir videos.
                  </p>
                  <Link to={`/teacher/students/${studentId}/studies/new`}>
                    <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2">
                      <PlusCircle className="h-5 w-5" />
                      Crear Primer Estudio
                    </Button>
                  </Link>
                </div>
              )}

              {/* Filtered studies message */}
              {total > 0 && sortedStudies.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 bg-slate-50 rounded-[16px] border border-slate-200 text-center">
                  <div className="bg-amber-100 p-4 rounded-full mb-4">
                    <Search className="h-8 w-8 text-amber-600" />
                  </div>
                  <p className="text-lg font-medium text-[#333333] mb-2">
                    No hay estudios que coincidan con la búsqueda
                  </p>
                  <p className="text-[#666666] mb-4">Prueba con otros términos o filtros.</p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSearchTerm("")}
                      className="border-[#4E81BD] text-[#4E81BD]"
                    >
                      Limpiar búsqueda
                    </Button>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setStatusFilter("all")
                        setSortBy("date")
                      }}
                      className="bg-[#4E81BD]"
                    >
                      Mostrar todos
                    </Button>
                  </div>
                </div>
              )}

              {/* Studies grid */}
              {total > 0 && sortedStudies.length > 0 && (
                <div className="space-y-4">
                  {sortedStudies.map((st) => (
                    <Card
                      key={st.id}
                      className={`p-6 bg-white rounded-[16px] shadow-sm border hover:shadow-md transition-all ${
                        st.status === "EVALUADO" ? "border-green-200" : "border-amber-200"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-[#333333] flex items-center gap-2">
                                {st.title}
                                {st.status === "EVALUADO" && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" /> Evaluado
                                  </span>
                                )}
                                {st.status === "PENDIENTE" && (
                                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> Pendiente
                                  </span>
                                )}
                              </h3>
                              <p className="text-[#666666] mt-2 mb-4">{st.description || "Sin descripción"}</p>
                            </div>
                            {st.status === "EVALUADO" && st.score !== null && (
                              <div className="bg-[#4E81BD]/10 p-3 rounded-full flex items-center justify-center h-14 w-14">
                                <div className="text-center">
                                  <div className="text-xl font-bold text-[#4E81BD]">{st.score}</div>
                                  <div className="text-xs text-[#4E81BD]/80">/ 10</div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-[#666666]">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-[#4E81BD]" />
                              Creado: {new Date(st.created_at).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-[#4E81BD]" />
                              ID: {st.id}
                            </div>
                            {st.status === "EVALUADO" && (
                              <div className="flex items-center gap-1">
                                <Award className="h-4 w-4 text-green-600" />
                                Evaluado: {new Date(st.created_at).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex md:flex-col gap-2 md:border-l md:pl-6 md:border-slate-200 justify-end">
                          <Link to={`/teacher/students/${studentId}/studies/${st.id}`}>
                            <Button className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-4 py-2 rounded-[8px] shadow-sm hover:shadow transition-all">
                              Ver detalles
                            </Button>
                          </Link>
                          {st.status === "PENDIENTE" ? (
                            <Link to={`/teacher/evaluations/${st.id}`}>
                              <Button
                                variant="outline"
                                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 px-4 py-2 rounded-[8px]"
                              >
                                <ClipboardList className="h-4 w-4 mr-1" /> Evaluar
                              </Button>
                            </Link>
                          ) : (
                            <Link to={`/teacher/evaluations/${st.id}/history`}>
                              <Button
                                variant="outline"
                                className="w-full border-green-300 text-green-700 hover:bg-green-50 px-4 py-2 rounded-[8px]"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" /> Revisión
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Tip if few studies */}
              {few && (
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-[16px] shadow-sm border border-blue-100 animate-fadeIn mt-6">
                  <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="bg-[#4E81BD]/10 p-4 rounded-full">
                      <Lightbulb className="h-10 w-10 text-[#4E81BD]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#333333] mb-2">Consejo para el profesor</h2>
                      <p className="text-[#666666] mb-4 max-w-md">
                        Motiva al estudiante a crear más estudios para enriquecer su perfil y mejorar su aprendizaje. Un
                        portafolio completo permite un mejor seguimiento de su progreso.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#333333]">Actividad reciente</h3>
                <Button variant="outline" size="sm" className="text-[#4E81BD] border-[#4E81BD]">
                  Ver todo
                </Button>
              </div>

              {recentActivity.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 bg-slate-50 rounded-[16px] border border-slate-200 text-center">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <History className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-lg font-medium text-[#333333] mb-2">Sin actividad reciente</p>
                  <p className="text-[#666666] mb-4">El estudiante no ha realizado actividades recientemente.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <Card key={activity.id} className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                      <div className="flex items-center gap-3">
                        {activity.type === "login" && (
                          <div className="bg-blue-100 p-2 rounded-full">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                        {activity.type === "study_view" && (
                          <div className="bg-purple-100 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                          </div>
                        )}
                        {activity.type === "profile_update" && (
                          <div className="bg-green-100 p-2 rounded-full">
                            <User className="h-5 w-5 text-green-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-[#333333] font-medium">
                            {activity.type === "login" && "Inicio de sesión"}
                            {activity.type === "study_view" && "Visualizó un estudio"}
                            {activity.type === "profile_update" && "Actualizó su perfil"}
                          </p>
                          <p className="text-sm text-[#666666]">
                            {activity.date.toLocaleDateString()} - {activity.date.toLocaleTimeString()}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-[#666666]" />
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === "notes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#333333]">Notas del profesor</h3>
                <Button className="bg-[#4E81BD] text-white">
                  <PlusCircle className="h-4 w-4 mr-1" /> Agregar nota
                </Button>
              </div>

              {teacherNotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 bg-slate-50 rounded-[16px] border border-slate-200 text-center">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-lg font-medium text-[#333333] mb-2">Sin notas</p>
                  <p className="text-[#666666] mb-4">No hay notas registradas para este estudiante.</p>
                  <Button className="bg-[#4E81BD]">
                    <PlusCircle className="h-4 w-4 mr-1" /> Agregar primera nota
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {teacherNotes.map((note) => (
                    <Card key={note.id} className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#333333]">{note.text}</p>
                          <p className="text-sm text-[#666666] mt-2">{note.date.toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <FileText className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <AlertCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recommended Resources */}
      <div className="bg-white rounded-[16px] shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#333333] flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-[#4E81BD]" />
            Recursos recomendados
          </h3>
          <Button variant="outline" size="sm" className="text-[#4E81BD] border-[#4E81BD]">
            Ver todos
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedResources.map((resource) => (
            <Card key={resource.id} className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center gap-3">
                {resource.type === "pdf" && (
                  <div className="bg-red-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                )}
                {resource.type === "video" && (
                  <div className="bg-purple-100 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                )}
                {resource.type === "protocol" && (
                  <div className="bg-green-100 p-2 rounded-full">
                    <ClipboardList className="h-5 w-5 text-green-600" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-[#333333] font-medium">{resource.title}</p>
                  <p className="text-xs text-[#666666] uppercase">{resource.type}</p>
                </div>
                <Button variant="outline" size="sm" className="text-[#4E81BD] border-[#4E81BD]">
                  Compartir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-[16px] shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-[#4E81BD]/10 p-4 rounded-full">
            <HelpCircle className="h-10 w-10 text-[#4E81BD]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-semibold text-[#333333] mb-2">¿Necesitas ayuda?</h2>
            <p className="text-[#666666] mb-4">
              Si tienes dudas sobre cómo evaluar a este estudiante o necesitas más información, consulta nuestra guía o
              contacta con soporte.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button variant="outline" className="border-[#4E81BD] text-[#4E81BD]">
                Ver guía de evaluación
              </Button>
              <Button className="bg-[#4E81BD]">Contactar soporte</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
