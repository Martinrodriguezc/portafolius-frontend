// src/services/videoService.ts
import { config } from "../../../config/config";

interface DownloadResponse {
  downloadUrl: string;
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

export async function postComment(id: string, text: string): Promise<void> {
  const response = await fetch(
    `${config.SERVER_URL}/video/${id}/comments`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    }
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status} al enviar el comentario`);
  }
}