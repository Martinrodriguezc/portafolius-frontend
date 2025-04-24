import { Link } from "react-router-dom";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { authService } from "../../hooks/auth/authServices";
import { useRecentComments } from "../../hooks/student/RecentComments/useRecentComments";
import { ReturnButton } from "../../components/common/Button/ReturnButton";

export default function CommentsPage() {
  const userId = authService.getCurrentUser()?.id;
  const { comments, loading, error } = useRecentComments(Number(userId)); //REVISAR

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-[20px] font-bold text-[#333333]">
            Todos los comentarios
          </h1>
          <p className="text-[#A0A0A0]">
            Lista completa de tus comentarios y acceso al video relacionado
          </p>
        </div>
        <ReturnButton />
      </header>

      {loading && <p>Cargando comentarios…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-4">
        {comments.map((com) => (
          <Card
            key={com.id}
            className="bg-[#F4F4F4] border-none rounded-[16px] p-6 flex flex-col sm:flex-row justify-between"
          >
            <div>
              <p className="text-[14px] text-[#333333] mb-3">{com.text}</p>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-medium text-[#333333]">
                  {com.author}
                </span>
                <span className="text-[13px] text-[#A0A0A0]">{com.date}</span>
              </div>
            </div>
            <Link to={`/student/${com.studyId}/videos/${com.videoId}`}>
              <Button className="mt-4 sm:mt-0 sm:ml-4 bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[8px] px-[12px] rounded-[8px]">
                Ver Video
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
