// StudentProfileTeacherPage.tsx
import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BookOpen, ClipboardList, Lightbulb, PlusCircle } from "lucide-react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { useStudentProfile } from "../../hooks/teacher/student/useStudentProfile";

export default function StudentProfileTeacherPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const nav = useNavigate();

  const {
    student,
    studentLoading,
    studentError,
    studies,
    studiesLoading,
    studiesError,
  } = useStudentProfile();

  // summary metrics
  const total = studies.length;
  const completedCount = studies.filter((s) => s.status === "EVALUADO").length;
  const average =
    completedCount > 0
      ? (
          studies
            .filter((s) => s.status === "EVALUADO")
            .reduce((sum, s) => sum + (s.score || 0), 0) /
          completedCount
        ).toFixed(1)
      : "—";

  if (studentLoading || studiesLoading) {
    return <p className="p-8 text-center text-gray-600">Cargando información…</p>;
  }
  if (studentError || studiesError || !student) {
    return (
      <p className="p-8 text-center text-red-500">
        Error al cargar datos.{" "}
        <Button variant="outline" onClick={() => nav(0)}>
          Reintentar
        </Button>
      </p>
    );
  }

  const few = total > 0 && total <= 2;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {student.first_name} {student.last_name}
            </h1>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
        </div>
        <Link to={`/teacher/students/${studentId}/edit`}>
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Editar perfil
          </Button>
        </Link>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow">
          <BookOpen className="h-8 w-8 text-blue-500 mr-4" />
          <div>
            <p className="text-sm text-blue-800">Total estudios</p>
            <p className="text-2xl font-bold text-gray-900">{total}</p>
          </div>
        </Card>
        <Card className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow">
          <ClipboardList className="h-8 w-8 text-green-500 mr-4" />
          <div>
            <p className="text-sm text-green-800">Completados</p>
            <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
          </div>
        </Card>
        <Card className="flex items-center p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl shadow">
          <Lightbulb className="h-8 w-8 text-amber-500 mr-4" />
          <div>
            <p className="text-sm text-amber-800">Promedio</p>
            <p className="text-2xl font-bold text-gray-900">{average}/10</p>
          </div>
        </Card>
      </div>

      {/* Studies list with add button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Estudios</h2>
        <Link to={`/teacher/students/${studentId}/studies/new`}>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Agregar Estudio
          </Button>
        </Link>
      </div>

      {/* No studies */}
      {total === 0 && (
        <Card className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl shadow-inner text-center">
          <BookOpen className="h-12 w-12 text-blue-500 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">Sin estudios</p>
          <p className="text-gray-600 mb-4">
            Este estudiante no ha creado estudios aún.
          </p>
          <Link to={`/teacher/students/${studentId}/studies/new`}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Crear Primer Estudio
            </Button>
          </Link>
        </Card>
      )}

      {/* Studies grid; center single item */}
      {total > 0 && (
        <div
          className={
            total === 1
              ? "flex justify-center"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          }
        >
          {studies.map((st) => (
            <Card
              key={st.id}
              className="p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow max-w-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{st.title}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    st.status === "EVALUADO"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {st.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{st.description || "—"}</p>
              <Link
                to={`/teacher/students/${studentId}/studies/${st.id}`}
                className="block"
              >
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Ver detalles
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}

      {/* Tip if few studies */}
      {few && total > 0 && (
        <Card className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-200 mt-8">
          <Lightbulb className="h-6 w-6 text-amber-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-900 mb-1">Tip</p>
            <p className="text-gray-600">
              Motiva al estudiante a crear más estudios para enriquecer su perfil.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
