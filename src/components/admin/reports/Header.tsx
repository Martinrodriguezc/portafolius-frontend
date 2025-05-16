import React from "react";

interface HeaderProps {
  title: string;
  ultimaActualizacion: Date;
  onRefrescar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, ultimaActualizacion, onRefrescar }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">
          Última actualización: {ultimaActualizacion.toLocaleTimeString('es-ES')}
        </span>
        <button
          onClick={onRefrescar}
          className="flex items-center space-x-1 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-md hover:bg-sky-100 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          <span>Actualizar</span>
        </button>
      </div>
    </div>
  );
};

export default Header; 