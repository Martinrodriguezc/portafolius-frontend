import { config } from "../../../config/config";
import { validateVideo } from "../validations/validations";
import logger from "../../../config/logger";

export const generateUploadUrl = async (file: File): Promise<string> => {
  logger.debug("Iniciando generateUploadUrl para:", file.name);

  logger.debug("Validando vídeo…");
  await validateVideo(file);
  logger.info("Validación de vídeo OK:", {
    name: file.name,
    size: file.size,
    type: file.type,
  });

  const endpoint = `${config.SERVER_URL}/video/generate_upload_url`;
  logger.debug("Solicitando URL prefirmada a:", endpoint);

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
      }),
    });
    logger.debug("Respuesta recibida de generate_upload_url:", response);
  } catch (networkError) {
    logger.error("Error de red al pedir URL prefirmada:", networkError);
    throw networkError;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    logger.error("Backend devolvió error al generar URL:", {
      status: response.status,
      body: errorData,
    });
    throw new Error(errorData.message || "Error al obtener la URL prefirmada");
  }

  const data = await response.json();
  const { uploadUrl } = data;
  logger.info("URL prefirmada obtenida con éxito:", uploadUrl);
  return uploadUrl;
};

export const uploadVideo = async (
  uploadUrl: string,
  file: File
): Promise<{ success: boolean; message: string }> => {
  logger.info("Subiendo archivo a S3:", uploadUrl);

  let response: Response;
  try {
    response = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    logger.debug("Respuesta de S3 al PUT:", response);
  } catch (networkError) {
    logger.error("Error de red al subir vídeo a S3:", networkError);
    throw networkError;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    logger.error("S3 devolvió error al subir vídeo:", {
      status: response.status,
      body: errorData,
    });
    throw new Error(errorData.message || "Error al subir el archivo a S3");
  }

  logger.info("Archivo subido exitosamente a S3:", {
    name: file.name,
    size: file.size,
  });
  return { success: true, message: "Archivo subido correctamente" };
};
