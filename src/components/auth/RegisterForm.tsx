import { useRegisterForm } from '../../hooks/useRegisterForm';

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
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-[14px] text-[#333333]">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              placeholder="Tu nombre"
              className={`w-full h-[42px] text-[14px] border ${formErrors.firstName ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-[12px] mt-1">{formErrors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-[14px] text-[#333333]">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              placeholder="Tu apellido"
              className={`w-full h-[42px] text-[14px] border ${formErrors.lastName ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-[12px] mt-1">{formErrors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-[14px] text-[#333333]">
            Correo electrónico <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            className={`w-full h-[42px] text-[14px] border ${formErrors.email ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <p className="text-red-500 text-[12px] mt-1">{formErrors.email}</p>
          )}
        </div>

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

        <div className="space-y-2">
          <label htmlFor="password" className="block text-[14px] text-[#333333]">
            Contraseña <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            className={`w-full h-[42px] text-[14px] border ${formErrors.password ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
            value={formData.password}
            onChange={handleInputChange}
            onFocus={handlePasswordFocus}
          />
          {showPasswordRequirements && (
            <div className="text-[12px] text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 mt-1">
              La contraseña debe tener:
              <ul className="list-disc pl-5 mt-1">
                <li>Mínimo 8 caracteres</li>
                <li>Al menos un símbolo especial (!@#$%^&*)</li>
                <li>Al menos una letra en mayúscula</li>
              </ul>
            </div>
          )}
          {formErrors.password && (
            <p className="text-red-500 text-[12px] mt-1">{formErrors.password}</p>
          )}
        </div>

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