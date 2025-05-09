import React from "react";
import { BarChart } from "lucide-react";

interface PageHeaderProps {
  lastName?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ lastName }) => (
  <header className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-[#4E81BD]/10 p-2 rounded-full">
        <BarChart className="h-6 w-6 text-[#4E81BD]" />
      </div>
      <h1 className="text-[24px] font-bold text-[#333333]">
        Dashboard de Profesor
      </h1>
    </div>
    <p className="text-[#666666] ml-12">
      Bienvenido de nuevo,{" "}
      {lastName ? `Dr. ${lastName}` : "Profesor"}. Aquí tienes un resumen de tu actividad.
    </p>
  </header>
);
