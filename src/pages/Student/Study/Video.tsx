import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ReturnButton } from "../../../components/common/Button/ReturnButton";
import Card from "../../../components/common/Card/Card";
import VideoPlayer from "../../../components/student/videos/VideoPlayer";
import {
  fetchVideoUrl,
  fetchVideoMeta,
} from "../../../hooks/video/utils/requests";
import { evaluationService } from "../../../hooks/teacher/evaluations/evaluationService/evaluationService";

export default function StudentVideoPage() {
  const { clipId, studyId } = useParams<{ clipId: string; studyId: string }>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [url, setUrl] = useState("");
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [evaluation, setEvaluation] = useState<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!clipId) {
      setError("No se proporcionó ID de video");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const [url, meta] = await Promise.all([
          fetchVideoUrl(clipId),
          fetchVideoMeta(clipId),
        ]);
        setUrl(url);
        setMeta(meta);

        const evalFound = await evaluationService.getByStudyId(Number(studyId));
        if (evalFound) setEvaluation(evalFound);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [clipId, studyId]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () =>
      vid.duration && setProgress((vid.currentTime / vid.duration) * 100);
    vid.addEventListener("timeupdate", onTime);
    return () => vid.removeEventListener("timeupdate", onTime);
  }, []);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    vid.currentTime = (Number(e.target.value) / 100) * vid.duration;
    setProgress(Number(e.target.value));
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;
    if (!isFullscreen) {
      container.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  if (loading) return <p className="p-8">Cargando…</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="p-8 flex flex-col lg:flex-row gap-6">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-2 mb-4">
          {" "}
          <h1 className="text-[20px] font-bold text-[#333333]">
            {meta.original_filename}
          </h1>
          <p className="text-[#A0A0A0]">Fecha de subida: {meta.upload_date}</p>
        </div>
        <ReturnButton />
      </header>
      <div className="w-full lg:w-2/3 space-y-4">
        <Card className="rounded-lg overflow-hidden">
          <VideoPlayer
            src={url}
            videoRef={videoRef}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            progress={progress}
            handleSeek={handleSeek}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        </Card>

        <Card className="p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#333] mb-2">
            Detalles del estudio
          </h3>
          <p className="text-sm text-[#555] mb-1">
            <strong>Estudiante:</strong> {meta?.first_name} {meta?.last_name}
          </p>
          <p className="text-sm text-[#555] mb-1">
            <strong>Título:</strong> {meta?.title || "No disponible"}
          </p>
          <p className="text-sm text-[#555] mb-1">
            <strong>Protocolo:</strong>{" "}
            {meta?.protocol?.toUpperCase() || "No especificado"}
          </p>
          <p className="text-sm text-[#555] mb-1">
            <strong>Archivo:</strong> {meta?.original_filename}
          </p>
        </Card>
      </div>

      <div className="w-full lg:w-1/3">
        <Card className="p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Evaluación</h2>
          {evaluation ? (
            <>
              <strong>Profesor:</strong> {evaluation.teacher_first_name}{" "}
              {evaluation.teacher_last_name}
              <p className="text-sm text-[#555] mb-2">
                <strong>Calificación:</strong> {evaluation.score}/10
              </p>
              <p className="text-sm text-[#555] mb-1">
                <strong>Feedback:</strong>
              </p>
              <div className="border p-3 bg-gray-50 rounded text-sm text-[#333] whitespace-pre-wrap">
                {evaluation.feedback_summary}
              </div>
            </>
          ) : (
            <p className="text-[#A0A0A0]">
              Este video aún no ha sido evaluado.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
