import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoUrl, postComment } from "./utils/requests";

export function useVideoPage() {
  const { id } = useParams<{ id: string }>();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("No se proporcionó ID de vídeo");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const url = await fetchVideoUrl(id);
        setVideoUrl(url);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmitComment = async () => {
    if (!id || !comment.trim()) return;
    try {
      await postComment(id, comment.trim());
      setComment("");
    } catch (err) {
      console.error("Error enviando comentario:", err);
    }
  };

  return {
    videoUrl,
    loading,
    error,
    isPlaying,
    setIsPlaying,
    comment,
    setComment,
    handleSubmitComment,
  };
}
