import { useState, useEffect } from "react";
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

export default function MaterialCreationForm({
  onSuccess,
}: MaterialCreationFormProps) {
  const {
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
    toggleStudent,
    selectAllStudents,
    clearAllStudents,
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
    (material.type === "link"
      ? selectedLinks.length > 0
      : selectedFiles.length > 0);

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
      {touchedSubmit && formError && (
        <p className="text-red-500 mb-4">{formError}</p>
      )}
      {success && (
        <p className="text-green-600 mb-4">Material creado exitosamente.</p>
      )}

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
            onChange={(e) => {
              const nuevoTipo = e.target.value as
                | "document"
                | "video"
                | "link";
              handleChange("type", nuevoTipo);
              setSelectedFiles([]);
              setSelectedLinks([]);
            }}
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
            <Label>Enlaces</Label>
            {selectedLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <Input
                  id={`link-${i}`}
                  value={link}
                  onChange={(e) => {
                    const nuevos = [...selectedLinks];
                    nuevos[i] = e.target.value;
                    setSelectedLinks(nuevos);
                  }}
                  placeholder="https://..."
                />
                <button
                  type="button"
                  onClick={() =>
                    setSelectedLinks((prev) => prev.filter((_, j) => j !== i))
                  }
                  className="text-red-500 px-2"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSelectedLinks((prev) => [...prev, ""])}
              className="text-sm bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-3 py-1 rounded-md shadow-sm transition"
            >
              + Agregar enlace
            </button>
          </div>
        ) : (
          <div>
            <Label htmlFor="file">Archivos</Label>
            <MaterialUploadSection
              accept={
                material.type === "document"
                  ? ".pdf"
                  : ".mp4, .avi, .mov"
              }
              maxSizeMb={material.type === "document" ? 10 : 50}
              selectedFileNames={selectedFiles.map((f) => f.name)}
              onFilesSelected={(files) =>
                setSelectedFiles((prev) => [
                  ...prev,
                  ...Array.from(files).filter(
                    (f) => !prev.some((p) => p.name === f.name)
                  ),
                ])
              }
              onRemoveFile={(idx) =>
                setSelectedFiles((prev) =>
                  prev.filter((_, i) => i !== idx)
                )
              }
            />
          </div>
        )}

        <StudentSelectionList
          students={students}
          selectedStudentIds={material.studentIds}
          isLoading={loadingStudents}
          error={studentsError}
          onToggleStudent={toggleStudent}
          onSelectAll={selectAllStudents}
          onClearAll={clearAllStudents}
        />

        <div className="flex justify-end pt-6">
          <Button
            onClick={onCreateClick}
            disabled={creating}
            className="w-full md:w-auto px-8 py-3 bg-[#4E81BD] hover:bg-[#3B6CA5] text-white font-semibold text-sm border-2 border-[#4E81BD] hover:border-[#3B6CA5] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#4E81BD]/20 min-w-[160px]"
          >
            {creating ? "Creando…" : "Crear Material(es)"}
          </Button>
        </div>
      </div>
    </Card>
  );
}