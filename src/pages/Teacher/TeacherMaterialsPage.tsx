import { FileText, Link as LinkIcon } from "lucide-react";
import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import { Label } from "../../components/common/Label/Label";
import { useCreateMaterial } from "../../hooks/teacher/teacher/Materials/useCreateMaterial";
import { UserProps } from "../../types/User";

export default function TeacherMaterialsPage() {
  const {
    students,
    loadingStudents,
    studentsError,
    material,
    creating,
    createError,
    success,
    handleChange,
    handleSubmit,
  } = useCreateMaterial();

  return (
    <div className="p-8 md:p-10 max-w-4xl mx-auto">
      {/* Cabecera */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full">
          <FileText className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">Crear Material</h1>
          <p className="text-[#666666] text-[14px] mt-1">
            Sube documentos, videos o enlaces y asígnalos a tus estudiantes.
          </p>
        </div>
      </div>

      <Card className="p-6">
        {studentsError && <p className="text-red-500">{studentsError}</p>}
        {createError   && <p className="text-red-500">{createError}</p>}
        {success       && <p className="text-green-600 mb-4">Material creado exitosamente.</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={material.title}
              onChange={e => handleChange("title", e.target.value)}
              required
            />
          </div>

          {/* Tipo */}
          <div>
            <Label htmlFor="type">Tipo</Label>
            <select
              id="type"
              value={material.type}
              onChange={e => handleChange("type", e.target.value as any)}
              className="w-full h-10 border rounded px-3"
            >
              <option value="document">Documento</option>
              <option value="video">Video</option>
              <option value="link">Enlace</option>
            </select>
          </div>

          {/* Descripción */}
          <div>
            <Label htmlFor="description">Descripción</Label>
            <textarea
              id="description"
              value={material.description}
              onChange={e => handleChange("description", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* URL / Archivo */}
          {material.type === "link" ? (
            <div>
              <Label htmlFor="url">URL</Label>
              <div className="flex items-center">
                <LinkIcon className="h-5 w-5 mr-2 text-[#4E81BD]" />
                <Input
                  id="url"
                  value={material.url}
                  onChange={e => handleChange("url", e.target.value)}
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <Label htmlFor="url">Archivo</Label>
              <Input
                id="url"
                type="file"
                accept={material.type === "document" ? ".pdf" : "video/*"}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleChange("url", file.name);
                    handleChange("size_bytes", file.size);
                    handleChange("mime_type", file.type);
                  }
                }}
                required
              />
            </div>
          )}

          {/* Selección múltiple de estudiantes */}
          <div>
            <Label htmlFor="students">Estudiantes</Label>
            <select
              id="students"
              multiple
              value={material.studentIds.map(String)}
              onChange={e => {
                const vals = Array.from(e.target.selectedOptions).map(o => Number(o.value));
                handleChange("studentIds", vals);
              }}
              className="w-full h-32 border rounded px-3"
            >
              {loadingStudents ? (
                <option disabled>Cargando...</option>
              ) : (
                students.map((s: UserProps) => (
                  <option key={s.id} value={s.id}>
                    {s.first_name} {s.last_name} ({s.email})
                  </option>
                ))
              )}
            </select>
          </div>

          <Button type="submit" disabled={creating}>
            {creating ? "Creando..." : "Crear Material"}
          </Button>
        </form>
      </Card>
    </div>
  );
}