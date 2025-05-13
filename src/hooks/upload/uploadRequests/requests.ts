import axios, { AxiosResponse } from 'axios';
import { config } from '../../../config/config';
import logger from '../../../config/logger';
import { authService } from '../../auth/authServices';

export async function generateUploadUrl(
  file: File,
  studyId: string,
  protocol: string,
  tagIds: number[]
): Promise<{ uploadUrl: string; clipId: number }> {
  logger.debug('Iniciando generateUploadUrl para:', file.name);
  const endpoint = `${config.SERVER_URL}/video/generate_upload_url`;
  logger.debug('Solicitando URL prefirmada a:', endpoint);

  try {
    const response: AxiosResponse<{
      uploadUrl: string;
      clipId: number;
      message?: string;
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
      const msg = response.data.message;
      throw new Error(msg || 'Error al obtener la URL prefirmada');
    }

    return {
      uploadUrl: response.data.uploadUrl,
      clipId: response.data.clipId,
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const msg = (err.response.data as any).message;
      throw new Error(msg || 'Error al obtener la URL prefirmada');
    }
    throw err;
  }
}

export async function uploadVideo(
  uploadUrl: string,
  file: File
): Promise<{ success: boolean; message: string }> {
  logger.info('Subiendo archivo a S3:', uploadUrl);

  try {
    const response = await axios.put(uploadUrl, file, {
      headers: { 'Content-Type': file.type },
      validateStatus: () => true,
    });

    if (response.status < 200 || response.status >= 300) {
      const msg = (response.data as any).message;
      throw new Error(msg || 'Error al subir el archivo a S3');
    }

    logger.info('Archivo subido exitosamente a S3:', {
      name: file.name,
      size: file.size,
    });
    return { success: true, message: 'Archivo subido correctamente' };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const msg = (err.response.data as any).message;
      throw new Error(msg || 'Error al subir el archivo a S3');
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
    const response = await axios.post(
      endpoint,
      { tagIds, userId },
      { validateStatus: () => true }
    );
    if (response.status !== 200) {
      throw new Error(`Error ${response.status} al asignar etiquetas al clip`);
    }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        (err.response.data as any).message ||
          `Error ${err.response.status} al asignar etiquetas al clip`
      );
    }
    throw err;
  }
}
