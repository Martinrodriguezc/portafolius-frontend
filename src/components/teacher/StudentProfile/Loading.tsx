import React from "react";

export const LoadingState: React.FC<{ title?: string }> = ({
  title = "Cargando…",
}) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
      <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin"></div>
    </div>
    <p className="text-[18px] font-medium text-[#333333] mb-2">{title}</p>
  </div>
);
