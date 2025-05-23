import { Link as LinkIcon, ExternalLink, Pencil, Trash2, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Card from '../../common/Card/Card';
import { Material } from '../../../types/material';

interface LinksTabProps {
  links: Material[];
  onEdit: (material: Material) => void;
  onDelete: (id: number) => void;
}

export default function LinksTab({ links, onEdit, onDelete }: LinksTabProps) {
  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <LinkIcon className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-[#333333] mb-2">No hay enlaces disponibles</h3>
        <p className="text-[#666666] max-w-md">
          No se encontraron enlaces. Puedes añadir un nuevo enlace utilizando el botón "Añadir Material".
        </p>
      </div>
    );
  }

  const getLinkFavicon = (url: string) => {
    try {
      const urlObj = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return null;
    }
  };

  const getLinkDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return 'enlace externo';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {links.map((link) => {
        const favicon = getLinkFavicon(link.url);
        const domain = getLinkDomain(link.url);
        
        return (
          <Card
            key={link.id}
            className="rounded-[12px] p-0 overflow-hidden border border-slate-200 hover:shadow-md transition-all h-full flex flex-col"
          >
            <div className="bg-purple-100 p-4 flex items-center justify-center">
              {favicon ? (
                <img 
                  src={favicon} 
                  alt={domain} 
                  className="h-10 w-10"
                  onError={(e) => {
                    // Si hay error al cargar el favicon, mostrar el icono predeterminado
                    e.currentTarget.src = '';
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.default-icon')?.classList.remove('hidden');
                  }}
                />
              ) : (
                <LinkIcon className="h-10 w-10 text-purple-600 default-icon" />
              )}
              <LinkIcon className="h-10 w-10 text-purple-600 default-icon hidden" />
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-medium text-[#333333] mb-2 line-clamp-2">{link.title}</h3>
              <p className="text-sm text-[#666666] mb-2 line-clamp-3">{link.description}</p>
              
              <div className="text-xs text-purple-600 mb-4 flex items-center gap-1">
                <LinkIcon className="h-3 w-3" />
                <span>{domain}</span>
              </div>
              
              {link.student_id && (
                <div className="flex items-center gap-2 mb-3 text-sm text-[#666666]">
                  <User className="h-4 w-4" />
                  <span>Asignado a estudiante ID: {link.student_id}</span>
                </div>
              )}
              
              <div className="mt-auto">
                {link.uploaded_at && (
                  <div className="text-xs text-[#666666] mb-3">
                    <p>
                      Subido {formatDistanceToNow(new Date(link.uploaded_at), { 
                        addSuffix: true, 
                        locale: es 
                      })}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(link)}
                      className="p-2 rounded-md hover:bg-purple-100 text-purple-600 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(link.id)}
                      className="p-2 rounded-md hover:bg-red-100 text-red-500 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover:bg-purple-100 text-purple-600 transition-colors"
                    title="Abrir enlace"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
} 