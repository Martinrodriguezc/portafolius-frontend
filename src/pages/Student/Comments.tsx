import { Link } from "react-router-dom";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { evaluatedVideos, pendingVideos, Video } from "../../utils/videoConstants";

export default function CommentsPage() {
  const allVideos: Video[] = [...evaluatedVideos, ...pendingVideos];
  const commentsList = allVideos.flatMap((video) =>
    video.comments.map((com) => ({
      ...com,
      videoId: video.id,
    }))
  );

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Todos los comentarios</h1>
        <p className="text-[#A0A0A0]">
          Lista completa de tus comentarios y acceso al video relacionado
        </p>
      </header>

      <div className="space-y-4">
        {commentsList.map((com) => (
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
                <span className="text-[13px] text-[#A0A0A0]">
                  {com.date}
                </span>
              </div>
            </div>
            <Link to={`/student/videos/${com.videoId}`}>
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