import { useState } from "react";
import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies";
import { PageHeader } from "../../components/teacher/allEvaluations/Header";
import { ErrorDisplay } from "../../components/common/Error/Error";
import { StatsCard } from "../../components/teacher/allEvaluations/StatsCard";
import { Badge } from "../../components/common/Badge/Badge";
import { BarChart2, CheckCircle, Clock } from "lucide-react";
import { SearchFilter } from "../../components/teacher/allEvaluations/SearchFilter";
import Card from "../../components/common/Card/Card";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import { EvaluationCard } from "../../components/teacher/allEvaluations/EvaluationCard";
import { Suggestions } from "../../components/teacher/allEvaluations/SuggestionPanel";
import TabsList from "../../components/common/Tabs/TabsList";

export default function AdminEvaluations() {
  const { pending, completed, loading, error } = useAllStudies();
  const [query, setQuery] = useState("");
  const total = pending.length + completed.length;
  const avg = completed.length > 0
    ? (completed.reduce((sum, s) => sum + s.score, 0) / completed.length).toFixed(1)
    : "0.0";

  if (loading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />
        <div className="flex flex-col items-center justify-center min-h-[400px] p-10">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
            <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin"></div>
          </div>
          <p className="text-[18px] font-medium text-[#333333] mb-2">
            Cargando evaluaciones…
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />
        <ErrorDisplay error={error} />
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={<Badge className="h-6 w-6 text-white" />}
          title="Totales"
          value={total}
          gradientFrom="blue-50"
          gradientTo="blue-100"
          border="border-blue-200"
          textColor="blue-500"
        />
        <StatsCard
          icon={<Clock className="h-6 w-6 text-white" />}
          title="Pendientes"
          value={pending.length}
          gradientFrom="amber-50"
          gradientTo="amber-100"
          border="border-amber-200"
          textColor="amber-800"
        />
        <StatsCard
          icon={<BarChart2 className="h-6 w-6 text-white" />}
          title="Calif. Promedio"
          value={`${avg}/10`}
          gradientFrom="green-50"
          gradientTo="green-100"
          border="border-green-200"
          textColor="green-800"
        />
      </div>

      <SearchFilter query={query} onQueryChange={setQuery} />

      <Card className="bg-white p-6 rounded-[16px] shadow-sm border border-slate-200">
        <TabsContainer defaultValue="pending">
          <TabsList className="mb-6 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-hide">
            <TabsButton value="pending">
              <Clock className="h-4 w-4 text-amber-500" /> Pendientes ({pending.length})
            </TabsButton>
            <TabsButton value="completed">
              <CheckCircle className="h-4 w-4 text-green-500" /> Completadas ({completed.length})
            </TabsButton>
          </TabsList>

          <TabsPanel value="pending">
            {pending.length === 0 ? (
              <Card className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-[12px] border border-slate-100">
                <Clock className="h-16 w-16 text-amber-300 mb-4" />
                <p className="text-xl font-medium text-[#333333] mb-2">
                  No hay evaluaciones pendientes
                </p>
                <p className="text-[#666666] text-center max-w-md">
                  Tus estudiantes aún no han subido estudios. Aquí aparecerán para ser evaluados.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {pending.map(s => (
                  <EvaluationCard key={s.study_id} study={s} variant="pending" context="admin" />
                ))}
              </div>
            )}
          </TabsPanel>

          <TabsPanel value="completed">
            {completed.length === 0 ? (
              <Card className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-[12px] border border-slate-100">
                <CheckCircle className="h-16 w-16 text-green-300 mb-4" />
                <p className="text-xl font-medium text-[#333333] mb-2">
                  No hay evaluaciones completadas
                </p>
                <p className="text-[#666666] text-center max-w-md">
                  Una vez que completes evaluaciones, aparecerán aquí tus resultados.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {completed.map(s => (
                  <EvaluationCard key={s.study_id} study={s} variant="completed" context="admin" />
                ))}
              </div>
            )}
          </TabsPanel>
        </TabsContainer>
      </Card>

      <Suggestions total={total} pending={pending.length} />
    </div>
  );
} 