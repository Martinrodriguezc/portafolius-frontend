import { useProgressData } from "../../hooks/student/Progress/useProgressData";
import { StatsGrid } from "../../components/student/progress/StatsGrid";
import { OverviewTab } from "../../components/student/progress/OverviewTab";
import { ProtocolsTab } from "../../components/student/progress/ProtocolsTab";
import { FeedbackTab } from "../../components/student/progress/FeedbackTab";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import { authService } from "../../hooks/auth/authServices";

export default function ProgressPage() {
  const user = authService.getCurrentUser();
  const userId = user?.id ?? 0;
  const { data, loading, error } = useProgressData(userId);

  if (loading) return <p className="p-8">Cargando progreso...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;
  if (!data) return null;

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Mi Progreso</h1>
        <p className="text-[#A0A0A0]">
          Seguimiento de tu desempeño y evolución en la plataforma
        </p>
      </header>

      <StatsGrid
        totalStudies={data.totalStudies}
        evaluatedStudies={data.evaluatedStudies}
        pendingStudies={data.pendingStudies}
        averageScore={data.averageScore}
      />

      <TabsContainer defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsButton value="overview">Visión General</TabsButton>
          <TabsButton value="protocols">Protocolos</TabsButton>
          <TabsButton value="feedback">Retroalimentación</TabsButton>
        </TabsList>

        <TabsPanel value="overview">
          <OverviewTab
            monthlyProgress={data.monthlyProgress}
            protocolPerformance={data.protocolPerformance}
          />
        </TabsPanel>
        <TabsPanel value="protocols">
          <ProtocolsTab protocolPerformance={data.protocolPerformance} />
        </TabsPanel>
        <TabsPanel value="feedback">
          <FeedbackTab recentFeedback={data.recentFeedback} />
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}
