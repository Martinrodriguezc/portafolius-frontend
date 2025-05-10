import React from "react";
import { MessageSquare, Download, Bell, Share2 } from "lucide-react";
import Button from "../../common/Button/Button";

export const QuickActions: React.FC = () => (
  <div className="flex flex-wrap gap-3">
    {[
      { icon: <MessageSquare />, label: "Enviar mensaje" },
      { icon: <Download />, label: "Exportar datos" },
      { icon: <Bell />, label: "Notificar" },
      { icon: <Share2 />, label: "Compartir perfil" },
    ].map((action, i) => (
      <Button
        key={i}
        variant="outline"
        className="bg-white border-slate-200 text-[#4E81BD] hover:bg-slate-50 flex items-center gap-2 shadow-sm"
      >
        {action.icon}
        {action.label}
      </Button>
    ))}
  </div>
);
