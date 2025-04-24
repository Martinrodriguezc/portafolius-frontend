import { Link } from 'react-router-dom'
import Card from '../../components/common/Card/Card'
import TabsContainer from '../../components/common/Tabs/TabsContainer'
import TabsList from '../../components/common/Tabs/TabsList'
import TabsButton from '../../components/common/Tabs/TabsButton'
import TabsPanel from '../../components/common/Tabs/TabsPanel'
import { authService } from '../../hooks/authServices'
import { useTeacherEvaluations } from '../../hooks/teacher/useTeacherEvaluations'
import Button from '../../components/common/Button/Button'

export default function TeacherEvaluationsPage() {
  const currentUser = authService.getCurrentUser()
  const teacherId = currentUser?.id
  const {
    pending,
    completed,
    loading,
    error
  } = useTeacherEvaluations(teacherId!)

  if (loading) return <p className="p-8">Cargando evaluaciones…</p>
  if (error)   return <p className="p-8 text-red-500">Error: {error}</p>

  const total = pending.length + completed.length
  const avgScore = completed.length
    ? (completed.reduce((sum, e) => sum + (e.score || 0), 0) / completed.length).toFixed(1)
    : '0'

  return (
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-[20px] font-bold text-[#333333]">Evaluaciones</h1>
          <p className="text-[#A0A0A0]">Historial de tus evaluaciones</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-none shadow-sm rounded-[16px] p-6">
            <span className="text-[14px] text-[#A0A0A0]">Evaluaciones Totales</span>
            <span className="text-[24px] font-bold text-[#333333] mt-2">{total}</span>
          </Card>
          <Card className="border-none shadow-sm rounded-[16px] p-6">
            <span className="text-[14px] text-[#A0A0A0]">Evaluaciones Pendientes</span>
            <span className="text-[24px] font-bold text-[#333333] mt-2">{pending.length}</span>
          </Card>
          <Card className="border-none shadow-sm rounded-[16px] p-6">
            <span className="text-[14px] text-[#A0A0A0]">Calificación Promedio</span>
            <span className="text-[24px] font-bold text-[#333333] mt-2">{avgScore}/10</span>
          </Card>
        </div>

        <TabsContainer defaultValue="pending">
          <TabsList className="mb-6">
            <TabsButton value="pending">Pendientes</TabsButton>
            <TabsButton value="completed">Completadas</TabsButton>
          </TabsList>

          <TabsPanel value="pending">
            {pending.length === 0 ? (
              <Card className="border-none shadow-sm rounded-[16px] p-6">
                <p className="text-[16px] text-[#A0A0A0]">No hay pendientes</p>
              </Card>
            ) : (
              pending.map(e => (
                <Card key={e.id} className="border-none shadow-sm rounded-[16px] p-6 mb-4 flex justify-between">
                  <div>
                    <strong>{e.student}</strong> · {e.date}
                    <div className="text-[14px] text-[#A0A0A0] mt-1">
                      Protocolo: {e.protocol} · {e.videos} videos
                    </div>
                  </div>
                  <Link to={`/teacher/evaluate/${e.id}`}>
                    <Button>Evaluar</Button>
                  </Link>
                </Card>
              ))
            )}
          </TabsPanel>
     

          <TabsPanel value="completed">
            {completed.map(e => (
              <Card key={e.id} className="border-none shadow-sm rounded-[16px] p-6 mb-4 flex justify-between">
                <div>
                  <strong>{e.student}</strong> · {e.date}
                  <div className="text-[14px] text-[#A0A0A0] mt-1">
                    Protocolo: {e.protocol} · {e.videos} videos
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[#4E81BD] font-bold text-[18px]">{e.score}/10</div>
                  <Button>Ver detalles</Button>
                </div>
              </Card>
            ))}
          </TabsPanel>
        </TabsContainer>
      </div>
  )
}