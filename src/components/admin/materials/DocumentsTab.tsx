import { FileText, ExternalLink, Pencil, Trash2, User, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Card from '../../common/Card/Card';
import { Material } from '../../../types/material';

interface DocumentsTabProps {
  documents: Material[];
  onEdit: (material: Material) => void;
  onDelete: (id: number) => void;
}

const normalizeTitle = (title: string): string => {
  return title.replace(/\s*\(\d+\/\d+\)\s*$/, '').trim();
};

const groupSimilarMaterials = (materials: Material[]) => {
  const groups = new Map<string, Material[]>();
  
  materials.forEach(material => {
    const key = `${normalizeTitle(material.title)}_${material.description}_${material.url}`;
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(material);
  });
  
  return Array.from(groups.values()).map(group => {
    const representative = group[0];
    const allStudentIds = group
      .map(m => m.student_id)
      .filter(id => id !== null) as number[];
    
    return {
      ...representative,
      title: normalizeTitle(representative.title),
      _groupedMaterials: group,
      _allStudentIds: allStudentIds,
      _isGroup: group.length > 1
    };
  });
};

export default function DocumentsTab({ documents, onEdit, onDelete }: DocumentsTabProps) {
  const groupedDocuments = groupSimilarMaterials(documents);

  if (groupedDocuments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <FileText className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-[#333333] mb-2">No hay documentos disponibles</h3>
        <p className="text-[#666666] max-w-md">
          No se encontraron documentos. Puedes añadir un nuevo documento utilizando el botón "Añadir Material".
        </p>
      </div>
    );
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Tamaño desconocido';
    
    const kb = bytes / 1024;
    if (kb < 1024) return `${Math.round(kb * 10) / 10} KB`;
    
    const mb = kb / 1024;
    if (mb < 1024) return `${Math.round(mb * 10) / 10} MB`;
    
    const gb = mb / 1024;
    return `${Math.round(gb * 10) / 10} GB`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groupedDocuments.map((doc) => (
        <Card
          key={`group-${doc.id}`}
          className="rounded-[12px] p-0 overflow-hidden border border-slate-200 hover:shadow-md transition-all h-full flex flex-col"
        >
          <div className="bg-[#4E81BD]/10 p-4 flex items-center justify-center">
            <FileText className="h-10 w-10 text-[#4E81BD]" />
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-medium text-[#333333] mb-2 line-clamp-2">{doc.title}</h3>
            <p className="text-sm text-[#666666] mb-4 line-clamp-3">{doc.description}</p>
            
            <div className="flex items-center gap-2 mb-3 text-sm text-[#666666]">
              {(doc as any)._allStudentIds.length === 0 ? (
                <>
                  <Users className="h-4 w-4" />
                  <span className="text-blue-600 font-medium">Material Global</span>
                </>
              ) : (doc as any)._isGroup ? (
                <>
                  <Users className="h-4 w-4" />
                  <span>Asignado a {(doc as any)._allStudentIds.length} estudiantes</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  <span>Asignado a estudiante ID: {doc.student_id}</span>
                </>
              )}
            </div>
            
            <div className="mt-auto">
              <div className="text-xs text-[#666666] mb-3">
                {doc.uploaded_at && (
                  <p>
                    Subido {formatDistanceToNow(new Date(doc.uploaded_at), { 
                      addSuffix: true, 
                      locale: es 
                    })}
                  </p>
                )}
                {doc.mime_type && <p>Tipo: {doc.mime_type}</p>}
                {doc.size_bytes && <p>Tamaño: {formatFileSize(doc.size_bytes)}</p>}
                {(doc as any)._isGroup && (
                  <p className="text-blue-600">📋 {(doc as any)._groupedMaterials.length} copias</p>
                )}
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(doc)}
                    className="p-2 rounded-md hover:bg-[#4E81BD]/10 text-[#4E81BD] transition-colors"
                    title={`Editar${(doc as any)._isGroup ? ' (gestionar todas las copias)' : ''}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="p-2 rounded-md hover:bg-red-100 text-red-500 transition-colors"
                    title={`Eliminar${(doc as any)._isGroup ? ' (eliminará todas las copias)' : ''}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md hover:bg-[#4E81BD]/10 text-[#4E81BD] transition-colors"
                  title="Abrir"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 