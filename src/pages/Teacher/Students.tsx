import { Link } from "react-router-dom";
import { Search, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import Input from "../../components/common/Input/Input";
import StudentsPreviewInfo from "../../components/teacher/StudentsPreviewInfo";
import { useTeacherStudents } from "../../hooks/teacher/teacher/Students/useTeacherStudents";
import { authService } from "../../hooks/auth/authServices";
import { TeacherStudent } from "../../types/student";

export default function TeacherStudentsPage() {
  const current = authService.getCurrentUser();
  const teacherId = current?.id;
  const { students, loading, error } = useTeacherStudents(Number(teacherId));
  const [search, setSearch] = useState("");

  if (!teacherId) return <p className="p-8 text-red-500">Debes iniciar sesión</p>;
  if (loading) return <p className="p-8">Cargando estudiantes…</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;

  const filtered = students.filter(
    (s) =>
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-[20px] font-bold">Estudiantes</h1>
          <p className="text-[#A0A0A0]">Gestiona y supervisa tu cohorte</p>
        </div>
        <Link to="/teacher/students/new">
          <Button>
            <UserPlus className="mr-2" /> Añadir Estudiante
          </Button>
        </Link>
      </header>

      <Card className="mb-6 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" />
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-lg">
            <Users className="h-12 w-12 text-gray-500 mb-4" />
            <p className="text-lg font-medium text-[#333333]">
              No hay estudiantes
            </p>
            <p className="text-sm text-[#A0A0A0] mt-1 text-center">
              Ajusta tu búsqueda o añade nuevos estudiantes.
            </p>
          </Card>
        ) : (
          filtered.map((s: TeacherStudent) => (
            <Card key={s.id} className="p-4">
              <StudentsPreviewInfo student={s} />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
