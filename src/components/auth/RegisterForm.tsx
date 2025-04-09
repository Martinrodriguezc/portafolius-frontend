import { useRegisterForm } from '../../hooks/useRegisterForm';
import { TextInput, EmailInput, PasswordInput } from '../common/Input';

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
  onNavigateToLogin?: () => void;
}

export default function RegisterForm({ onRegisterSuccess, onNavigateToLogin }: RegisterFormProps = {}) {
  const {
    formData,
    formErrors,
    showPasswordRequirements,
    handleInputChange,
    handlePasswordFocus,
    handleSubmit
  } = useRegisterForm(onRegisterSuccess);

  return (
    <div>
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-[32px] font-bold text-[#4E81BD]">PortafoliUS</h1>
        <h2 className="text-[20px] font-bold text-[#333333] mt-4">Registrarse</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            id="firstName"
            label="Nombre"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            error={formErrors.firstName}
          />
          <TextInput
            id="lastName"
            label="Apellido"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            error={formErrors.lastName}
          />
        </div>

        <EmailInput
          id="email"
          label="Correo electrónico"
          required
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email}
        />

        <div className="space-y-2">
          <label htmlFor="userType" className="block text-[14px] text-[#333333]">
            Tipo de usuario <span className="text-red-500">*</span>
          </label>
          <select
            id="userType"
            className={`w-full h-[42px] text-[14px] border ${formErrors.userType ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
            value={formData.userType}
            onChange={handleInputChange}
          >
            <option value="" disabled>Selecciona tu rol</option>
            <option value="student">Estudiante</option>
            <option value="teacher">Profesor</option>
          </select>
          {formErrors.userType && (
            <p className="text-red-500 text-[12px] mt-1">{formErrors.userType}</p>
          )}
        </div>

        <PasswordInput
          id="password"
          label="Contraseña"
          required
          value={formData.password}
          onChange={handleInputChange}
          error={formErrors.password}
          showPasswordRequirements={showPasswordRequirements}
          onPasswordFocus={handlePasswordFocus}
        />

        <button 
          type="submit"
          className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-[12px] rounded-[8px] mt-4"
        >
          Registrarse
        </button>

        {onNavigateToLogin && (
          <div className="text-center mt-4">
            <span className="text-[13px] text-[#333333]">¿Ya tienes una cuenta? </span>
            <a 
              href="#" 
              className="text-[13px] font-bold text-[#4E81BD]"
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