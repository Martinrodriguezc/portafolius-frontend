// src/pages/Teacher/TeacherVideoPage.tsx
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button/Button";
import Card from "../../../components/common/Card/Card";
import VideoPlayer from "../../../components/student/videos/VideoPlayer";
import { useVideoPage } from "../../../hooks/video/useVideoPage";

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
  } = useVideoPage(); // 🟦 se eliminó comment y setComment y handleSubmitComment

  if (loading) return <p className="p-8">Cargando vídeo…</p>;
  if (error || !meta) return <p className="p-8 text-red-500">Error: {error}</p>;

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">
          {meta.original_filename}
        </h1>
        <p className="text-[#A0A0A0]">
          Fecha de subida: {new Date(meta.upload_date).toLocaleString()}
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 space-y-4">
          {/* 🟦 VIDEO */}
          <Card className="rounded-[16px]">
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

          {/* 🟦 DETALLES DEL ESTUDIO */}
          <Card className="p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#333] mb-2">Detalles del estudio</h3>
            <p className="text-sm text-[#555] mb-1">
              <strong>Estudiante:</strong> {meta?.first_name} {meta?.last_name}
            </p>
            <p className="text-sm text-[#555] mb-1">
              <strong>Título:</strong> {meta?.title || "No disponible"}
            </p>
            <p className="text-sm text-[#555] mb-1">
              <strong>Protocolo:</strong> {meta?.protocol?.toUpperCase() || "No especificado"}
            </p>
            <p className="text-sm text-[#555] mb-1">
              <strong>Archivo:</strong> {meta?.original_filename}
            </p>
          </Card>
        </div>

        {/* 🟦 FORMULARIO DE EVALUACIÓN */}
        <div className="w-full lg:w-1/3">
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

