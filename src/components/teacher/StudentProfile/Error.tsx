import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "../../common/Button/Button";

export const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 mb-8 shadow-sm">
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="bg-red-100 p-3 rounded-full shrink-0">
        <AlertCircle className="h-7 w-7 text-red-600" />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-[20px] font-semibold text-red-700 mb-3">
          Error al cargar el perfil
        </h2>
        <p className="text-[15px] text-red-600 mb-4">{message}</p>
      </div>
    </div>
    <div className="mt-6 flex justify-center md:justify-start">
      <Button
        onClick={() => window.location.reload()}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[8px] flex items-center gap-2 shadow-sm"
      >
        <RefreshCw className="h-5 w-5 animate-spin-slow" />
        Reintentar
      </Button>
    </div>
  </div>
);
