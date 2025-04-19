import { useStudentForm } from "../../hooks/teacher/useStudentForm";
import StudentFormFields from "../../components/teacher/StudentFormFields";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";

interface StudentProfileProps {
  mode: "view" | "create";
}

export default function StudentProfileTeacherPage({
  mode,
}: StudentProfileProps) {
  const {
    formState,
    handleChange,
    handleSubmit,
    navigate,
    notFound,
    existingStudent,
  } = useStudentForm(mode);

  if (notFound) {
    return <div className="p-8">Estudiante no encontrado</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-[20px] font-bold text-[#333333] mb-6">
        {mode === "create"
          ? "Añadir nuevo estudiante"
          : `Perfil de ${existingStudent!.name}`}
      </h1>

      <Card className="p-6 space-y-6">
        <StudentFormFields
          formState={formState!}
          handleChange={handleChange}
          readOnly={mode === "view"}
        />

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate("/teacher/students")}
          >
            Volver
          </Button>
          {mode === "create" && (
            <Button onClick={handleSubmit}>Guardar estudiante</Button>
          )}
        </div>
      </Card>
    </div>
  );
}