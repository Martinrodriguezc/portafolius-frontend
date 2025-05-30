import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchVideoMeta, fetchVideoUrl } from "../../../video/utils/requests";
import { Video } from "../../../../types/VideoTypes";
import { Protocol } from "../../../../types/protocol";
import { protocolService } from "../../protocolService/protocolService";
import { attemptService } from "../../attemptService/attemptService";

export function useTeacherEvaluateVideo() {
  const { clipId } = useParams<{ clipId: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [url, setUrl] = useState<string>("");
  const [meta, setMeta] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [responses, setResponses] = useState<{ itemKey: string; score: number }[]>([]);

  // Carga del video
  useEffect(() => {
    const loadMedia = async () => {
      if (!clipId) {
        setError("No se proporcionó ID de video");
        setLoading(false);
        return;
      }
      try {
        const [videoUrl, videoMeta] = await Promise.all([
          fetchVideoUrl(clipId),
          fetchVideoMeta(clipId),
        ]);
        setUrl(videoUrl);
        setMeta(videoMeta);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error al cargar vídeo");
        }
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [clipId]);

  // Carga del protocolo
  useEffect(() => {
    if (!meta?.protocol) return;
    (async () => {
      try {
        const proto = await protocolService.get(meta.protocol);
        setProtocol(proto);
        const initial = proto.sections.flatMap(sec =>
          sec.items.map(item => ({ itemKey: item.key, score: 0 }))
        );
        setResponses(initial);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("No se pudo cargar protocolo");
        }
      }
    })();
  }, [meta]);

  // Actualización de puntaje local
  const updateScore = (itemKey: string, score: number) => {
    setResponses(rs =>
      rs.map(r => (r.itemKey === itemKey ? { ...r, score } : r))
    );
  };

  // Estado del reproductor
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => {
      if (vid.duration) setProgress((vid.currentTime / vid.duration) * 100);
    };
    vid.addEventListener("timeupdate", onTime);
    return () => {
      vid.removeEventListener("timeupdate", onTime);
    };
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
    if (!vid?.duration) return;
    const val = Number(e.target.value);
    vid.currentTime = (val / 100) * vid.duration;
    setProgress(val);
  };

  const toggleFullscreen = () => {
    const cont = videoRef.current?.parentElement;
    if (!cont) return;
    if (!isFullscreen) {
      cont.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const onSubmit = async () => {
    if (!clipId || !protocol) return;
    try {
      await attemptService.create(Number(clipId), {
        protocolKey: protocol.key,
        responses,
      });
      alert("Evaluación enviada exitosamente");
      navigate("/teacher/evaluations");
    } catch (err) {
      console.error(err);
      alert("Error al enviar la evaluación");
    }
  };

  return {
    videoRef,
    url,
    meta,
    loading,
    error,
    protocol,
    responses,
    updateScore,
    onSubmit,
    isPlaying,
    togglePlay,
    progress,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
  };
}


