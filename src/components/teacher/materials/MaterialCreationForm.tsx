import { useState, useEffect } from "react";
import { Link as LinkIcon } from "lucide-react";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { Label } from "../../common/Label/Label";
import MaterialUploadSection from "./MaterialUploadSection";
import StudentSelectionList from "./StudentSelectionList";
import { useCreateMaterial } from "../../../hooks/teacher/teacher/Materials/useCreateMaterial";

interface MaterialCreationFormProps {
  onSuccess: () => void;
}

export default function MaterialCreationForm({ onSuccess }: MaterialCreationFormProps) {
  const {
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
  } = useCreateMaterial();

  const [formError, setFormError] = useState<string | null>(null);
  const [touchedSubmit, setTouchedSubmit] = useState(false);

  useEffect(() => {
    if (success) {
      onSuccess();
      setFormError(null);
      setTouchedSubmit(false);
    }
  }, [success, onSuccess]);

  const isFormValid =
    material.title.trim() !== "" &&
    material.studentIds.length > 0 &&
    (material.type === "link" ? material.url.trim() !== "" : selectedFile !== null);

  const toggleStudent = (id: number | string) => {
    const studentId = typeof id === "string" ? parseInt(id, 10) : id;
    handleChange(
      "studentIds",
      material.studentIds.includes(studentId)
        ? material.studentIds.filter((x) => x !== studentId)
        : [...material.studentIds, studentId]
    );
  };

  const onCreateClick = () => {
    setTouchedSubmit(true);
    if (!isFormValid) {
      setFormError("Formulario incompleto");
      return;
    }
    setFormError(null);
    handleSubmit();
  };

  return (
    <Card className="bg-white p-6 rounded-[16px] shadow-sm border border-slate-200">
      {createError && <p className="text-red-500 mb-4">{createError}</p>}
      {touchedSubmit && formError && <p className="text-red-500 mb-4">{formError}</p>}
      {success && <p className="text-green-600 mb-4">Material creado exitosamente.</p>}

      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={material.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
          />
        </div>

        <div>
          <Label htmlFor="type">Tipo</Label>
          <select
            id="type"
            value={material.type}
            onChange={(e) => handleChange("type", e.target.value as "document" | "video" | "link")}
            className="w-full h-10 border rounded px-3 focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
          >
            <option value="document">Documento</option>
            <option value="video">Video</option>
            <option value="link">Enlace</option>
          </select>
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <textarea
            id="description"
            value={material.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
          />
        </div>

        {material.type === "link" ? (
          <div>
            <Label htmlFor="url">URL</Label>
            <div className="flex items-center">
              <LinkIcon className="h-5 w-5 mr-2 text-[#4E81BD]" />
              <Input
                id="url"
                value={material.url}
                onChange={(e) => handleChange("url", e.target.value)}
                className="focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
              />
            </div>
          </div>
        ) : (
          <div>
            <Label htmlFor="file">Archivo</Label>
            <MaterialUploadSection
              accept={material.type === "document" ? ".pdf" : ".mp4, .avi, .mov"}
              maxSizeMb={material.type === "document" ? 10 : 50}
              selectedFileName={selectedFile?.name ?? ""}
              onFileSelected={(file) => {
                setSelectedFile(file);
                handleChange("url", file.name);
              }}
            />
          </div>
        )}

        <StudentSelectionList
          students={students}
          selectedStudentIds={material.studentIds}
          isLoading={loadingStudents}
          error={studentsError}
          onToggleStudent={toggleStudent}
        />

        <div className="flex justify-end pt-6">
          <Button
            type="button"
            onClick={onCreateClick}
            disabled={creating}
            className="
              w-full md:w-auto px-8 py-3
              bg-[#4E81BD] hover:bg-[#3B6CA5] 
              text-white font-semibold text-sm
              border-2 border-[#4E81BD] hover:border-[#3B6CA5]
              rounded-xl
              shadow-md hover:shadow-lg
              transition-all duration-200 ease-in-out
              disabled:opacity-60 disabled:cursor-not-allowed
              focus:outline-none focus:ring-4 focus:ring-[#4E81BD]/20
              min-w-[160px]
            "
          >
            {creating ? "Creando…" : "Crear Material"}
          </Button>
        </div>
      </div>
    </Card>
  );
} 