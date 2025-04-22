import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../hooks/authServices';
import Button from '../common/Button/Button';

export default function RoleSelectionForm() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.updateUserRole(role);
      if (role === 'profesor') {
        navigate('/teacher');
      } else {
        navigate('/student');
      }
    } catch (error) {
      console.error('Error al actualizar rol:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFB]">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Selecciona tu rol</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Button
              type="button"
              variant={role === 'estudiante' ? 'primary' : 'secondary'}
              onClick={() => setRole('estudiante')}
              fixedWidth={false}
            >
              Estudiante
            </Button>
            <Button
              type="button"
              variant={role === 'profesor' ? 'primary' : 'secondary'}
              onClick={() => setRole('profesor')}
              fixedWidth={false}
            >
              Profesor
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#A0A0A0]/30"></div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={!role}
            fixedWidth={false}
          >
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
} 