import { useState, useEffect, useRef } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import TeacherLayout from "../layout/TeacherLayout";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import { Textarea } from "../../components/common/Textarea/Textarea";
import { evaluationService } from "../../hooks/teacher/evaluationService";
import { fetchVideoUrl, fetchVideoMeta } from "../../hooks/video/utils/requests";
import type { EvaluationForm } from "../../types/evaluation";
import VideoPlayer from "../../components/student/videos/VideoPlayer";

export function TeacherEvaluateVideoPage() {
  const { studyId, clipId } = useParams<{ studyId: string; clipId: string }>();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [existing, setExisting] = useState<EvaluationForm | null>(null);

  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [u, m] = await Promise.all([
          fetchVideoUrl(clipId!),
          fetchVideoMeta(clipId!),
        ]);
        setUrl(u);
        setMeta(m);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [clipId]);

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

  if (loading) {
    return (
      <TeacherLayout>
        <p className="p-8">Cargando…</p>
      </TeacherLayout>
    );
  }
  if (error) {
    return (
      <TeacherLayout>
        <p className="p-8 text-red-500">{error}</p>
      </TeacherLayout>
    );
  }

  const onSubmit = async () => {
    if (submitting || score < 1 || score > 10) return;
    setSubmitting(true);
    try {
      if (existing) {
        await evaluationService.update(existing.id, score, feedback);
      } else {
        await evaluationService.create(Number(studyId), score, feedback);
      }
      navigate("/teacher/evaluations");
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TeacherLayout>
      <div className="p-8 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card className="rounded-lg overflow-hidden">
            {/* 🟦 REEMPLAZADO <video /> por VideoPlayer */}
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
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Evaluar clip</h2>
            <label className="block text-sm mb-1">Calificación (1–10):</label>
            <input
              type="number"
              min={1}
              max={10}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <Textarea
              placeholder="Feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full min-h-[100px] mb-4"
            />
            <Button
              onClick={onSubmit}
              disabled={submitting || score < 1 || !feedback.trim()}
              className="w-full"
            >
              {existing ? "Actualizar evaluación" : "Enviar evaluación"}
            </Button>
          </Card>
        </div>
      </div>
    </TeacherLayout>
  );
}

