import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { StudentProfileViewProps } from "../../types/Teacher";

export default function StudentProfileView({
  student,
  studies,
  loadingStudies,
  errorStudies,
}: StudentProfileViewProps) {
  const nav = useNavigate();

  return (
    <div className="p-8">
      <h1 className="mb-6 text-[20px] font-bold">
        Perfil de {student.first_name} {student.last_name}
      </h1>
      <Card className="p-6 space-y-4 mb-8">
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => nav(-1)}>
            Volver
          </Button>
        </div>
      </Card>

      <h2 className="text-[18px] font-semibold mb-4">Estudios</h2>
      {loadingStudies && <p>Cargando estudios…</p>}
      {errorStudies && <p className="text-red-500">Error: {errorStudies}</p>}
      {!loadingStudies && !errorStudies && studies.length === 0 && (
        <p>No hay estudios para este estudiante.</p>
      )}
      {!loadingStudies && !errorStudies && studies.length > 0 && (
        <div className="space-y-4">
          {studies.map((st) => (
            <Card key={st.id} className="p-4">
              <h3 className="font-medium">{st.title}</h3>
              <p className="text-sm text-gray-500">
                Protocolo: {st.protocol || "—"}
              </p>
              <p className="text-sm text-gray-500">Estado: {st.status}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
