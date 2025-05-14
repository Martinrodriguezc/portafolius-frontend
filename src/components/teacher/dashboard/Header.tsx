import React from "react";
import { BarChart } from "lucide-react";

interface PageHeaderProps {
  lastName?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ lastName }) => (
  <header className="mb-6 sm:mb-8 px-4 sm:px-0">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-[#4E81BD]/10 p-2 rounded-full">
        <BarChart className="h-5 w-5 sm:h-6 sm:w-6 text-[#4E81BD]" />
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-[#333333]">
        Dashboard de Profesor
      </h1>
    </div>
    <p className="text-sm sm:text-base text-[#666666] pl-8 sm:pl-12">
      Bienvenido de nuevo, {lastName ? `Dr. ${lastName}` : "Profesor"}. Aquí tienes un resumen de tu actividad.
    </p>
  </header>
);