import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();

  // Handler for successful login
  const handleLoginSuccess = () => {
    console.log('Login exitoso, redirigiendo...');
    // navigate('/dashboard');
  };

  // Handler to navigate to register page
  const handleNavigateToRegister = () => {
    navigate('/register');
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