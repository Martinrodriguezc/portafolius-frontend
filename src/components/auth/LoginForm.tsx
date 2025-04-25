import { useLoginForm } from "../../hooks/form/useLoginForm";
import { LoginFormProps } from "../../types/form/Login";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";

export default function LoginForm({
  onLoginSuccess,
  onNavigateToRegister,
}: LoginFormProps) {
  const {
    email,
    password,
    emailError,
    passwordError,
    handleInputChange,
    handleSubmit,
    handleGoogleLogin,
  } = useLoginForm(onLoginSuccess);

  return (
    <div>
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-[32px] font-bold text-[#4E81BD]">PortafoliUS</h1>
        <h2 className="text-[20px] font-bold text-[#333333] mt-4">
          Iniciar sesión
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          required
          value={email}
          onChange={handleInputChange}
          error={emailError}
        />

        <Input
          id="password"
          label="Contraseña"
          type="password"
          required
          value={password}
          onChange={handleInputChange}
          error={passwordError}
        />

        <Button fixedWidth={false}>Iniciar Sesión</Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#A0A0A0]/30"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-[#A0A0A0]">O continúa con</span>
          </div>
        </div>

        <Button
          variant="google"
          fixedWidth={false}
          onClick={handleGoogleLogin}
          type="button"
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
          Iniciar sesión con Google
        </Button>

        {onNavigateToRegister && (
          <div className="text-center mt-4">
            <span className="text-[13px] text-[#333333]">
              ¿No tienes una cuenta?{" "}
            </span>
            <a
              href="#"
              className="text-[13px] font-bold text-[#4E81BD]"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToRegister();
              }}
            >
              Regístrate
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
