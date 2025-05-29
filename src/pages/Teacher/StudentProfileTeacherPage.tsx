import { useState } from "react"
import { useParams } from "react-router-dom"
import { useStudentProfile } from "../../hooks/teacher/student/useStudentProfile"
import { useStudentStats }   from "../../hooks/teacher/student/stats/useStudentStats"
import { PageHeader }        from "../../components/teacher/StudentProfile/Header"
import { LoadingState }      from "../../components/teacher/StudentProfile/Loading"
import { ErrorState }        from "../../components/teacher/StudentProfile/Error"
import { StudentInfoCard }   from "../../components/teacher/StudentProfile/StudentInfoCard"
import { QuickActions }      from "../../components/teacher/StudentProfile/QuickActions"
import { TopMetrics }        from "../../components/teacher/StudentProfile/TopMetrics"
import { StudentTabs }       from "../../components/teacher/StudentProfile/StudentTabs"
import { HelpSection }       from "../../components/teacher/StudentProfile/HelpSection"
import StatisticsTable       from "../../components/teacher/StudentProfile/StatisticsTable"
import { Calendar }          from "lucide-react"

export default function StudentProfileTeacherPage() {
  const { id } = useParams<{ id: string }>()
  const studentId = Number(id)

  const {
    student,
    studentLoading,
    studentError,
    studies,
    studiesLoading,
    studiesError,
  } = useStudentProfile()

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useStudentStats(studentId)

  const [searchTerm, setSearchTerm]         = useState("")
  const [sortBy, setSortBy]                 = useState("date")
  const [statusFilter, setStatusFilter]     = useState("all")
  const [activeTab, setActiveTab]           = useState("studies")

  const total = studies.length
  const completedCount = studies.filter(s => s.status === "EVALUADO").length
  const average = completedCount > 0
    ? (
        studies
          .filter(s => s.status === "EVALUADO")
          .reduce((sum, s) => sum + (s.score || 0), 0) /
        completedCount
      ).toFixed(1)
    : "—"

  // Filtrado y ordenamiento de estudios
  const filtered = studies.filter(s => {
    const matchSearch = !searchTerm ||
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "evaluated" && s.status === "EVALUADO") ||
      (statusFilter === "pending"   && s.status !== "EVALUADO")
    return matchSearch && matchStatus
  })

  const sortedStudies = filtered.slice().sort((a, b) => {
    if (sortBy === "date")
      return Date.parse(b.created_at) - Date.parse(a.created_at)
    if (sortBy === "title")
      return a.title.localeCompare(b.title)
    if (sortBy === "status")
      return a.status === b.status
        ? 0
        : a.status === "EVALUADO"
        ? -1
        : 1
    if (sortBy === "score")
      return (b.score || 0) - (a.score || 0)
    return 0
  })

  // Placeholders
  const recentActivity      = [{ id: 1, type: "login", date: new Date() }]
  const teacherNotes        = [{ id: 1, text: "Nota de ejemplo", date: new Date() }]

  if (studentLoading || studiesLoading) {
    return (
      <div className="p-8">
        <PageHeader studentName="" studentEmail="" />
        <LoadingState title="Cargando perfil…" />
      </div>
    )
  }

  if (studentError || studiesError || !student) {
    return (
      <div className="p-8">
        <PageHeader studentName="" studentEmail="" />
        <ErrorState message={(studentError || studiesError)?.toString() || ""} />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 bg-slate-50">
      <PageHeader
        studentName={`${student.first_name} ${student.last_name}`}
        studentEmail={student.email}
      />

      <StudentInfoCard student={student} />
      <QuickActions />

      {/* ——— Sección Estadísticas de Protocolos ——— */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Calendar className="mr-2 text-gray-600" /> Protocolos evaluados
        </h2>
        {statsLoading ? (
          <p className="text-gray-500">Cargando estadísticas…</p>
        ) : statsError ? (
          <p className="text-red-500">Error al cargar estadísticas</p>
        ) : (
          <StatisticsTable data={stats?.protocolCounts || []} />
        )}
      </section>

      <TopMetrics
        total={total}
        completedCount={completedCount}
        average={average}
        studies={studies}
      />

      <StudentTabs
        studentId={id!}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortedStudies={sortedStudies}
        recentActivity={recentActivity}
        teacherNotes={teacherNotes}
      />

      <HelpSection />
    </div>
  )
}