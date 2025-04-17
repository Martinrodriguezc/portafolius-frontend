import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { dashboardConstants } from "../../utils/dashboardConstants";
import { authService } from "../../hooks/authServices";


export default function StudentDashboard() {
  const { recentComments } = dashboardConstants;
  const user = authService.getCurrentUser();
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">¡Bienvenido, {user?.firstName}!</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-[18px] font-semibold text-[#333333] mb-4">Últimos comentarios</h2>
          <div className="space-y-4">
            {recentComments.map((comment) => (
              <Card key={comment.id} className="bg-[#F4F4F4] border-none rounded-[16px]">
                <div className="p-6">
                  <p className="text-[14px] text-[#333333] mb-3">{comment.text}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-medium text-[#333333]">
                      {comment.author}
                    </span>
                    <span className="text-[13px] text-[#A0A0A0]">
                      {comment.date}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]">
              Ver todos los comentarios
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-[18px] font-semibold text-[#333333] mb-4">
            Curva de aprendizaje
          </h2>
          <Card className="bg-[#F4F4F4] border-none rounded-[16px] h-[300px]">
            <div className="p-6 flex items-center justify-center h-full">
              <p className="text-[14px] text-[#A0A0A0]">
                Gráfica de progreso (próximamente)
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}