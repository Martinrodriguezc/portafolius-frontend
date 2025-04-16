import { progressData } from "../../utils/progressConstants";
import { StatsGrid } from "../../components/student/progress/StatsGrid";
import { LineChart, BarChart, PieChart } from "lucide-react";
import { OverviewTab } from "../../components/student/progress/OverviewTab";
import { ProtocolsTab } from "../../components/student/progress/ProtocolsTab";
import { FeedbackTab } from "../../components/student/progress/FeedbackTab";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";

export default function ProgressPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Mi Progreso</h1>
        <p className="text-[#A0A0A0]">Seguimiento de tu desempeño y evolución en la plataforma</p>
      </header>

      <StatsGrid
        totalStudies={progressData.totalStudies}
        evaluatedStudies={progressData.evaluatedStudies}
        pendingStudies={progressData.pendingStudies}
        averageScore={progressData.averageScore}
      />

      <TabsContainer defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsButton value="overview">
            <LineChart className="mr-2 h-4 w-4" />
            Visión General
          </TabsButton>
          <TabsButton value="protocols">
            <BarChart className="mr-2 h-4 w-4" />
            Protocolos
          </TabsButton>
          <TabsButton value="feedback">
            <PieChart className="mr-2 h-4 w-4" />
            Retroalimentación
          </TabsButton>
        </TabsList>

        <TabsPanel value="overview">
          <OverviewTab
            monthlyProgress={progressData.monthlyProgress}
            protocolPerformance={progressData.protocolPerformance}
          />
        </TabsPanel>
        <TabsPanel value="protocols">
          <ProtocolsTab protocolPerformance={progressData.protocolPerformance} />
        </TabsPanel>
        <TabsPanel value="feedback">
          <FeedbackTab recentFeedback={progressData.recentFeedback} />
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}