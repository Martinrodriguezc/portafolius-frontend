import { Link } from "react-router-dom";
import Card from "../../../components/common/Card/Card";
import Button from "../../../components/common/Button/Button";
import {
  useStudentStudies,
  Study,
} from "../../../hooks/student/Studies/useStudentStudies";
import { BookOpen } from "lucide-react";

export default function StudentStudiesPage() {
  const { studies, loading, error } = useStudentStudies();

  if (loading) return <p className="p-8">Cargando estudios…</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;
  if (studies.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center
                      min-h-[70vh] p-16
                      bg-slate-50 border border-slate-200 rounded-xl bg-white m-6"
      >
        <BookOpen className="h-16 w-16 text-[#4E81BD] mb-6" />
        <p className="text-2xl font-semibold text-[#333333] mb-2">
          No hay estudios disponibles
        </p>
        <p className="text-base text-[#A0A0A0] mb-6 text-center">
          Crea o sube un estudio para que aparezca en esta lista.
        </p>
        <Link to="/student/upload">
          <Button
            className="bg-[#4E81BD] hover:bg-[#4E81BD]/90
                             text-base font-medium
                             py-3 px-8 rounded-lg"
          >
            Subir Videos
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Mis Estudios</h1>
        <p className="text-[#A0A0A0]">
          Revisa tus estudios evaluados y pendientes de evaluación
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studies.map((study: Study) => (
          <Card className="rounded-[16px] mb-6" key={study.id}>
            <h2 className="text-lg font-medium mb-2">{study.title}</h2>
            <p className="text-sm text-gray-600">
              Protocolo: {study.protocol.toUpperCase()}
            </p>
            <p className="text-sm text-gray-600">
              Estado: {study.status.toUpperCase()}
            </p>
            {study.status === "EVALUADO" && study.score !== null && (
              <p className="text-sm text-blue-600 font-semibold">
                Calificación: {study.score}/10
              </p>
            )}
            <p className="text-sm text-gray-600">
              Creado: {new Date(study.created_at).toLocaleDateString()}
            </p>
            <Link to={`/student/studies/${study.id}/videos`}>
              <Button className="mt-4 w-full">Ver videos</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
