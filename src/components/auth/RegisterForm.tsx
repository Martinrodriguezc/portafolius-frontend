import { useRegisterForm } from "../../hooks/form/useRegisterForm";
import { RegisterFormProps } from "../../types/form/Register";
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
    errorMessage,
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

        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block text-sm text-[#333333] font-medium"
          >
            Tipo de usuario <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            className={`w-full h-10 text-sm border ${formErrors.role ? "border-red-500" : "border-[#A0A0A0]"
              } rounded-md px-3 focus:outline-none focus:ring focus:border-blue-300`}
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Selecciona tu rol
            </option>
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
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
            className="flex items-center gap-2 bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md mb-4"
          >
            <span aria-hidden="true" className="text-xl">⚠️</span>
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        <Button type="submit" fixedWidth={false}>
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
