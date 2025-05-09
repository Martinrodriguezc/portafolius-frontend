import MaterialsHeader from './MaterialsHeader';

export default function MaterialsLoading() {
  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <MaterialsHeader />
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping" />
          <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin" />
        </div>
        <p className="text-[18px] font-medium text-[#333333] mb-2">
          Cargando materiales…
        </p>
      </div>
    </div>
  );
}