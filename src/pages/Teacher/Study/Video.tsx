// src/pages/Teacher/TeacherVideoPage.tsx
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button/Button";
import Card from "../../../components/common/Card/Card";
import { Textarea } from "../../../components/common/Textarea/Textarea";
import VideoPlayer from "../../../components/student/videos/VideoPlayer";
import { useVideoPage } from "../../../hooks/video/useVideoPage";
import { ReturnButton } from "../../../components/common/Button/ReturnButton";

export default function TeacherVideoPage() {
  const {
    videoRef,
    videoUrl,
    meta,
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

  if (loading) return <p className="p-8">Cargando vídeo…</p>;
  if (error || !meta) return <p className="p-8 text-red-500">Error: {error}</p>;

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-[20px] font-bold text-[#333333]">
            {meta.original_filename}
          </h1>
          <p className="text-[#A0A0A0]">
            Fecha de subida: {new Date(meta.upload_date).toLocaleString()}
          </p>
        </div>
        <ReturnButton />
      </header>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card className="rounded-[16px] mb-6">
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
          </Card>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <Card className="rounded-[16px] p-4">
            <h3 className="font-medium mb-4">Comentarios</h3>
            <Textarea
              placeholder="Escribe un comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] text-[14px] border-[#A0A0A0] rounded-[8px] placeholder:text-[#A0A0A0] mb-2"
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!comment.trim()}
              className="w-full"
            >
              Enviar comentario
            </Button>
          </Card>

          <Card className="rounded-[16px] p-4 text-center">
            <h3 className="font-medium mb-4">Formulario de evaluación</h3>
            <Link to={`/teacher/evaluations/${meta.study_id}/videos/${meta.id}/evaluate`}>
              <Button className="w-full">Ir a evaluar</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
