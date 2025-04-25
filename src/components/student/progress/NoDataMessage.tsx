import React from "react";

interface NoDataMessageProps {
  title?: string;
  message?: string;
  icon?: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ 
  title = "No hay datos disponibles",
  message = "No hay información para mostrar en este momento",
  icon = ""
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon && (
        <img 
          src={icon} 
          alt="No hay datos" 
          className="w-20 h-20 mb-6 text-blue-400"
        />
      )}
      <h2 className="text-2xl font-medium text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 text-center">{message}</p>
    </div>
  );
};

export default NoDataMessage;
