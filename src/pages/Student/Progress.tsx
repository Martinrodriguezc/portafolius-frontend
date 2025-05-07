import { useProgressData } from "../../hooks/student/Progress/useProgressData"
import { StatsGrid } from "../../components/student/progress/StatsGrid"
import { OverviewTab } from "../../components/student/progress/OverviewTab"
import { ProtocolsTab } from "../../components/student/progress/ProtocolsTab"
import { FeedbackTab } from "../../components/student/progress/FeedbackTab"
import TabsContainer from "../../components/common/Tabs/TabsContainer"
import TabsList from "../../components/common/Tabs/TabsList"
import TabsButton from "../../components/common/Tabs/TabsButton"
import TabsPanel from "../../components/common/Tabs/TabsPanel"
import { authService } from "../../hooks/auth/authServices"
import { AlertCircle, RefreshCw } from "lucide-react"
import Button from "../../components/common/Button/Button"
import { ErrorDisplay } from "../../components/common/Error/Error"

export default function ProgressPage() {
  const user = authService.getCurrentUser()
  const userId = user?.id ?? 0
  const { data, loading, error } = useProgressData(Number(userId))

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#4E81BD]/30 border-t-[#4E81BD] rounded-full animate-spin mb-4"></div>
          <p className="text-[16px] text-[#333333]">Cargando progreso...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-[20px] font-bold text-[#333333]">Mi Progreso</h1>
          <p className="text-[#A0A0A0]">Seguimiento de tu desempeño y evolución en la plataforma</p>
        </header>

        <ErrorDisplay error={error} />

        {/* Placeholder Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 opacity-50 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-100 rounded-[12px] p-5 h-[100px] animate-pulse"></div>
          ))}
        </div>

        {/* Placeholder Tabs */}
        <div className="opacity-50 pointer-events-none">
          <div className="flex gap-4 mb-6 border-b border-slate-200">
            {["Visión General", "Protocolos", "Retroalimentación"].map((tab, i) => (
              <div
                key={i}
                className={`pb-2 px-1 ${i === 0 ? "border-b-2 border-[#4E81BD] text-[#4E81BD]" : "text-[#A0A0A0]"}`}
              >
                {tab}
              </div>
            ))}
          </div>
          <div className="bg-slate-100 rounded-[12px] p-5 h-[300px] animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Mi Progreso</h1>
        <p className="text-[#A0A0A0]">Seguimiento de tu desempeño y evolución en la plataforma</p>
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
          <OverviewTab monthlyProgress={data.monthlyProgress} protocolPerformance={data.protocolPerformance} />
        </TabsPanel>
        <TabsPanel value="protocols">
          <ProtocolsTab protocolPerformance={data.protocolPerformance} />
        </TabsPanel>
        <TabsPanel value="feedback">
          <FeedbackTab recentFeedback={data.recentFeedback} />
        </TabsPanel>
      </TabsContainer>
    </div>
  )
}
