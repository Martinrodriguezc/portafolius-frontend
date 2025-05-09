import { Link } from "react-router-dom"
import { Search, UserPlus, Users, AlertCircle, RefreshCw, Filter, AArrowUpIcon as SortAscending } from "lucide-react"
import { useState } from "react"
import Button from "../../components/common/Button/Button"
import Card from "../../components/common/Card/Card"
import Input from "../../components/common/Input/Input"
import StudentsPreviewInfo from "../../components/teacher/StudentsPreviewInfo"
import { useTeacherStudents } from "../../hooks/teacher/teacher/Students/useTeacherStudents"
import { authService } from "../../hooks/auth/authServices"
import type { TeacherStudent } from "../../types/student"

export default function TeacherStudentsPage() {
  const current = authService.getCurrentUser()
  const teacherId = current?.id
  const { students, loading, error } = useTeacherStudents(Number(teacherId))
  const [search, setSearch] = useState("")

  const PageHeader = () => (
    <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#4E81BD]/10 p-2 rounded-full">
            <Users className="h-6 w-6 text-[#4E81BD]" />
          </div>
          <h1 className="text-[24px] font-bold text-[#333333]">Estudiantes</h1>
        </div>
        <p className="text-[#666666] ml-12">Gestiona y supervisa tu cohorte de estudiantes</p>
      </div>
      <Link to="/teacher/students/new">
        <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2 w-full md:w-auto">
          <UserPlus className="h-5 w-5" /> Añadir Estudiante
        </Button>
      </Link>
    </header>
  )

  if (!teacherId) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0 self-center md:self-start">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">Sesión expirada</h2>
              <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                Tu sesión ha expirado o no has iniciado sesión. Por favor, inicia sesión nuevamente para acceder a la
                gestión de estudiantes.
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-center md:justify-start">
            <button
              onClick={() => {
                window.location.href = "/login"
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[8px] flex items-center shadow-sm hover:shadow transition-all"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
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

        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0 self-center md:self-start">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">Error al cargar estudiantes</h2>
              <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                {error.toString() || "Ha ocurrido un error al obtener la lista de estudiantes."}
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

  const filtered = students.filter(
    (s) =>
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader />

      {/* Students Summary Card */}
      <div className="mb-8 bg-gradient-to-r from-[#4E81BD]/5 to-[#4E81BD]/10 rounded-[16px] shadow-sm border border-[#4E81BD]/20 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#4E81BD]/20 p-3 rounded-full">
              <Users className="h-8 w-8 text-[#4E81BD]" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#333333]">Resumen de estudiantes</h2>
              <p className="text-[#666666]">
                Tienes <span className="font-medium text-[#4E81BD]">{students.length}</span>{" "}
                {students.length === 1 ? "estudiante" : "estudiantes"} en tu cohorte
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link to="/teacher/students/new">
              <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-4 py-2 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2">
                <UserPlus className="h-4 w-4" /> Añadir
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
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

      {/* Search Results */}
      {search && (
        <div className="mb-4">
          <p className="text-[#666666]">
            <span className="font-medium text-[#333333]">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "estudiante encontrado" : "estudiantes encontrados"} para "
            <span className="text-[#4E81BD]">{search}</span>"
          </p>
        </div>
      )}

      <div className="space-y-4 animate-fadeIn">
        {filtered.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-[16px] shadow-sm">
            <Users className="h-16 w-16 text-slate-400 mb-4" />
            <p className="text-xl font-medium text-[#333333] mb-2">No hay estudiantes</p>
            <p className="text-[#666666] mt-1 text-center max-w-md">
              {search
                ? "No se encontraron estudiantes que coincidan con tu búsqueda. Intenta con otros términos."
                : "Aún no has añadido estudiantes a tu cohorte. Añade estudiantes para comenzar a gestionar su progreso."}
            </p>
            {search ? (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-[#4E81BD] hover:text-[#4E81BD]/80 transition-colors"
              >
                Limpiar búsqueda
              </button>
            ) : (
              <Link to="/teacher/students/new" className="mt-6">
                <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] shadow-sm hover:shadow transition-all flex items-center gap-2">
                  <UserPlus className="h-5 w-5" /> Añadir Estudiante
                </Button>
              </Link>
            )}
          </Card>
        ) : (
          filtered.map((s: TeacherStudent) => (
            <Card
              key={s.id}
              className="p-5 rounded-[16px] border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <StudentsPreviewInfo student={s} />
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
