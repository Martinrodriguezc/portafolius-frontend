import { useQueryClient } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import MaterialStatsSection from "../../components/teacher/materials/MaterialStatsSection";
import MaterialCreationForm from "../../components/teacher/materials/MaterialCreationForm";
import { useMaterialStats } from "../../hooks/teacher/teacher/Materials/useMaterialStats";

export default function TeacherMaterialsPage() {
  const qc = useQueryClient();
  const { data: stats, isLoading: statsLoading, error: statsError } = useMaterialStats();

  const handleMaterialCreationSuccess = () => {
    qc.invalidateQueries({ queryKey: ["materialStats"], exact: true });
  };

  return (
    <main className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full">
          <FileText className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">Materiales de estudio</h1>
          <p className="text-[#666666] text-[14px] mt-1">
            Sube y asigna materiales de estudio para tus estudiantes
          </p>
        </div>
      </div>

      <MaterialStatsSection 
        stats={stats!} 
        isLoading={statsLoading} 
        error={statsError} 
      />

      <MaterialCreationForm onSuccess={handleMaterialCreationSuccess} />
    </main>
  );
}