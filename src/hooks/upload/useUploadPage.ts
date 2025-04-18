import { useState } from "react";
import logger from "../../config/logger";
import { generateUploadUrl, uploadVideo } from "./utils/requests";

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
    if (files.length === 0) {
      logger.warn("Submit fallido: no hay archivos seleccionados");
      alert("Debes seleccionar un archivo para subir");
      return;
    }

    if (!protocol) {
      logger.warn("Submit fallido: no se seleccionó protocolo");
      alert("Debes seleccionar un protocolo");
      return;
    }

    if (selectedOrgan == "" || selectedStructure == "" /*|| selectedCondition == ""*/) {
      logger.warn("Submit fallido: tag incompleto", {
        selectedOrgan,
        selectedStructure,
        selectedCondition,
      });
      alert(
        "Tienes etiquetas de diagnóstico sin agregar. Por favor completa y presiona 'Agregar tag' o limpia los campos."
      );
      return;
    }

    /*if (tags.length === 0) {
      logger.warn("Submit fallido: no hay tags agregados");
      alert("Debes agregar al menos un tag antes de enviar");
      return;
    }*/


    setIsUploading(true);
    logger.info("Inicio de subida de vídeo", { file: files[0].name, protocol });

    try {
      const file = files[0];
      const uploadUrl = await generateUploadUrl(file);
      logger.debug("URL prefirmada recibida:", uploadUrl);

      setUploadProgress(50);
      logger.debug("Progreso actualizado a 50%");

      const result = await uploadVideo(uploadUrl, file);
      if (result.success) {
        logger.info("Vídeo subido exitosamente");
        alert("Archivo subido exitosamente");
        setUploadProgress(100);
      } else {
        logger.error("Error en uploadVideo:", result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

      logger.error("Error en handleSubmit:", err);
      alert(message);
    } finally {
      setIsUploading(false);
      logger.debug("isUploading set a false");
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
  };
}
