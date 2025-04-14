import { Card, CardContent }  from "../../components/common/Card/Card";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import { BarChart, LineChart, PieChart, ArrowUp } from "lucide-react"

export default function ProgressPage() {
  // Datos hardcodeados para la vista de progreso
  const progressData = {
    totalStudies: 24,
    evaluatedStudies: 18,
    pendingStudies: 6,
    averageScore: 7.8,
    monthlyProgress: [
      { month: "Enero", studies: 2, score: 6.5 },
      { month: "Febrero", studies: 3, score: 7.0 },
      { month: "Marzo", studies: 5, score: 7.2 },
      { month: "Abril", studies: 4, score: 7.5 },
      { month: "Mayo", studies: 6, score: 8.0 },
      { month: "Junio", studies: 4, score: 8.2 },
    ],
    protocolPerformance: [
      { protocol: "FATE", score: 8.5, studies: 10 },
      { protocol: "FAST", score: 7.2, studies: 8 },
      { protocol: "RUSH", score: 6.8, studies: 6 },
    ],
    recentFeedback: [
      {
        id: 1,
        date: "15 junio, 2023",
        protocol: "FATE",
        score: 8.5,
        comment: "Excelente visualización de estructuras cardíacas. Buena técnica de barrido.",
      },
      {
        id: 2,
        date: "10 junio, 2023",
        protocol: "FAST",
        score: 7.0,
        comment: "Correcta identificación de líquido libre. Mejorar la orientación del transductor.",
      },
      {
        id: 3,
        date: "5 junio, 2023",
        protocol: "RUSH",
        score: 8.0,
        comment: "Buen análisis de la función ventricular. Falta mejorar la visualización de la VCI.",
      },
    ],
  }

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Mi Progreso</h1>
        <p className="text-[#A0A0A0]">Seguimiento de tu desempeño y evolución en la plataforma</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-none shadow-sm rounded-[16px]">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-[14px] text-[#A0A0A0]">Estudios Totales</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-[24px] font-bold text-[#333333]">{progressData.totalStudies}</span>
                <div className="flex items-center text-[13px] text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+12% este mes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[16px]">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-[14px] text-[#A0A0A0]">Estudios Evaluados</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-[24px] font-bold text-[#333333]">{progressData.evaluatedStudies}</span>
                <div className="flex items-center text-[13px] text-[#A0A0A0]">
                  <span>
                    {Math.round((progressData.evaluatedStudies / progressData.totalStudies) * 100)}% del total
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[16px]">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-[14px] text-[#A0A0A0]">Estudios Pendientes</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-[24px] font-bold text-[#333333]">{progressData.pendingStudies}</span>
                <div className="flex items-center text-[13px] text-amber-600">
                  <span>En espera de evaluación</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[16px]">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-[14px] text-[#A0A0A0]">Calificación Promedio</span>
              <div className="flex items-end justify-between mt-2">
                <span className="text-[24px] font-bold text-[#333333]">{progressData.averageScore}/10</span>
                <div className="flex items-center text-[13px] text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+0.5 pts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <LineChart className="mr-2 h-4 w-4" />
            Visión General
          </TabsTrigger>
          <TabsTrigger value="protocols" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Protocolos
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center">
            <PieChart className="mr-2 h-4 w-4" />
            Retroalimentación
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm rounded-[16px]">
              <CardContent className="p-6">
                <h3 className="text-[16px] font-medium text-[#333333] mb-4">Evolución Mensual</h3>
                <div className="h-[300px] flex items-center justify-center bg-[#F4F4F4] rounded-lg">
                  <p className="text-[14px] text-[#A0A0A0]">Gráfica de evolución mensual</p>
                  {/* Aquí iría un componente de gráfica real */}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {progressData.monthlyProgress.slice(-3).map((month, index) => (
                    <div key={index} className="text-center">
                      <p className="text-[13px] text-[#A0A0A0]">{month.month}</p>
                      <p className="text-[16px] font-medium text-[#333333]">{month.score}/10</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[16px]">
              <CardContent className="p-6">
                <h3 className="text-[16px] font-medium text-[#333333] mb-4">Distribución por Protocolos</h3>
                <div className="h-[300px] flex items-center justify-center bg-[#F4F4F4] rounded-lg">
                  <p className="text-[14px] text-[#A0A0A0]">Gráfica de distribución por protocolos</p>
                  {/* Aquí iría un componente de gráfica real */}
                </div>
                <div className="mt-4 space-y-2">
                  {progressData.protocolPerformance.map((protocol, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: index === 0 ? "#4E81BD" : index === 1 ? "#A0A0A0" : "#F4F4F4" }}
                        ></div>
                        <span className="text-[14px] text-[#333333]">{protocol.protocol}</span>
                      </div>
                      <span className="text-[14px] font-medium text-[#333333]">
                        {protocol.score}/10 ({protocol.studies} estudios)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="protocols">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {progressData.protocolPerformance.map((protocol, index) => (
              <Card key={index} className="border-none shadow-sm rounded-[16px]">
                <CardContent className="p-6">
                  <h3 className="text-[16px] font-medium text-[#333333] mb-2">{protocol.protocol}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="text-[24px] font-bold text-[#333333]">{protocol.score}/10</div>
                    <div className="text-[14px] text-[#A0A0A0]">({protocol.studies} estudios)</div>
                  </div>
                  <div className="h-[200px] flex items-center justify-center bg-[#F4F4F4] rounded-lg">
                    <p className="text-[14px] text-[#A0A0A0]">Gráfica de evolución</p>
                    {/* Aquí iría un componente de gráfica real */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <div className="space-y-4">
            <h3 className="text-[16px] font-medium text-[#333333]">Retroalimentación Reciente</h3>
            {progressData.recentFeedback.map((feedback) => (
              <Card key={feedback.id} className="border-none shadow-sm rounded-[16px]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-[16px] font-medium text-[#333333]">Protocolo {feedback.protocol}</h4>
                      <p className="text-[13px] text-[#A0A0A0]">{feedback.date}</p>
                    </div>
                    <div className="bg-[#4E81BD]/10 px-3 py-1 rounded-full text-[14px] font-medium text-[#4E81BD]">
                      {feedback.score}/10
                    </div>
                  </div>
                  <p className="text-[14px] text-[#333333] mt-2">{feedback.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
