import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";

import { useStudentProfile } from "../../hooks/teacher/student/useStudentProfile";
import { useStudentProfileTeacherPage } from "../../hooks/teacher/student/useStudentProfileTeacherPage";
import { authService } from "../../hooks/auth/authServices";

export interface Props {
  mode: "create" | "view";
}

export default function StudentProfileTeacherPage({ mode }: Props) {
  const nav = useNavigate();
  const teacher = authService.getCurrentUser();

  const {
    student,
    studentLoading,
    studentError,
    studies,
    studiesLoading,
    studiesError,
  } = useStudentProfile();

  const {
    form,
    handleChange,
    handleSubmit,
    showPasswordRequirements,
    formError,
  } = useStudentProfileTeacherPage("create");

  if (!teacher) {
    return <p className="p-8 text-red-500">Debes iniciar sesión</p>;
  }

  if (mode === "view") {
    if (studentLoading) return <p className="p-8">Cargando perfil…</p>;
    if (studentError)
      return <p className="p-8 text-red-500">Error: {studentError}</p>;
    if (!student) return <p className="p-8">Estudiante no encontrado</p>;

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

        {studiesLoading && <p>Cargando estudios…</p>}
        {studiesError && <p className="text-red-500">Error: {studiesError}</p>}

        {!studiesLoading && !studiesError && studies.length === 0 && (
          <p>No hay estudios para este estudiante.</p>
        )}

        {!studiesLoading && !studiesError && studies.length > 0 && (
          <div className="space-y-4">
            {studies.map((st) => (
              <Card key={st.id} className="p-4">
                <h3 className="font-medium">{st.title}</h3>
                <p className="text-sm text-gray-500">
                  Descripcion: {st.description || "—"}
                </p>
                <p className="text-sm text-gray-500">Estado: {st.status}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-[20px] font-bold mb-6">Añadir nuevo estudiante</h1>

      <Card className="p-6 space-y-4">
        {formError && <p className="text-red-500">{formError}</p>}

        <div>
          <label className="block mb-1">First Name</label>
          <Input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Last Name</label>
          <Input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {showPasswordRequirements && (
            <ul className="mt-2 ml-4 text-sm text-red-500 list-disc">
              <li>Al menos 8 caracteres</li>
            </ul>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => nav(-1)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </div>
      </Card>
    </div>
  );
}
