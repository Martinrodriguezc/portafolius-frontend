import { Link } from "react-router-dom";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { authService } from "../../hooks/authServices";
import { useRecentComments } from "../../hooks/student/useRecentComments";

export default function StudentDashboard() {
  const user = authService.getCurrentUser();
  const userId = user?.id!;
  const { comments, loading, error } = useRecentComments(userId);

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">
          ¡Bienvenido, {user?.first_name}!
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-[18px] font-semibold text-[#333333] mb-4">
            Últimos comentarios
          </h2>

          {loading && <p className="text-[14px]">Cargando comentarios…</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          <div className="space-y-4">
            {!loading &&
              !error &&
              comments.map((comment) => (
                <Card
                  key={comment.id}
                  className="bg-[#F4F4F4] border-none rounded-[16px]"
                >
                  <div className="p-6">
                    <p className="text-[14px] text-[#333333] mb-3">
                      {comment.text}
                    </p>
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
            <Link to="/student/comments">
              <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]">
                Ver todos los comentarios
              </Button>
            </Link>
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