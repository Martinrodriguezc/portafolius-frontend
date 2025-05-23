import { Loader } from 'lucide-react';

export default function MaterialsLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-slate-100 p-4 rounded-full mb-4">
        <Loader className="h-10 w-10 text-slate-400 animate-spin" />
      </div>
      <h3 className="text-xl font-semibold text-[#333333] mb-2">Cargando materiales</h3>
      <p className="text-[#666666] max-w-md">
        Estamos recuperando la información de los materiales. Por favor, espera un momento...
      </p>
    </div>
  );
} 