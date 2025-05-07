import { useState, useEffect } from "react";
import logger from "../../config/logger";
import {
  generateUploadUrl,
  uploadVideo,
  assignTagsToClip,
} from "./requests/requests";
import { validateVideo } from "./validations/validations";
import { authService } from "../auth/authServices";
import { RawStudy } from "../../types/Study";
import { fetchStudentStudies } from "../student/Studies/request/studiesRequest";
import { FileWithMetadata } from "../../components/student/upload/UploadSection";

/**
 * Hook para manejar la página de subida de videos a un estudio.
 */
export function useUploadPage() {
  const userId = authService.getCurrentUser()?.id;
  if (!userId) throw new Error("No hay userId en localStorage. Debes iniciar sesión.");

  const [studies, setStudies] = useState<RawStudy[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<string>("");
  const [files, setFiles] = useState<FileWithMetadata[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Carga los estudios al montar
  useEffect(() => {
    fetchStudentStudies(userId)
      .then(setStudies)
      .catch((err) => {
        logger.error("No se pudieron cargar los estudios:", err);
        alert("Error al cargar tus estudios");
      });
  }, [userId]);

  // Cuando el usuario selecciona archivos nuevos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles: FileWithMetadata[] = Array.from(e.target.files).map((file) => ({
      file,
      protocol: "",
      selectedOrgan: "",
      selectedStructure: "",
      selectedCondition: "",
      tags: [],
    }));
    setFiles((prev) => {
      const updated = [...prev, ...newFiles];
      logger.debug("Archivos seleccionados con metadata:", updated.map((f) => f.file.name));
      return updated;
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    logger.debug(`Archivo metadata en índice ${index} removido.`);
  };

  const updateFileProtocol = (index: number, protocol: string) => {
    setFiles((prev) => prev.map((item, i) => (i === index ? { ...item, protocol } : item)));
  };
  const updateFileOrgan = (index: number, selectedOrgan: string) => {
    setFiles((prev) => prev.map((item, i) => (i === index ? { ...item, selectedOrgan } : item)));
  };
  const updateFileStructure = (index: number, selectedStructure: string) => {
    setFiles((prev) => prev.map((item, i) => (i === index ? { ...item, selectedStructure } : item)));
  };
  const updateFileCondition = (index: number, selectedCondition: string) => {
    setFiles((prev) => prev.map((item, i) => (i === index ? { ...item, selectedCondition } : item)));
  };

  const addTagToFile = (index: number) => {
    setFiles((prev) => {
      const item = prev[index];
      if (!item.selectedOrgan || !item.selectedStructure || !item.selectedCondition) return prev;
      const newTag = `${item.selectedOrgan} → ${item.selectedStructure} → ${item.selectedCondition}`;
      return prev.map((it, i) =>
        i === index
          ? { ...it, tags: [...it.tags, newTag], selectedOrgan: "", selectedStructure: "", selectedCondition: "" }
          : it
      );
    });
  };

  const removeTagFromFile = (fileIndex: number, tagIndex: number) => {
    setFiles((prev) =>
      prev.map((item, i) =>
        i === fileIndex ? { ...item, tags: item.tags.filter((_, j) => j !== tagIndex) } : item
      )
    );
  };

  const handleSubmit = async () => {
    if (!selectedStudy) {
      alert("Por favor selecciona un estudio al cual subir los videos.");
      return;
    }
    // Validar archivos mínimos
    if (files.length < 0 || files.length > 8) {
      alert("Debes seleccionar entre 4 y 8 archivos para subir a tu estudio");
      return;
    }
    // Validar que cada archivo tenga protocolo
    if (files.some((f) => !f.protocol)) {
      alert("Por favor asigna un protocolo a cada video.");
      return;
    }

    setIsUploading(true);
    try {
      // Validación de cada video
      for (const { file } of files) {
        await validateVideo(file);
      }

      for (let i = 0; i < files.length; i++) {
        const { file, tags } = files[i];
        logger.info("Inicio de subida de vídeo", { file: file.name });

        // Solicitar URL prefirmada
        const { uploadUrl, clipId } = await generateUploadUrl(file, selectedStudy);

        const progressBefore = Math.round((i / files.length) * 100);
        setUploadProgress(progressBefore);

        // Subir al storage
        const result = await uploadVideo(uploadUrl, file);
        if (!result.success) {
          alert(`Error al subir ${file.name}: ${result.message}`);
          continue;
        }

        // Asignar tags al clip recién creado
        const tagList = files[i].tags;
        if (tagList.length > 0) {
          await assignTagsToClip(clipId, tagList.map((_, idx) => idx)); // o usar IDs reales
        }
      }

      setUploadProgress(100);
      alert("Todos los archivos se subieron exitosamente");
      setFiles([]);
      setSelectedStudy("");
    } catch (err: any) {
      logger.error("Error en handleSubmit:", err);
      alert(`Error inesperado: ${err.message || err}`);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    studies,
    files,
    uploadProgress,
    isUploading,
    selectedStudy,
    setSelectedStudy,
    handleFileChange,
    removeFile,
    updateFileProtocol,
    updateFileOrgan,
    updateFileStructure,
    updateFileCondition,
    addTagToFile,
    removeTagFromFile,
    handleSubmit,
  };
}
