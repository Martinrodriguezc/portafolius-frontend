import { useState, useEffect, FormEvent } from "react";
import { fetchStudentsRequest, createMaterialRequest } from "./request/materialRequest";
import { UserProps } from "../../../../types/User";
import { CreateMaterialPayload } from "../../../../types/material";

export function useCreateMaterial() {
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

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoadingStudents(true);
        const { data } = await fetchStudentsRequest();
        setStudents(data);
      } catch (err) {
        setStudentsError((err as Error).message);
      } finally {
        setLoadingStudents(false);
      }
    })();
  }, []);

  const handleChange = <K extends keyof CreateMaterialPayload>(
    field: K,
    value: CreateMaterialPayload[K]
  ) => {
    setMaterial(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    setSuccess(false);

    try {
      await createMaterialRequest(material);
      setSuccess(true);
      setMaterial({
        type: "document",
        title: "",
        description: "",
        url: "",
        studentIds: [],
      });
    } catch (err) {
      setCreateError((err as Error).message);
    } finally {
      setCreating(false);
    }
  };

  return {
    students,
    loadingStudents,
    studentsError,
    material,
    creating,
    createError,
    success,
    handleChange,
    handleSubmit,
  };
}