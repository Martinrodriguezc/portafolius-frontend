import React from "react";
import { HelpCircle } from "lucide-react";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";

export const HelpSection: React.FC = () => (
  <Card className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-[16px] shadow-sm border border-slate-200">
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="bg-[#4E81BD]/10 p-4 rounded-full">
        <HelpCircle className="h-10 w-10 text-[#4E81BD]" />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl font-semibold text-[#333333] mb-2">¿Necesitas ayuda?</h2>
        <p className="text-[#666666] mb-4">
          Consulta nuestra guía o contacta con soporte si tienes dudas sobre este perfil.
        </p>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <Button variant="outline" className="border-[#4E81BD] text-[#4E81BD]">
            Ver guía de evaluación
          </Button>
          <Button className="bg-[#4E81BD] text-white">Contactar soporte</Button>
        </div>
      </div>
    </div>
  </Card>
);
