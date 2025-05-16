import React from "react";
import { PromedioUsuarios } from "../../../../hooks/admin/metricsServices";

interface TablasPromedioProps {
  data: PromedioUsuarios;
}

const TablasPromedio: React.FC<TablasPromedioProps> = ({ data }) => {
  const { top_usuarios, bottom_usuarios } = data;
  
  // Función para renderizar las estrellas basadas en la calificación
  const renderEstrellas = (promedio: number) => {
    // Normalizar el promedio a una escala de 5 estrellas
    // Asumimos que las calificaciones están en escala de 0-10
    const estrellas = (promedio / 10) * 5;
    const estrellasEnteras = Math.floor(estrellas);
    const fraccion = estrellas - estrellasEnteras;
    
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < estrellasEnteras) {
            // Estrella completa
            return (
              <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else if (i === estrellasEnteras && fraccion > 0) {
            // Estrella parcial
            return (
              <div key={i} className="relative h-4 w-4">
                <svg className="absolute h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="absolute h-4 w-4 text-yellow-400 overflow-hidden" fill="currentColor" viewBox="0 0 20 20" style={{ clipPath: `inset(0 ${(1 - fraccion) * 100}% 0 0)` }}>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            );
          } else {
            // Estrella vacía
            return (
              <svg key={i} className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          }
        })}
      </div>
    );
  };
  
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex-1 overflow-y-auto">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Top Estudiantes</h4>
        <table className="w-full">
          <thead className="text-xs text-gray-700">
            <tr>
              <th className="py-1 text-left">#</th>
              <th className="py-1 text-left">Estudiante</th>
              <th className="py-1 text-center">Promedio</th>
              <th className="py-1 text-right pr-2">Evaluaciones</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {top_usuarios.map((usuario, index) => (
              <tr 
                key={usuario.id} 
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
              >
                <td className="py-1.5 pl-2 font-medium">{index + 1}</td>
                <td className="py-1.5 truncate max-w-[120px]">{usuario.nombre_completo}</td>
                <td className="py-1.5 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-gray-900">{usuario.promedio.toFixed(1)}</span>
                    <div className="mt-0.5">{renderEstrellas(usuario.promedio)}</div>
                  </div>
                </td>
                <td className="py-1.5 text-right pr-2">{usuario.cantidad_evaluaciones}</td>
              </tr>
            ))}
            
            {top_usuarios.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Rendimiento Bajo</h4>
        <table className="w-full">
          <thead className="text-xs text-gray-700">
            <tr>
              <th className="py-1 text-left">#</th>
              <th className="py-1 text-left">Estudiante</th>
              <th className="py-1 text-center">Promedio</th>
              <th className="py-1 text-right pr-2">Evaluaciones</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {bottom_usuarios.map((usuario, index) => (
              <tr 
                key={usuario.id} 
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
              >
                <td className="py-1.5 pl-2 font-medium">{index + 1}</td>
                <td className="py-1.5 truncate max-w-[120px]">{usuario.nombre_completo}</td>
                <td className="py-1.5 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-gray-900">{usuario.promedio.toFixed(1)}</span>
                    <div className="mt-0.5">{renderEstrellas(usuario.promedio)}</div>
                  </div>
                </td>
                <td className="py-1.5 text-right pr-2">{usuario.cantidad_evaluaciones}</td>
              </tr>
            ))}
            
            {bottom_usuarios.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablasPromedio; 