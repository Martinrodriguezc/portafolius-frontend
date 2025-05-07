import React from "react";
import { useStudyVideos } from "../../../hooks/student/Videos/useStudyVideos";
import Card from "../../../components/common/Card/Card";
import Button from "../../../components/common/Button/Button";
import { Link } from "react-router-dom";
import { ReturnButton } from "../../../components/common/Button/ReturnButton";
import { Video } from "lucide-react";

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
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Card className="w-full max-w-3xl rounded-[16px]">
            <Video className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Aún no hay videos</h2>
            <p className="text-gray-500 mb-6">Este estudio no tiene videos cargados. ¡Comienza subiendo el primero!</p>
            <Link to={`/student/upload`}>
              <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-5 py-2 rounded-md flex items-center gap-2">
                <Video className="h-5 w-5" /> Subir Video
              </Button>
            </Link>
          </Card>
        </div>
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
                  {new Date(video.upload_date).toLocaleDateString()} &bull; {video.duration_seconds}s
                </div>
              </div>
              <Link to={`/student/${study_id}/videos/${video.id}`}>
                <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[8px] px-[12px] rounded-[8px]">
                  Ver Video
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )
      }
    </div >
  );
}