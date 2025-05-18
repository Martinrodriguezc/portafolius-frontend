import axios, { AxiosResponse } from 'axios';
import { config } from '../../../config/config';
import logger from '../../../config/logger';
import { authService } from '../../auth/authServices';

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export async function generateUploadUrl(
  file: File,
  studyId: string,
  protocol: string,
  tagIds: number[]
): Promise<{ uploadUrl: string; clipId: number; key: string }> {
  logger.debug('Iniciando generateUploadUrl para:', file.name);
  const endpoint = `${config.SERVER_URL}/video/generate_upload_url`;
  logger.debug('Solicitando URL prefirmada a:', endpoint);

  try {
    const response: AxiosResponse<{
      uploadUrl: string;
      clipId: number;
      message?: string;
      key: string;
    }> = await axios.post(
      endpoint,
      {
        userId: authService.getCurrentUser()?.id,
        fileName: file.name,
        contentType: file.type,
        studyId,
        sizeBytes: file.size,
        protocol,
        tagsIds: tagIds,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: () => true,
      }
    );

    if (response.status !== 200) {
      const errData = response.data as ErrorResponse;
      throw new Error(errData.message ?? 'Error al obtener la URL prefirmada');
    }

    return {
      uploadUrl: response.data.uploadUrl,
      clipId: response.data.clipId,
      key: response.data.key,
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const errData = err.response.data as ErrorResponse;
      throw new Error(errData.message ?? 'Error al obtener la URL prefirmada');
    }
    throw err;
  }
}

export async function uploadVideo(
  uploadUrl: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ success: boolean; message: string }> {
  logger.info("Subiendo archivo a S3:", uploadUrl);

  try {
    const response = await axios.put<string>(uploadUrl, file, {
      headers: { "Content-Type": file.type },
      validateStatus: () => true,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (onProgress) onProgress(percentCompleted);
        }
      },
    });

    if (response.status < 200 || response.status >= 300) {
      const errData = response.data as unknown;
      const msg =
        typeof errData === "object" &&
          errData !== null &&
          "message" in errData
          ? (errData as { message: string }).message
          : undefined;
      throw new Error(msg ?? "Error al subir el archivo a S3");
    }

    logger.info("Archivo subido exitosamente a S3:", {
      name: file.name,
      size: file.size,
    });
    return { success: true, message: "Archivo subido correctamente" };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const errData = err.response.data as { message?: string };
      throw new Error(errData.message ?? "Error al subir el archivo a S3");
    }
    throw err;
  }
}


export async function assignTagsToClip(
  clipId: number,
  tagIds: number[],
  userId: string
): Promise<void> {
  const endpoint = `${config.SERVER_URL}/video/${clipId}/tags`;

  try {
    const response = await axios.post<void, AxiosResponse<ErrorResponse>>(
      endpoint,
      { tagIds, userId },
      { validateStatus: () => true }
    );

    if (response.status !== 200) {
      // Si response.data es undefined, lo reemplazamos por {}
      const errData = response.data ?? {};
      throw new Error(
        errData.message ??
        `Error ${response.status} al asignar etiquetas al clip`
      );
    }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // igual aquí: err.response.data puede ser undefined
      const errData = err.response.data ?? {};
      throw new Error(
        errData.message ??
        `Error ${err.response.status} al asignar etiquetas al clip`
      );
    }
    throw err;
  }
}

export interface UploadCallbackResponse {
  success: boolean;
  thumbnailKey?: string;
  message?: string;
}


export async function notifyUploadCallback(
  key: string,
  videoId: string
): Promise<UploadCallbackResponse> {
  const res = await fetch(`${config.SERVER_URL}/video/upload-callback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key, videoId })
  });

  if (!res.ok) {
    let errorMsg = `Error ${res.status}`;
    try {
      const err = await res.json();
      errorMsg = err.message || errorMsg;
    } catch (err: unknown){
      console.error("Error al parsear la respuesta de error:", err);
    throw new Error(errorMsg);
  }
  }

  return (await res.json()) as UploadCallbackResponse;
}