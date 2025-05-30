import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "../../hooks/form/useRegisterForm";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

export default function NewStudentForm() {
  const navigate = useNavigate();

  const {
    formData,
    formErrors,
    showPasswordRequirements,
    handleInputChange,
    handlePasswordFocus,
    handleSubmit,
    errorMessage,
  } = useRegisterForm(() => {
    navigate("/teacher/students");
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFB] p-4">
      <div className="w-full max-w-md bg-white rounded-[16px] shadow-sm p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Añadir estudiante</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="firstName"
              label="Nombre"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              error={formErrors.firstName}
            />
            <Input
              id="lastName"
              label="Apellido"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              error={formErrors.lastName}
            />
          </div>

          <Input
            id="email"
            label="Correo electrónico"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={formErrors.email}
          />

          <div className="space-y-1">
            <label htmlFor="role" className="block text-sm font-medium text-[#333333]">
              Tipo de usuario
            </label>
            <select
              id="role"
              value="estudiante"
              onChange={handleInputChange}
              className="w-full h-10 border border-slate-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="estudiante">Estudiante</option>
            </select>
            {formErrors.role && (
              <p className="text-red-500 text-xs mt-1">{formErrors.role}</p>
            )}
          </div>

          <Input
            id="password"
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={formErrors.password}
            showPasswordRequirements={showPasswordRequirements}
            onFocus={handlePasswordFocus}
          />

          {errorMessage && (
            <div
              role="alert"
              className="flex items-center gap-2 bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md"
            >
              <span className="text-xl"></span>
              <p className="text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          <Button type="submit" className="w-full bg-[#4E81BD] text-white py-2 rounded">
            Crear estudiante
          </Button>
        </form>
      </div>
    </div>
  );
}