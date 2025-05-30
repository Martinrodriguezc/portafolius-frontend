import { useState, useEffect, FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  fetchStudentsRequest,
  createMaterialRequest,
  createLinkRequest,
} from "./request/materialRequest";
import { UserProps } from "../../../../types/User";
import { CreateMaterialPayload } from "../../../../types/material";

export function useCreateMaterial() {
  const qc = useQueryClient();
  const [students, setStudents] = useState<UserProps[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentsError, setStudentsError] = useState<string | null>(null);
  const [material, setMaterial] = useState<CreateMaterialPayload>({
    type: "document",
    title: "",
    description: "",
    url: "",
    studentIds: [],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);

  useEffect(() => {
    void fetchStudentsRequest()
      .then((res) => setStudents(res.data.filter((u) => u.role === "estudiante")))
      .catch((err: Error) => setStudentsError(err.message))
      .finally(() => setLoadingStudents(false));
  }, []);

  const handleChange = <K extends keyof CreateMaterialPayload>(
    field: K,
    value: CreateMaterialPayload[K]
  ) => {
    setMaterial((m) => ({ ...m, [field]: value }));
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const isLink = material.type === "link";
    if (
      material.title.trim() === "" ||
      material.studentIds.length === 0 ||
      (isLink
        ? selectedLinks.length === 0
        : selectedFiles.length === 0)
    ) {
      setCreateError("Debes completar todos los campos requeridos");
      return;
    }

    setCreating(true);
    setCreateError(null);
    try {
      if (isLink) {
        const total = selectedLinks.length;
        for (let i = 0; i < total; i++) {
          const link = selectedLinks[i];
          await createLinkRequest({
            type: material.type,
            title: `${material.title} (${i + 1}/${total})`,
            description: material.description,
            url: link,
            studentIds: material.studentIds,
          });
        }
      } else {
        const total = selectedFiles.length;
        for (let i = 0; i < total; i++) {
          const file = selectedFiles[i];
          const fd = new FormData();
          fd.append("type", material.type);
          fd.append("title", `${material.title} (${i+1}/${total})`);
          fd.append("description", material.description);
          fd.append("studentIds", JSON.stringify(material.studentIds));
          fd.append("file", file);
          await createMaterialRequest(fd);
        }
      }

      setSuccess(true);
      qc.invalidateQueries({ queryKey: ["materialStats"] });
      qc.invalidateQueries({ queryKey: ["materials"] });
      setMaterial({ type: "document", title: "", description: "", url: "", studentIds: [] });
      setSelectedFiles([]);
      setSelectedLinks([]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error creando material";
      setCreateError(msg);
    } finally {
      setCreating(false);
    }
  };

  return {
    students,
    loadingStudents,
    studentsError,
    material,
    selectedFiles,
    setSelectedFiles,
    selectedLinks,
    setSelectedLinks,
    creating,
    createError,
    success,
    handleChange,
    handleSubmit,
  };
}