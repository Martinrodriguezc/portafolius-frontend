import { useState, ChangeEvent } from "react";

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (selectedOrgan && selectedStructure && selectedCondition) {
      const tagText = `${selectedOrgan} → ${selectedStructure} → ${selectedCondition}`;
      setTags([...tags, { id: Date.now(), text: tagText }]);
      setSelectedOrgan("");
      setSelectedStructure("");
      setSelectedCondition("");
    }
  };

  const removeTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleSubmit = () => {
    if (files.length < 4 || files.length > 8) {
      alert("Debes subir entre 4 y 8 videos");
      return;
    }
    if (!protocol) {
      alert("Debes seleccionar un protocolo");
      return;
    }
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        alert("Estudio enviado con éxito");
      }
    }, 200);
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
  };
}