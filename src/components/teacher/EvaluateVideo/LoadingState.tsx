import PageHeader from "./PageHeader";

export default function LoadingState() {
  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader meta={null} />
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
        <div className="relative">
          <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
          <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin mb-6"></div>
        </div>
        <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando video</p>
        <p className="text-[#666666] text-center max-w-md">
          Estamos preparando el video y el formulario de evaluación. Esto tomará solo un momento.
        </p>
      </div>
    </div>
  );
}
