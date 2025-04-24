import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import { useStudentForm } from "../../hooks/teacher/useStudentForm";

export default function StudentProfileCreate() {
  const nav = useNavigate();
  const { form, handleChange, handleSubmit, error: formError } =
    useStudentForm();

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