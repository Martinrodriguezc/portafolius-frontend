import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FileText, Users, Link as LinkIcon } from "lucide-react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import { Label } from "../../components/common/Label/Label";
import { StatsCard } from "../../components/teacher/allEvaluations/StatsCard";
import MaterialUploadSection from "../../components/teacher/materials/MaterialUploadSection";
import { useCreateMaterial } from "../../hooks/teacher/teacher/Materials/useCreateMaterial";
import { useMaterialStats } from "../../hooks/teacher/teacher/Materials/useMaterialStats";

export default function TeacherMaterialsPage() {
  const qc = useQueryClient();
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
  const { data: stats, isLoading: statsLoading, error: statsError } = useMaterialStats();
  const [formError, setFormError] = useState<string | null>(null);
  const [touchedSubmit, setTouchedSubmit] = useState(false);

  useEffect(() => {
    if (success) {
      qc.invalidateQueries({ queryKey: ["materialStats"], exact: true });
      setFormError(null);
      setTouchedSubmit(false);
    }
  }, [success, qc]);

  const isFormValid =
    material.title.trim() !== "" &&
    material.studentIds.length > 0 &&
    (material.type === "link" ? material.url.trim() !== "" : selectedFile !== null);

  const toggleStudent = (id: number | string) => {
    const sid = typeof id === "string" ? parseInt(id, 10) : id;
    handleChange(
      "studentIds",
      material.studentIds.includes(sid)
        ? material.studentIds.filter((x) => x !== sid)
        : [...material.studentIds, sid]
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

  if (statsLoading) return <p className="p-8">Cargando estadísticas…</p>;
  if (statsError) return <p className="p-8 text-red-500">{statsError.toString()}</p>;

  return (
    <main className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full">
          <FileText className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">Materiales de estudio</h1>
          <p className="text-[#666666] text-[14px] mt-1">
            Sube y asigna materiales de estudio para tus estudiantes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={<Users className="h-6 w-6 text-white" />}
          title="Estudiantes sin materiales"
          value={stats!.studentsWithout}
          gradientFrom="amber-50"
          gradientTo="amber-100"
          border="border-amber-200"
          textColor="amber-800"
        />
        <StatsCard
          icon={<Users className="h-6 w-6 text-white" />}
          title="Estudiantes con materiales"
          value={stats!.studentsWith}
          gradientFrom="green-50"
          gradientTo="green-100"
          border="border-green-200"
          textColor="green-800"
        />
        <StatsCard
          icon={<FileText className="h-6 w-6 text-white" />}
          title="Materiales subidos"
          value={stats!.totalMaterials}
          gradientFrom="blue-50"
          gradientTo="blue-100"
          border="border-blue-200"
          textColor="blue-500"
        />
      </div>

      <Card className="bg-white p-6 rounded-[16px] shadow-sm border border-slate-200">
        {studentsError && <p className="text-red-500 mb-4">{studentsError}</p>}
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

          <div>
            <Label htmlFor="students">Estudiantes</Label>
            {loadingStudents ? (
              <p className="py-2">Cargando estudiantes…</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded p-2">
                {students.map((s) => {
                  const sid = typeof s.id === "string" ? parseInt(s.id, 10) : s.id;
                  const selected = material.studentIds.includes(sid);
                  return (
                    <label key={s.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleStudent(s.id)}
                        className="h-4 w-4 text-[#4E81BD] border-gray-300 rounded"
                      />
                      <span className={selected ? "font-medium" : ""}>
                        {s.first_name} {s.last_name} ({s.email})
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={onCreateClick}
              disabled={creating}
              className="w-full md:w-auto"
            >
              {creating ? "Creando…" : "Crear Material"}
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}