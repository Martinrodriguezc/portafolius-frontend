import axios, { AxiosResponse } from 'axios';
import { config } from '../../../config/config';
import { Video } from '../../../types/VideoTypes';

interface DownloadResponse {
  downloadUrl: string;
}
interface MetaResponse {
  video: Video;
}

export async function fetchVideoUrl(id: string): Promise<string> {
  const response: AxiosResponse<DownloadResponse> = await axios.get(
    `${config.SERVER_URL}/video/generate_download_url/${id}`,
    { validateStatus: () => true }
  );
  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al obtener la URL de descarga`);
  }
  return response.data.downloadUrl;
}

export async function fetchVideoMeta(id: string): Promise<Video> {
  const response: AxiosResponse<MetaResponse> = await axios.get(
    `${config.SERVER_URL}/video/${id}/meta`,
    { validateStatus: () => true }
  );
  if (response.status !== 200) {
    throw new Error(`Error ${response.status} obteniendo metadatos`);
  }
  return response.data.video;
}

export async function postComment(id: string, text: string): Promise<void> {
  const response: AxiosResponse = await axios.post(
    `${config.SERVER_URL}/video/${id}/comments`,
    { text },
    {
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true,
    }
  );
  if (response.status !== 200 && response.status !== 201) {
    throw new Error(`Error ${response.status} al enviar el comentario`);
  }
}