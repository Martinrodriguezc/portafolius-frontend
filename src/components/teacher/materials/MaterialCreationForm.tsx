import { useState, useEffect } from "react";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { Label } from "../../common/Label/Label";
import MaterialUploadSection from "./MaterialUploadSection";
import StudentSelectionList from "./StudentSelectionList";
import { useCreateMaterial } from "../../../hooks/teacher/teacher/Materials/useCreateMaterial";
import { useUpdateMaterial } from "../../../hooks/admin/Materials/useAdminMaterials";
import { Material, GroupedMaterial, MaterialType } from "../../../types/material";

type EditableMaterial = Material | GroupedMaterial;

const isGroupedMaterial = (material: EditableMaterial): material is GroupedMaterial => {
  return '_allStudentIds' in material;
};

interface UpdateMaterialData {
  title: string;
  description: string;
  type: MaterialType;
  url?: string;
  student_id?: number | null;
  student_ids?: number[];
}

interface MaterialCreationFormProps {
  onSuccess: () => void;
  editingMaterial?: EditableMaterial | null;
}

export default function MaterialCreationForm({
  onSuccess,
  editingMaterial = null,
}: MaterialCreationFormProps) {
  const isEditing = Boolean(editingMaterial);
  
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

  const updateMutation = useUpdateMaterial();
  
  const [formError, setFormError] = useState<string | null>(null);
  const [touchedSubmit, setTouchedSubmit] = useState(false);

  useEffect(() => {
    if (editingMaterial && isEditing) {
      handleChange("title", editingMaterial.title);
      handleChange("description", editingMaterial.description || "");
      handleChange("type", editingMaterial.type);
      
      if (isGroupedMaterial(editingMaterial)) {
        handleChange("studentIds", editingMaterial._allStudentIds);
      } else if (editingMaterial.student_id) {
        handleChange("studentIds", [editingMaterial.student_id]);
      } else {
        handleChange("studentIds", []);
      }
      
      if (editingMaterial.type === "link" && editingMaterial.url) {
        setSelectedLinks([editingMaterial.url]);
      }
    }
  }, [editingMaterial, isEditing]);

  useEffect(() => {
    if (success) {
      onSuccess();
      setFormError(null);
      setTouchedSubmit(false);
    }
  }, [success, onSuccess]);

  const isFormValid =
    material.title.trim() !== "" &&
    (isEditing || material.studentIds.length > 0) &&
    (material.type === "link"
      ? selectedLinks.length > 0
      : isEditing || selectedFiles.length > 0);

  const handleUpdate = async () => {
    if (!editingMaterial) return;
    
    try {
      const updateData: UpdateMaterialData = {
        title: material.title,
        description: material.description,
        type: material.type,
      };

      if (material.type === "link" && selectedLinks.length > 0) {
        updateData.url = selectedLinks[0];
      }

      if (material.studentIds.length === 0) {
        updateData.student_id = null;
      } else {
        updateData.student_ids = material.studentIds;
      }

      await updateMutation.mutateAsync({ 
        id: editingMaterial.id, 
        material: updateData 
      });
      
      onSuccess();
      setFormError(null);
      setTouchedSubmit(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Error actualizando material");
    }
  };

  const onCreateClick = () => {
    setTouchedSubmit(true);
    if (!isFormValid) {
      setFormError("Formulario incompleto");
      return;
    }
    setFormError(null);
    
    if (isEditing) {
      handleUpdate();
    } else {
      handleSubmit();
    }
  };

  const currentError = isEditing ? 
    (updateMutation.error?.message || null) : 
    createError;
  
  const isLoading = isEditing ? updateMutation.isPending : creating;

  const getButtonText = () => {
    if (isLoading) {
      return isEditing ? "Actualizando…" : "Creando…";
    }
    
    if (isEditing) {
      return material.studentIds.length === 0 ? "Hacer Global" : "Asignar Material";
    }
    
    return "Crear Material(es)";
  };

  return (
    <Card className="bg-white p-6 rounded-[16px] shadow-sm border border-slate-200">
      {currentError && <p className="text-red-500 mb-4">{currentError}</p>}
      {touchedSubmit && formError && (
        <p className="text-red-500 mb-4">{formError}</p>
      )}
      {success && !isEditing && (
        <p className="text-green-600 mb-4">Material creado exitosamente.</p>
      )}
      {updateMutation.isSuccess && isEditing && (
        <p className="text-green-600 mb-4">
          {material.studentIds.length === 0 
            ? "Material convertido a global exitosamente." 
            : `Material asignado a ${material.studentIds.length} estudiante${material.studentIds.length !== 1 ? 's' : ''} exitosamente.`
          }
        </p>
      )}

      <div className="space-y-6 max-w-4xl mx-auto">
        {isEditing && editingMaterial && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-medium text-slate-900 mb-2">Material Actual</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-700">Título:</span>
                <p className="text-slate-600">{editingMaterial.title}</p>
              </div>
              <div>
                <span className="font-medium text-slate-700">Tipo:</span>
                <p className="text-slate-600 capitalize">{editingMaterial.type}</p>
              </div>
              <div>
                <span className="font-medium text-slate-700">Asignación:</span>
                <p className="text-slate-600">
                  {isGroupedMaterial(editingMaterial) ? (
                    editingMaterial._allStudentIds.length === 0 ? 
                      'Material global' : 
                      `Asignado a ${editingMaterial._allStudentIds.length} estudiantes`
                  ) : (
                    editingMaterial.student_id ? 
                      `Estudiante ID: ${editingMaterial.student_id}` : 
                      'Material global'
                  )}
                </p>
              </div>
              <div>
                <span className="font-medium text-slate-700">ID base:</span>
                <p className="text-slate-600">{editingMaterial.id}</p>
              </div>
              {isGroupedMaterial(editingMaterial) && editingMaterial._isGroup && (
                <div className="md:col-span-2">
                  <span className="font-medium text-slate-700">Copias:</span>
                  <p className="text-slate-600">
                    📋 {editingMaterial._groupedMaterials.length} copias del material
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
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
            disabled={isEditing} // No permitir cambiar el tipo al editar
          >
            <option value="document">Documento</option>
            <option value="video">Video</option>
            <option value="link">Enlace</option>
          </select>
          {isEditing && (
            <p className="text-sm text-gray-500 mt-1">
              No se puede cambiar el tipo al editar un material
            </p>
          )}
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
            {isEditing && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Material actual:</strong> {editingMaterial?.title}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Al editar un archivo/video, solo se actualizarán el título y descripción. 
                  Para cambiar el archivo, debes eliminar este material y crear uno nuevo.
                </p>
              </div>
            )}
            {!isEditing && (
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
            )}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Asignación de Material</Label>
            {isEditing && editingMaterial && (
              <span className="text-sm text-gray-500">
                {isGroupedMaterial(editingMaterial) ? (
                  editingMaterial._allStudentIds.length === 0 ? 
                    'Material global' : 
                    `Asignado a ${editingMaterial._allStudentIds.length} estudiantes`
                ) : (
                  editingMaterial.student_id ? 
                    `Estudiante ID: ${editingMaterial.student_id}` : 
                    'Material global'
                )}
              </span>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Modo Edición:</strong> {editingMaterial && isGroupedMaterial(editingMaterial) && editingMaterial._isGroup ? 
                    'Gestiona todas las copias del material. Selecciona los estudiantes que deben tener el material.' :
                    'Selecciona los estudiantes que quieres que tengan el material, o déjalo global.'
                  }
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <Label>Seleccionar estudiantes:</Label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleChange("studentIds", [])}
                      className="text-xs bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md"
                    >
                      Material Global
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const allIds = students.map((u) =>
                          typeof u.id === "string" ? parseInt(u.id, 10) : u.id
                        );
                        handleChange("studentIds", allIds);
                      }}
                      className="text-xs bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-2 py-1 rounded-md"
                    >
                      Seleccionar todos
                    </button>
                  </div>
                </div>
                
                {loadingStudents ? (
                  <p className="py-2 text-sm text-gray-500">Cargando estudiantes…</p>
                ) : studentsError ? (
                  <p className="text-red-500 text-sm">{studentsError}</p>
                ) : (
                  <div className="max-h-48 overflow-y-auto border rounded p-2 bg-white">
                    {students.map((student) => {
                      const studentId = typeof student.id === "string" ? parseInt(student.id, 10) : student.id;
                      const isSelected = material.studentIds.includes(studentId);
                      
                      const hadMaterialBefore = editingMaterial && 
                        isGroupedMaterial(editingMaterial) && 
                        editingMaterial._allStudentIds?.includes(studentId);

                      return (
                        <label
                          key={student.id}
                          className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleStudent(studentId)}
                            className="h-4 w-4 text-[#4E81BD] border-gray-300 rounded"
                          />
                          <span className={`text-sm ${isSelected ? "font-medium text-[#4E81BD]" : ""}`}>
                            {student.first_name} {student.last_name}
                          </span>
                          <span className="text-xs text-gray-500">({student.email})</span>
                          {hadMaterialBefore && !isSelected && (
                            <span className="text-xs text-orange-500 ml-2">⚠️ Tenía el material</span>
                          )}
                          {hadMaterialBefore && isSelected && (
                            <span className="text-xs text-green-500 ml-2">✓ Mantiene el material</span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}
                
                <div className="text-sm text-gray-600 mt-2">
                  {material.studentIds.length === 0 ? (
                    <p className="text-blue-600">📋 Material global - disponible para todos los estudiantes</p>
                  ) : (
                    <p className="text-green-600">
                      📋 Se asignará a {material.studentIds.length} estudiante{material.studentIds.length !== 1 ? 's' : ''}
                    </p>
                  )}
                  {editingMaterial && isGroupedMaterial(editingMaterial) && (
                    <p className="text-sm text-gray-500 mt-1">
                      Anteriormente: {editingMaterial._allStudentIds.length === 0 ? 
                        'Material global' : 
                        `${editingMaterial._allStudentIds.length} estudiantes`
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">
                  <strong>Modo Creación:</strong> Se crearán copias del material para cada estudiante seleccionado.
                </p>
              </div>
              
              <StudentSelectionList
                students={students}
                selectedStudentIds={material.studentIds}
                isLoading={loadingStudents}
                error={studentsError}
                onToggleStudent={toggleStudent}
                onSelectAll={selectAllStudents}
                onClearAll={clearAllStudents}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-6">
          <Button
            onClick={onCreateClick}
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-[#4E81BD] hover:bg-[#3B6CA5] text-white font-semibold text-sm border-2 border-[#4E81BD] hover:border-[#3B6CA5] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#4E81BD]/20 min-w-[160px]"
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
    </Card>
  );
}