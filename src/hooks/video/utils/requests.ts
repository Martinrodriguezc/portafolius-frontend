import { config } from "../../../config/config";
import { Video } from "../../../types/Video";

interface DownloadResponse {
  downloadUrl: string;
}
interface MetaResponse {
  video: Video;
}

export async function fetchVideoUrl(id: string): Promise<string> {
  const response = await fetch(
    `${config.SERVER_URL}/video/generate_download_url/${id}`
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status} al obtener la URL de descarga`);
  }
  const data: DownloadResponse = await response.json();
  return data.downloadUrl;
}

export async function fetchVideoMeta(id: string): Promise<Video> {
  const resp = await fetch(`${config.SERVER_URL}/video/${id}/meta`);
  if (!resp.ok) throw new Error(`Error ${resp.status} obteniendo metadatos`);
  const data: MetaResponse = await resp.json();
  console.log(data.video);
  return data.video;
}

export async function postComment(id: string, text: string): Promise<void> {
  const response = await fetch(`${config.SERVER_URL}/video/${id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status} al enviar el comentario`);
  }
}
