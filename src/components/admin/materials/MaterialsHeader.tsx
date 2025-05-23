import { Plus } from 'lucide-react';

interface MaterialsHeaderProps {
  onAddMaterial: () => void;
}

export default function MaterialsHeader({ onAddMaterial }: MaterialsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-[#333333]">Gestión de Materiales</h1>
        <p className="text-[#666666]">
          Administra todos los documentos, videos y enlaces disponibles en la plataforma
        </p>
      </div>
      <button
        onClick={onAddMaterial}
        className="bg-[#4E81BD] hover:bg-[#3A6491] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Añadir Material</span>
      </button>
    </div>
  );
} 