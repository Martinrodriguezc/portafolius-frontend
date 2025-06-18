import { useState, useEffect } from "react";
import logger from "../../config/logger";
import {
  generateUploadUrl,
  uploadVideo,
  notifyUploadCallback,
  anonymizeVideoLocally,
} from "./uploadRequests/requests";
import { validateVideo } from "./validations/validations";
import { authService } from "../auth/authServices";
import { RawStudy } from "../../types/Study";
import { fetchStudentStudies } from "../student/Studies/request/studiesRequest";
import { FileWithMetadata } from "../../types/File";

export function useUploadPage() {
  const userId = authService.getCurrentUser()?.id;
  if (!userId) throw new Error("Debes iniciar sesión para subir videos");

  const [studies, setStudies] = useState<RawStudy[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<string>("");

  const [files, setFiles] = useState<FileWithMetadata[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchStudentStudies(userId)
      .then((res) => {
        setStudies(res);
        setLoading(false);
      })
      .catch((err) => {
        logger.error("No se pudieron cargar los estudios:", err);
        setError(err);
        setLoading(false);
      });
  }, [userId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles: FileWithMetadata[] = Array.from(e.target.files).map((file) => ({
      file,
      protocolKey: "",
      comment: "",
      isReady: false,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFileProtocol = (idx: number, protocolKey: string) =>
    setFiles((prev) => prev.map((f, i) => (i === idx ? { ...f, protocolKey } : f)));

  const updateFileWindow = (idx: number, windowId: number) =>
    setFiles((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, windowId } : f
      )
    );

  const updateFileFinding = (idx: number, findingId: number) =>
    setFiles((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, findingId } : f
      )
    );

  const updateFileDiagnosis = (idx: number, diagnosisId: number) =>
    setFiles((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, diagnosisId } : f
      )
    );

  const updateFileSubdiagnosis = (idx: number, subdiagnosisId: number) =>
    setFiles((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, subdiagnosisId } : f
      )
    );

  const updateFileSubSub = (idx: number, subSubId: number) =>
    setFiles((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, subSubId } : f
      )
    );

  const updateFileThirdOrder = (idx: number, thirdOrderId: number) =>
    setFiles((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, thirdOrderId } : f
      )
    );

  const updateFileComment = (idx: number, comment: string) =>
    setFiles(prev =>
      prev.map((f, i) =>
        i === idx ? { ...f, comment } : f
      )
    );

  const updateFileReady = (idx: number, isReady: boolean) =>
    setFiles(prev =>
      prev.map((f, i) =>
        i === idx ? { ...f, isReady } : f
      )
    );

  const handleSubmit = async () => {
    if (!selectedStudy) return alert("Selecciona un estudio.");
    if (files.length < 0 || files.length > 8) return alert("Selecciona entre 4 y 8 videos.");
    if (files.some((f) => !f.protocolKey)) return alert("Asigna protocolo a cada video.");

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const anonymizedFiles: { file: File; protocolKey: string }[] = [];
      for (const { file, protocolKey } of files) {
        const anonymizedFile = await anonymizeVideoLocally(file);
        await validateVideo(anonymizedFile);
        anonymizedFiles.push({ file: anonymizedFile, protocolKey: protocolKey! });
      }

      for (let i = 0; i < anonymizedFiles.length; i++) {
        const { file, protocolKey } = anonymizedFiles[i];

        const { uploadUrl, clipId, key } = await generateUploadUrl(
          file,
          selectedStudy,
          protocolKey,
          []
        );

        await uploadVideo(uploadUrl, file, (percent) => {
          const totalPercent = Math.round(
            ((i + percent / 100) / anonymizedFiles.length) * 100
          );
          setUploadProgress(totalPercent);
        });

        const { thumbnailKey } = await notifyUploadCallback(key, String(clipId));
        console.log("Miniatura generada en:", thumbnailKey);
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
    updateFileWindow,
    updateFileFinding,
    updateFileDiagnosis,
    updateFileSubdiagnosis,
    updateFileSubSub,
    updateFileThirdOrder,
    updateFileComment,
    updateFileReady,
    handleSubmit,
    loading,
    error,
  };
}