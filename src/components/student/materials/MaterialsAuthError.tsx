import MaterialsHeader from './MaterialsHeader';
import { AlertCircle } from 'lucide-react';

export default function MaterialsAuthError() {
  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <MaterialsHeader />
      <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle className="h-7 w-7 text-red-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-[20px] font-semibold text-red-700 mb-3">
              Sesión expirada
            </h2>
            <p className="text-[15px] text-red-600">
              Tu sesión ha expirado o no has iniciado sesión. Por favor, inicia sesión nuevamente.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => (window.location.href = '/login')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[8px]"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
