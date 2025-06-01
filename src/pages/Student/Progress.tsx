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
import { ErrorDisplay } from "../../components/common/Error/Error"
import { BarChartIcon as ChartBar, ClipboardList, LineChart, MessageSquare } from "lucide-react"

export default function ProgressPage() {
  const user = authService.getCurrentUser()
  const userId = user?.id ?? 0
  const { data, loading, error } = useProgressData(Number(userId))

  const PageHeader = () => (
    <header className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full">
          <LineChart className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <h1 className="text-[24px] font-bold text-[#333333]">Mi Progreso</h1>
      </div>
      <p className="text-[#666666] ml-12">Seguimiento de tu desempeño y evolución en la plataforma</p>
    </header>
  )

  if (loading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
            <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin mb-6"></div>
          </div>
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando tu progreso</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos recopilando tus datos de desempeño y evaluaciones para mostrarte información actualizada.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <ErrorDisplay error={error} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 opacity-40 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-[16px] p-6 h-[120px] shadow-sm border border-slate-100 animate-pulse"
            >
              <div className="h-4 w-24 bg-slate-200 rounded mb-3"></div>
              <div className="h-8 w-16 bg-slate-200 rounded mb-3"></div>
              <div className="h-3 w-32 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>

        <div className="opacity-40 pointer-events-none">
          <div className="flex gap-4 mb-6 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-hide">
            {[
              { name: "Visión General", icon: <ChartBar className="h-4 w-4" /> },
              { name: "Protocolos", icon: <ClipboardList className="h-4 w-4" /> },
              { name: "Retroalimentación", icon: <MessageSquare className="h-4 w-4" /> },
            ].map((tab, i) => (
              <div
                key={i}
                className={`pb-2 px-3 flex items-center gap-2 whitespace-nowrap ${i === 0 ? "border-b-2 border-[#4E81BD] text-[#4E81BD] font-medium" : "text-[#A0A0A0]"
                  }`}
              >
                {tab.icon}
                {tab.name}
              </div>
            ))}
          </div>
          <div className="bg-white rounded-[16px] p-6 shadow-sm border border-slate-100 animate-pulse">
            <div className="h-6 w-48 bg-slate-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="h-[200px] bg-slate-200 rounded"></div>
              <div className="h-[200px] bg-slate-200 rounded"></div>
            </div>
            <div className="h-4 w-full bg-slate-200 rounded mb-3"></div>
            <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10 text-center">
          <div className="bg-slate-100 p-4 rounded-full mb-6">
            <LineChart className="h-10 w-10 text-slate-400" />
          </div>
          <h2 className="text-[20px] font-semibold text-[#333333] mb-3">No hay datos disponibles</h2>
          <p className="text-[#666666] max-w-md mb-6">
            Aún no tenemos información sobre tu progreso. Comienza a subir estudios para ver tu evolución.
          </p>
          <button
            onClick={() => (window.location.href = "/student/upload")}
            className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] font-medium transition-all shadow-sm hover:shadow"
          >
            Subir mi primer estudio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader />

      <div className="mb-8 transition-all animate-fadeIn">
        <StatsGrid
          totalStudies={data.totalStudies}
          evaluatedStudies={data.evaluatedStudies}
          pendingStudies={data.pendingStudies}
          averageScore={data.averageScore}
        />
      </div>

      <div className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-6 transition-all animate-fadeIn">
        <TabsContainer defaultValue="overview" className="w-full">
          <TabsList className="mb-8 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-hide">
            <TabsButton value="overview">
              <ChartBar className="h-4 w-4" />
              Visión General
            </TabsButton>
            <TabsButton value="protocols">
              <ClipboardList className="h-4 w-4" />
              Calificaciones
            </TabsButton>
            <TabsButton value="feedback">
              <MessageSquare className="h-4 w-4" />
              Retroalimentación
            </TabsButton>
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
    </div>
  )
}
