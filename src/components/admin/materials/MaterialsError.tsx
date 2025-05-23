import { AlertCircle } from 'lucide-react';

interface MaterialsErrorProps {
  message?: string;
  onRetry: () => void;
}

export default function MaterialsError({
  message = 'Ha ocurrido un error al cargar los materiales',
  onRetry,
}: MaterialsErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-red-100 p-4 rounded-full mb-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-[#333333] mb-2">Error al cargar datos</h3>
      <p className="text-[#666666] max-w-md mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-[#4E81BD] text-white rounded-md hover:bg-[#3A6491] transition-colors"
      >
        Intentar nuevamente
      </button>
    </div>
  );
} 