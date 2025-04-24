import { useState } from "react";
import logger from "../../config/logger";
import {
  createNewStudy,
  generateUploadUrl,
  uploadVideo,
  assignTagsToClip,
} from "./utils/requests";
import { validateVideo } from "./validations/validations";
import { authService } from "../auth/authServices";

export function useUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState<{ id: number; text: string }[]>([]);
  const [selectedOrgan, setSelectedOrgan] = useState("");
  const [selectedStructure, setSelectedStructure] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [title, setTitle] = useState("");
  const userId = authService.getCurrentUser().id;

  if (!userId) {
    throw new Error("No hay userId en localStorage. Debes iniciar sesión.");
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => {
        const updated = [...prev, ...newFiles];
        logger.debug(
          "Archivos seleccionados:",
          updated.map((f) => f.name)
        );
        return updated;
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      logger.debug(
        `Archivo en índice ${index} removido. Quedan:`,
        updated.map((f) => f.name)
      );
      return updated;
    });
  };

  const addTag = () => {
    if (selectedOrgan && selectedStructure && selectedCondition) {
      const tagText = `${selectedOrgan} → ${selectedStructure} → ${selectedCondition}`;
      setTags((prev) => {
        const updated = [...prev, { id: Date.now(), text: tagText }];
        logger.info("Tag agregado:", tagText);
        return updated;
      });
      setSelectedOrgan("");
      setSelectedStructure("");
      setSelectedCondition("");
    } else {
      logger.warn("Faltan datos para agregar tag:", {
        selectedOrgan,
        selectedStructure,
        selectedCondition,
      });
    }
  };

  const removeTag = (id: number) => {
    setTags((prev) => {
      const updated = prev.filter((tag) => tag.id !== id);
      logger.debug("Tag removido, id:", id);
      return updated;
    });
  };

  const addCustomTag = () => {
    if (!tagInput.trim()) {
      logger.warn("Intento de agregar tag vacío");
      return;
    }
    setTags((prev) => {
      const updated = [...prev, { id: Date.now(), text: tagInput.trim() }];
      logger.info("Custom tag agregado:", tagInput.trim());
      return updated;
    });
    setTagInput("");
  };

  const handleSubmit = async () => {
    if (files.length < 4 && files.length > 8) {
      logger.warn("Submit fallido: Cantidad de archivos no es correcta");
      alert("Debes seleccionar entre 4 y 8 archivos para subir a tu estudio");
      return;
    }

    if (!protocol) {
      logger.warn("Submit fallido: no se seleccionó protocolo");
      alert("Debes seleccionar un protocolo");
      return;
    }
    if (tags.length == 0) {
      logger.warn("Submit fallido: tag incompleto", {
        selectedOrgan,
        selectedStructure,
      });
      alert(
        "Tienes etiquetas de diagnóstico sin agregar. Por favor completa y presiona 'Agregar tag' o limpia los campos."
      );
      return;
    }

    setIsUploading(true);
    try {
      logger.debug("Validando vídeo…");
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await validateVideo(file);
      }
      const studyId = await createNewStudy(userId, title, protocol);
      logger.info("Estudio creado con ID:", studyId);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        logger.info("Inicio de subida de vídeo", { file: file.name, protocol });

        const { uploadUrl, clipId } = await generateUploadUrl(file, studyId);
        logger.debug("URL prefirmada recibida:", uploadUrl);

        const progressBefore = Math.round((i / files.length) * 100);
        setUploadProgress(progressBefore);
        logger.debug(
          `Progreso actualizado a ${progressBefore}% para ${file.name}`
        );

        const result = await uploadVideo(uploadUrl, file);
        if (result.success) {
          logger.info("Vídeo subido exitosamente", { file: file.name });

          const tagIds = tags.map((t) => t.id);
          try {
            await assignTagsToClip(clipId, tagIds);
            logger.info(`Etiquetas asignadas a clipId ${clipId}:`, tagIds);
          } catch (err) {
            logger.error(
              `Error al asignar etiquetas al clipId ${clipId}:`,
              err
            );
          }
        } else {
          logger.error(
            "Error en uploadVideo para archivo:",
            file.name,
            result.message
          );
          alert(`Error al subir ${file.name}: ${result.message}`);
        }
      }

      setUploadProgress(100);
      alert("Todos los archivos se subieron exitosamente");
      setFiles([]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error("Error en handleSubmit global:", err);
      alert(`Error inesperado: ${message}`);
    } finally {
      setIsUploading(false);
      logger.debug("isUploading seteado a false");
    }
  };

  return {
    files,
    uploadProgress,
    isUploading,
    protocol,
    setProtocol,
    comment,
    setComment,
    tags,
    handleFileChange,
    removeFile,
    handleSubmit,
    selectedOrgan,
    setSelectedOrgan,
    selectedStructure,
    setSelectedStructure,
    selectedCondition,
    setSelectedCondition,
    addTag,
    removeTag,
    tagInput,
    setTagInput,
    addCustomTag,
    title,
    setTitle,
  };
}
