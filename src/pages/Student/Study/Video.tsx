import { useParams } from "react-router-dom";
import { useVideoPage } from "../../../hooks/video/useVideoPage";
import { Video } from "../../../types/video";
import { evaluatedVideos, pendingVideos } from "../../../utils/videoConstants";
import Card from "../../../components/common/Card/Card";
import VideoPlayer from "../../../components/student/videos/VideoPlayer";
import { Textarea } from "../../../components/common/Textarea/Textarea";
import Button from "../../../components/common/Button/Button";

export default function StudentVideoPage() {
  const { id } = useParams<{ id: string }>();
  const {
    videoRef,
    videoUrl,
    loading,
    error,
    isPlaying,
    togglePlay,
    progress,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
    comment,
    setComment,
    handleSubmitComment,
  } = useVideoPage();

  const allVideos: Video[] = [...evaluatedVideos, ...pendingVideos];
  const videoData = allVideos.find((v) => v.id === id);
  if (!videoData) {
    return <div className="p-8">Video no encontrado</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-[20px] font-bold text-[#333333] mb-6">
        {videoData.title}
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card className="rounded-[16px] mb-6">
            {loading ? (
              <p className="text-white text-center p-4">Cargando vídeo…</p>
            ) : error ? (
              <p className="text-red-500 text-center p-4">Error: {error}</p>
            ) : (
              <VideoPlayer
                src={videoUrl}
                videoRef={videoRef}
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                progress={progress}
                handleSeek={handleSeek}
                isFullscreen={isFullscreen}
                toggleFullscreen={toggleFullscreen}
              />
            )}
            {videoData.tags.length > 0 && (
              <div className="mt-4">
                <h3 className="text-[16px] font-medium text-[#333333] mb-2">
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {videoData.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className={`px-3 py-1 rounded-full text-[13px] ${
                        tag.author === "student"
                          ? "bg-[#F4F4F4] text-[#333333]"
                          : "bg-[#4E81BD]/10 text-[#4E81BD]"
                      }`}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="rounded-[16px]">
            <h3 className="text-[16px] font-medium text-[#333333] mb-4">
              Comentarios
            </h3>
            <div className="space-y-4 mb-4">
              {videoData.comments.map((com) => (
                <div key={com.id} className="bg-[#F4F4F4] rounded-[8px] p-4">
                  <p className="text-[14px] text-[#333333] mb-2">{com.text}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-medium text-[#333333]">
                      {com.author}
                    </span>
                    <span className="text-[13px] text-[#A0A0A0]">
                      {com.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Textarea
              placeholder="Escribe un comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] text-[14px] border-[#A0A0A0] rounded-[8px] placeholder:text-[#A0A0A0]"
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!comment.trim()}
              className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]"
            >
              Enviar comentario
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
