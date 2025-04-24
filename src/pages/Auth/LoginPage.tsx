import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { authService } from "../../hooks/authServices";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    const user = authService.getCurrentUser();
    if (user) {
      if (user.role === 'profesor') {
        navigate('/teacher');
      } else if (user.role === 'estudiante') {
        navigate('/student');
      } else {
        console.warn('Rol desconocido:', user.role);
        navigate('/home');
      }
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFB] p-4">
      <div className="w-full max-w-md bg-white border-none shadow-sm rounded-[16px] p-8">
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={handleNavigateToRegister}
        />
      </div>
    </div>
  );
}
