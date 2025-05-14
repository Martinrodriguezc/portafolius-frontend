import React from "react";

export default function Settings(): React.ReactElement {
  return (

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Configuración
            </h1>
            <p className="text-gray-500">Ajusta los parámetros del sistema</p>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <p className="text-gray-500">Contenido de configuración en desarrollo</p>
            </div>
          </div>
        </div>
      </div>
  );
} 