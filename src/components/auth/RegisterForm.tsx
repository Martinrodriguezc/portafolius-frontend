import { useRegisterForm } from "../../hooks/form/useRegisterForm";
import { RegisterFormProps } from "../../types/register";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";

export default function RegisterForm({
  onRegisterSuccess,
  onNavigateToLogin,
}: RegisterFormProps) {
  const {
    formData,
    formErrors,
    showPasswordRequirements,
    handleInputChange,
    handlePasswordFocus,
    handleSubmit,
  } = useRegisterForm(onRegisterSuccess);

  return (
    <div className="max-w-lg mx-auto p-6">
      <header className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-[#4E81BD]">PortafoliUS</h1>
        <h2 className="text-xl font-bold text-[#333333] mt-4">Registrarse</h2>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            label="Nombre"
            type="text"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            error={formErrors.firstName}
          />
          <Input
            id="lastName"
            label="Apellido"
            type="text"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            error={formErrors.lastName}
          />
        </div>

        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email}
        />

        <div className="space-y-2">
          <label
            htmlFor="userType"
            className="block text-sm text-[#333333] font-medium"
          >
            Tipo de usuario <span className="text-red-500">*</span>
          </label>
          <select
            id="userType"
            className={`w-full h-10 text-sm border ${
              formErrors.userType ? "border-red-500" : "border-[#A0A0A0]"
            } rounded-md px-3 focus:outline-none focus:ring focus:border-blue-300`}
            value={formData.userType}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Selecciona tu rol
            </option>
            <option value="student">Estudiante</option>
            <option value="teacher">Profesor</option>
          </select>
          {formErrors.userType && (
            <p className="text-red-500 text-xs mt-1">{formErrors.userType}</p>
          )}
        </div>

        <Input
          id="password"
          label="Contraseña"
          type="password"
          required
          value={formData.password}
          onChange={handleInputChange}
          error={formErrors.password}
          showPasswordRequirements={showPasswordRequirements}
          onFocus={handlePasswordFocus}
        />

        <Button
          type="submit"
          fixedWidth={false}
        >
          Registrarse
        </Button>

        {onNavigateToLogin && (
          <div className="text-center mt-4">
            <span className="text-xs text-[#333333]">
              ¿Ya tienes una cuenta?{" "}
            </span>
            <a
              href="#"
              className="text-xs font-bold text-[#4E81BD] hover:underline"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToLogin();
              }}
            >
              Inicia sesión
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
