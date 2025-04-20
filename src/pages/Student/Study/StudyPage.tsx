import { Link } from 'react-router-dom';
import Card from '../../../components/common/Card/Card';
import Button from '../../../components/common/Button/Button';
import { useStudentStudies, Study } from '../../../hooks/student/useStudentStudies';

export default function StudentStudiesPage() {
  const { studies, loading, error } = useStudentStudies();

  if (loading) return <p className="p-8">Cargando estudios…</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Mis Estudios</h1>
        <p className="text-[#A0A0A0]">
          Revisa tus videos evaluados y pendientes de evaluación
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studies.map((study: Study) => (
          <Card className="rounded-[16px] mb-6" key={study.id}>
            <h2 className="text-lg font-medium mb-2">{study.title}</h2>
            <p className="text-sm text-gray-600">
              Protocolo: {study.protocol}
            </p>
            <p className="text-sm text-gray-600">Estado: {study.status}</p>
            <p className="text-sm text-gray-600">
              Creado: {new Date(study.created_at).toLocaleDateString()}
            </p>
            <Link to={`/student/studies/${study.id}/videos`}>
              <Button className="mt-4 w-full">
                Ver videos
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
