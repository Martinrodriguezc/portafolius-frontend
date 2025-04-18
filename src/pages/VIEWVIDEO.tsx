//REMOVEEEEEEE
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../config/config";

interface DownloadResponse {
  downloadUrl: string;
}

export default function VideoViewer() {
  const { clipId } = useParams<{ clipId: string }>();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!clipId) {
      setError("No se proporcionó clipId");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const resp = await fetch(`${config.SERVER_URL}/video/generate_download_url/${clipId}`);
        if (!resp.ok) throw new Error(`Error ${resp.status}`);
        const data: DownloadResponse = await resp.json();
        setVideoUrl(data.downloadUrl);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [clipId]);

  if (loading) return <p>Cargando vídeo…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
      <video
        src={videoUrl}
        controls
        style={{ maxWidth: "100%", maxHeight: "80vh", background: "black" }}
      >
        Tu navegador no soporta el elemento <code>video</code>.
      </video>
    </div>
  );
}
