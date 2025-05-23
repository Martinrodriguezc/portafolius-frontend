import { Video, ExternalLink, Pencil, Trash2, User, Play } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Card from '../../common/Card/Card';
import { Material } from '../../../types/material';

interface VideosTabProps {
  videos: Material[];
  onEdit: (material: Material) => void;
  onDelete: (id: number) => void;
}

export default function VideosTab({ videos, onEdit, onDelete }: VideosTabProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <Video className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-[#333333] mb-2">No hay videos disponibles</h3>
        <p className="text-[#666666] max-w-md">
          No se encontraron videos. Puedes añadir un nuevo video utilizando el botón "Añadir Material".
        </p>
      </div>
    );
  }

  const getVideoThumbnail = (url: string) => {
    // Detectar si es un enlace de YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('v=')
        ? url.split('v=')[1].split('&')[0]
        : url.includes('youtu.be/')
        ? url.split('youtu.be/')[1].split('?')[0]
        : null;
      
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      }
    }
    
    // Otras plataformas pueden ser añadidas aquí
    
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => {
        const thumbnail = getVideoThumbnail(video.url);
        
        return (
          <Card
            key={video.id}
            className="rounded-[12px] p-0 overflow-hidden border border-slate-200 hover:shadow-md transition-all h-full flex flex-col"
          >
            <div className="bg-emerald-100 aspect-video relative flex items-center justify-center">
              {thumbnail ? (
                <div className="w-full h-full relative">
                  <img src={thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="bg-white/80 p-3 rounded-full">
                      <Play className="h-6 w-6 text-emerald-600 fill-emerald-600" />
                    </div>
                  </div>
                </div>
              ) : (
                <Video className="h-10 w-10 text-emerald-600" />
              )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-medium text-[#333333] mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-[#666666] mb-4 line-clamp-3">{video.description}</p>
              
              {video.student_id && (
                <div className="flex items-center gap-2 mb-3 text-sm text-[#666666]">
                  <User className="h-4 w-4" />
                  <span>Asignado a estudiante ID: {video.student_id}</span>
                </div>
              )}
              
              <div className="mt-auto">
                {video.uploaded_at && (
                  <div className="text-xs text-[#666666] mb-3">
                    <p>
                      Subido {formatDistanceToNow(new Date(video.uploaded_at), { 
                        addSuffix: true, 
                        locale: es 
                      })}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(video)}
                      className="p-2 rounded-md hover:bg-emerald-100 text-emerald-600 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(video.id)}
                      className="p-2 rounded-md hover:bg-red-100 text-red-500 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover:bg-emerald-100 text-emerald-600 transition-colors"
                    title="Ver video"
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