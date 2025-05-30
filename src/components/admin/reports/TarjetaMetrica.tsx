import React, { ReactNode } from "react";

interface TarjetaMetricaProps {
  title: string | ReactNode;
  description?: string;
  children: ReactNode;
  exportarCSV?: () => void;
}

const TarjetaMetrica: React.FC<TarjetaMetricaProps> = ({ title, description, children, exportarCSV }) => {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {exportarCSV && (
          <button
            onClick={exportarCSV}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Exportar CSV</span>
          </button>
        )}
      </div>
      {description && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}
      <div className="flex-1 min-h-[300px] md:min-h-[350px]">
        {children}
      </div>
    </div>
  );
};

export default TarjetaMetrica; 