import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Material, MaterialType } from '../../../types/material';

interface MaterialFormProps {
  material?: Material;
  onSubmit: (materialData: Partial<Material>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function MaterialForm({
  material,
  onSubmit,
  onCancel,
  isSubmitting
}: MaterialFormProps) {
  const isEditing = !!material;
  
  const [formData, setFormData] = useState<Partial<Material>>({
    title: '',
    description: '',
    url: '',
    type: 'document' as MaterialType,
    student_id: null,
    size_bytes: undefined,
    mime_type: '',
  });

  useEffect(() => {
    if (material) {
      setFormData({
        title: material.title,
        description: material.description,
        url: material.url,
        type: material.type,
        student_id: material.student_id,
        size_bytes: material.size_bytes,
        mime_type: material.mime_type,
      });
    }
  }, [material]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'student_id') {
      const studentId = value === '' ? null : parseInt(value);
      setFormData(prev => ({ ...prev, [name]: studentId }));
    } else if (name === 'size_bytes') {
      const sizeBytes = value === '' ? undefined : parseInt(value);
      setFormData(prev => ({ ...prev, [name]: sizeBytes }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#333333]">
            {isEditing ? 'Editar Material' : 'Añadir Nuevo Material'}
          </h2>
          <button onClick={onCancel} className="text-[#666666] hover:text-[#333333]">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-[#333333]">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-[#333333]">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="url" className="block text-sm font-medium text-[#333333]">
              URL *
            </label>
            <input
              type="url"
              id="url"
              name="url"
              required
              value={formData.url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-[#333333]">
              Tipo *
            </label>
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
            >
              <option value="document">Documento</option>
              <option value="video">Video</option>
              <option value="link">Enlace</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="student_id" className="block text-sm font-medium text-[#333333]">
              ID de Estudiante (Opcional)
            </label>
            <input
              type="number"
              id="student_id"
              name="student_id"
              value={formData.student_id === null ? '' : formData.student_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
              min="1"
            />
            <p className="text-xs text-[#666666]">
              Deja en blanco si el material es para todos los estudiantes
            </p>
          </div>
          
          {formData.type === 'document' && (
            <>
              <div className="space-y-2">
                <label htmlFor="mime_type" className="block text-sm font-medium text-[#333333]">
                  Tipo MIME (Opcional)
                </label>
                <input
                  type="text"
                  id="mime_type"
                  name="mime_type"
                  value={formData.mime_type || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                  placeholder="ej. application/pdf"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="size_bytes" className="block text-sm font-medium text-[#333333]">
                  Tamaño en bytes (Opcional)
                </label>
                <input
                  type="number"
                  id="size_bytes"
                  name="size_bytes"
                  value={formData.size_bytes || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                  min="0"
                />
              </div>
            </>
          )}
          
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#4E81BD] text-white rounded-md hover:bg-[#3A6491] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 