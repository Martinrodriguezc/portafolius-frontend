import { useLoginForm } from '../../hooks/useAuthForms';
import { LoginFormProps } from '../../types/auth';

export default function LoginForm({ onSwitchTab, onLoginSuccess }: LoginFormProps) {
  const {
    email,
    password,
    emailError,
    passwordError,
    handleInputChange,
    handleSubmit
  } = useLoginForm(onLoginSuccess);

  return (
    <div>
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-[32px] font-bold text-[#4E81BD]">PortafoliUS</h1>
        <h2 className="text-[20px] font-bold text-[#333333] mt-4">Iniciar sesión</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-[14px] text-[#333333]">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            className={`w-full h-[42px] text-[14px] border ${emailError ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
            value={email}
            onChange={handleInputChange}
          />
          {emailError && (
            <p className="text-red-500 text-[12px] mt-1">{emailError}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-[14px] text-[#333333]">
              Contraseña
            </label>
            <a href="#" className="text-[13px] text-[#4E81BD]">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <input
            id="password"
            type="password"
            className={`w-full h-[42px] text-[14px] border ${passwordError ? 'border-red-500' : 'border-[#A0A0A0]'} rounded-[8px] px-3`}
            value={password}
            onChange={handleInputChange}
          />
          {passwordError && (
            <p className="text-red-500 text-[12px] mt-1">{passwordError}</p>
          )}
        </div>
        <button 
          type="submit"
          className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-[12px] rounded-[8px] mt-4"
        >
          Iniciar Sesión
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#A0A0A0]/30"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-[#A0A0A0]">O continúa with</span>
          </div>
        </div>

        <button 
          type="button"
          className="w-full border border-[#A0A0A0] text-[14px] font-medium py-[12px] rounded-[8px] flex items-center justify-center"
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Iniciar sesión with Google
        </button>

        <div className="text-center mt-4">
          <span className="text-[13px] text-[#333333]">¿No tienes una cuenta? </span>
          <a 
            href="#" 
            className="text-[13px] font-bold text-[#4E81BD]"
            onClick={(e) => {
              e.preventDefault();
              onSwitchTab();
            }}
          >
            Regístrate
          </a>
        </div>
      </form>
    </div>
  );
} 