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
import { config } from "../../config/config";
import { FileWithMetadata } from "../../types/File";
import { Condition, Organ, Structure } from "../../types/tag";

export function useUploadPage() {
  const userId = authService.getCurrentUser()?.id;
  if (!userId) throw new Error("Debes iniciar sesión para subir videos");

  const [studies, setStudies] = useState<RawStudy[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<string>("");

  const [files, setFiles] = useState<FileWithMetadata[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [organs, setOrgans] = useState<Organ[]>([]);
  const [structures, setStructures] = useState<Structure[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);

  useEffect(() => {
    fetchStudentStudies(userId)
      .then(setStudies)
      .catch((err) => {
        logger.error("No se pudieron cargar los estudios:", err);
        alert("Error al cargar tus estudios");
      });

    fetch(`${config.SERVER_URL}/video/tag_utils`)
      .then((res) => res.json())
      .then((data: { organs: Organ[]; structures: Structure[]; conditions: Condition[] }) => {
        setOrgans(data.organs);
        setStructures(data.structures);
        setConditions(data.conditions);
      })
      .catch((err) => logger.error("Error al cargar tag utils:", err));
  }, [userId]);

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
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFileProtocol = (idx: number, protocol: string) =>
    setFiles((prev) => prev.map((f, i) => (i === idx ? { ...f, protocol } : f)));

  const updateFileOrgan = (idx: number, organId: string) =>
    setFiles((prev) => prev.map((f, i) => (i === idx ? { ...f, selectedOrgan: organId } : f)));

  const updateFileStructure = (idx: number, structId: string) =>
    setFiles((prev) => prev.map((f, i) => (i === idx ? { ...f, selectedStructure: structId } : f)));

  const updateFileCondition = (idx: number, condId: string) =>
    setFiles((prev) => prev.map((f, i) => (i === idx ? { ...f, selectedCondition: condId } : f)));

  const addTagToFile = (idx: number) => {
    setFiles((prev) => {
      const current = prev[idx];
      if (!current.selectedOrgan || !current.selectedStructure || !current.selectedCondition) {
        return prev;
      }
      const organName = organs.find((o) => String(o.id) === current.selectedOrgan)?.name ?? "";
      const structName = structures.find((s) => String(s.id) === current.selectedStructure)?.name ?? "";
      const condObj = conditions.find((c) => String(c.id) === current.selectedCondition);
      if (!condObj) {
        return prev;
      }
      const condName = condObj.name;
      const tagId = condObj.id;
      const text = `${organName} → ${structName} → ${condName}`;
      return prev.map((f, i) =>
        i === idx
          ? {
            ...f,
            tags: [...f.tags, { id: tagId, text }],
            selectedOrgan: "",
            selectedStructure: "",
            selectedCondition: "",
          }
          : f
      );
    });
  };

  const removeTagFromFile = (fileIdx: number, tagIdx: number) => {
    setFiles((prev) =>
      prev.map((f, i) =>
        i === fileIdx ? { ...f, tags: f.tags.filter((_, j) => j !== tagIdx) } : f
      )
    );
  };

  const handleSubmit = async () => {
    if (!selectedStudy) return alert("Selecciona un estudio.");
    if (files.length < 0 || files.length > 8) return alert("Selecciona entre 4 y 8 videos.");
    if (files.some((f) => !f.protocol)) return alert("Asigna protocolo a cada video.");

    setIsUploading(true);
    try {
      for (const { file } of files) {
        await validateVideo(file);
      }
      for (let i = 0; i < files.length; i++) {
        const { file, tags } = files[i];
        const tagIds = files[i].tags.map(t => t.id);
        const { uploadUrl, clipId } = await generateUploadUrl(
          file,
          selectedStudy,
          files[i].protocol,
          tagIds
        );
        console.log(files[i].protocol)
        setUploadProgress(Math.round((i / files.length) * 100));
        const res = await uploadVideo(uploadUrl, file);
        if (res.success && tags.length) {
          const tagIds = files[i].tags.map(t => t.id);
          await assignTagsToClip(clipId, tagIds, userId);
        }
      }
      setUploadProgress(100);
      alert("Videos subidos exitosamente");
      setFiles([]);
      setSelectedStudy("");
    } catch (e) {
      logger.error("Error en handleSubmit:", e);
      alert("Error inesperado al subir videos");
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
