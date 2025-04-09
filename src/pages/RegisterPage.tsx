import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

export default function RegisterPage() {
  const navigate = useNavigate();

  // Handler for successful registration
  const handleRegisterSuccess = () => {
    // Redirigir al usuario a la página de login después del registro exitoso
    console.log('Registro exitoso, redirigiendo a login...');
    navigate('/login');
  };

  // Handler to navigate to login page
  const handleNavigateToLogin = () => {
    navigate('/login');
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