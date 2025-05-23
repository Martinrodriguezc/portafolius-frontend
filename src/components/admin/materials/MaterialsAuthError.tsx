import { LockKeyhole } from 'lucide-react';

interface MaterialsAuthErrorProps {
  message?: string;
}

export default function MaterialsAuthError({ message }: MaterialsAuthErrorProps) {
  const defaultMessage = "No tienes permisos suficientes para acceder a la administración de materiales. Esta sección está reservada para administradores y profesores.";
  
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-amber-100 p-4 rounded-full mb-4">
        <LockKeyhole className="h-10 w-10 text-amber-500" />
      </div>
      <h3 className="text-xl font-semibold text-[#333333] mb-2">Acceso no autorizado</h3>
      <p className="text-[#666666] max-w-md">
        {message || defaultMessage}
      </p>
    </div>
  );
} 