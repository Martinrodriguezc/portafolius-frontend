import { useState } from "react"
import { useTeacherStudents } from "../../hooks/teacher/teacher/Students/useTeacherStudents"
import { authService } from "../../hooks/auth/authServices"
import { PageHeader } from "../../components/teacher/allStudents/Header"
import { NotLoggedAlert } from "../../components/teacher/allStudents/NotLogged"
import { ErrorAlert } from "../../components/teacher/allStudents/Error"
import { SummaryCard } from "../../components/teacher/allStudents/SummaryCard"
import { StudentSearchBar } from "../../components/teacher/allStudents/StudentSearchBar"
import { StudentResults } from "../../components/teacher/allStudents/Results"

export default function TeacherStudentsPage() {
  const current = authService.getCurrentUser()
  const teacherId = current?.id
  const { students, loading, error } = useTeacherStudents(Number(teacherId))
  const [search, setSearch] = useState("")

  if (!teacherId) {
    return (
      <>
        <PageHeader />
        <NotLoggedAlert />
      </>
    )
  }

  if (loading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
            <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin mb-6"></div>
          </div>
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando estudiantes</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos recuperando la información de tus estudiantes. Esto tomará solo un momento.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />
        <ErrorAlert error={error} />
      </div>
    )
  }

  const filtered = students.filter(
    (s) =>
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader />
      <SummaryCard students={students} />
      <StudentSearchBar search={search} onSearchChange={(e) => setSearch(e.target.value)} />
      <StudentResults search={search} setSearch={setSearch} filtered={filtered} />
    </div>
  )
}
