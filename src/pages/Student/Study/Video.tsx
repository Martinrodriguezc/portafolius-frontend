import Button from "../../../components/common/Button/Button";
import Card from "../../../components/common/Card/Card";
import { Textarea } from "../../../components/common/Textarea/Textarea";
import VideoPlayer from "../../../components/student/videos/VideoPlayer";
import { useVideoPage } from "../../../hooks/video/useVideoPage";

export default function StudentVideoPage() {
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
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">
          {meta.original_filename}
        </h1>
        <p className="text-[#A0A0A0]">Fecha de subida: {meta.upload_date}</p>
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
        <div className="w-full lg:w-1/3">
          <Card className="rounded-[16px] p-4">
            <h3 className="font-medium mb-4">Comentarios</h3>

            <Textarea
              placeholder="Escribe un comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!comment.trim()}
              className="mt-2 w-full"
            >
              Enviar comentario
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/*          
            {meta.tags.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Etiquetas</h3>
                <div className="flex flex-wrap gap-2">
                  {meta.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className={`px-3 py-1 rounded text-sm ${
                        tag.author === "student"
                          ? "bg-gray-200"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
            )}   



<div className="space-y-4 mb-4">
              {meta.comments.map((com) => (
                <div key={com.id} className="bg-gray-100 p-3 rounded">
                  <p className="text-sm mb-1">{com.text}</p>
                  <div className="text-xs flex justify-between text-gray-600">
                    <span>{com.author}</span>
                    <span>{com.date}</span>
                  </div>
                </div>
              ))}
            </div>*/
