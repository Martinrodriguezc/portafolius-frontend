import { useStudyVideos } from "../../../hooks/student/Videos/useStudyVideos";
import Card from "../../../components/common/Card/Card";
import Button from "../../../components/common/Button/Button";
import { Link } from "react-router-dom";
import { ReturnButton } from "../../../components/common/Button/ReturnButton";

export default function StudentMultipleVideosPage() {
  const { videos, loading, error, study_id } = useStudyVideos();

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-[20px] font-bold text-[#333333]">
            Videos del estudio
          </h1>
          <p className="text-[#A0A0A0]">Revisa los videos de tu estudio</p>
        </div>
        <ReturnButton />
      </header>

      {loading ? (
        <p className="p-4 text-center">Cargando videos…</p>
      ) : error ? (
        <p className="p-4 text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="space-y-4">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="rounded-[8px] p-4 flex items-center justify-between"
            >
              <div className="flex-1 mr-4">
                <h3 className="text-lg font-medium text-[#333333]">
                  {video.original_filename}
                </h3>
                <p className="text-sm text-[#A0A0A0]">{video.mime_type}</p>
                <div className="text-xs text-[#A0A0A0] mt-1">
                  {video.upload_date} &bull; {video.duration_seconds}s
                </div>
              </div>
              <Link to={`/teacher/evaluations/${study_id}/videos/${video.id}`}>
                <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[8px] px-[12px] rounded-[8px]">
                  Ver Video
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
