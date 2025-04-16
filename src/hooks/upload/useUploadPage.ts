import { useState } from "react";

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
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (selectedOrgan && selectedStructure && selectedCondition) {
      const tagText = `${selectedOrgan} → ${selectedStructure} → ${selectedCondition}`;
      setTags((prev) => [...prev, { id: Date.now(), text: tagText }]);
      setSelectedOrgan("");
      setSelectedStructure("");
      setSelectedCondition("");
    }
  };

  const removeTag = (id: number) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const addCustomTag = () => {
    if (!tagInput.trim()) return;
    setTags((prev) => [...prev, { id: Date.now(), text: tagInput.trim() }]);
    setTagInput("");
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
    tagInput,
    setTagInput,
    addCustomTag,
  };
}