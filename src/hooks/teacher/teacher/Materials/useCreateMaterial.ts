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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    void fetchStudentsRequest()
      .then(({ data }) =>
        setStudents((data as UserProps[]).filter((u) => u.role === "estudiante"))
      )
      .catch((e) => setStudentsError(e.message))
      .finally(() => setLoadingStudents(false));
  }, []);

  const handleChange = <K extends keyof CreateMaterialPayload>(
    field: K,
    value: CreateMaterialPayload[K]
  ) => setMaterial((m) => ({ ...m, [field]: value }));

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const isLink = material.type === "link";
    if (
      material.title.trim() === "" ||
      material.studentIds.length === 0 ||
      (!isLink && !selectedFile) ||
      (isLink && material.url.trim() === "")
    ) {
      setCreateError("Debes completar todos los campos requeridos");
      return;
    }
    setCreating(true);
    setCreateError(null);
    try {
      if (isLink) {
        await createLinkRequest({
          type: material.type,
          title: material.title,
          description: material.description,
          url: material.url,
          studentIds: material.studentIds,
        });
      } else {
        const fd = new FormData();
        fd.append("type", material.type);
        fd.append("title", material.title);
        fd.append("description", material.description);
        fd.append("studentIds", JSON.stringify(material.studentIds));
        fd.append("file", selectedFile!);
        await createMaterialRequest(fd);
      }
      setSuccess(true);
      qc.invalidateQueries({ queryKey: ["materialStats"] });
      qc.invalidateQueries({ queryKey: ["materials"] });
      setMaterial({ type: "document", title: "", description: "", url: "", studentIds: [] });
      setSelectedFile(null);
    } catch (err: any) {
      setCreateError(err.message || "Error creando material");
    } finally {
      setCreating(false);
    }
  };

  return {
    students,
    loadingStudents,
    studentsError,
    material,
    selectedFile,
    setSelectedFile,
    creating,
    createError,
    success,
    handleChange,
    handleSubmit,
  };
}