import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    console.log("Registro exitoso, redirigiendo a login...");
    navigate("/login");
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFB] p-4">
      <div className="w-full max-w-md bg-white border-none shadow-sm rounded-[16px] p-8">
        <RegisterForm
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateToLogin={handleNavigateToLogin}
        />
      </div>
    </div>
  );
}