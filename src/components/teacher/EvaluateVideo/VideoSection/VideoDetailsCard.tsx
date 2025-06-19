import Card from '../../../common/Card/Card';
import { FileVideo, User, Calendar, ClipboardList, Video as VideoIcon } from 'lucide-react';
import type { Video } from '../../../../types/VideoTypes';
import type { StudyWithStatus } from '../../../../types/Study';

export default function VideoDetailsCard({
  meta,
  currentStudy,
}: {
  meta: Video;
  currentStudy?: StudyWithStatus;
}) {
  return (
    <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <FileVideo className="h-5 w-5 text-[#4E81BD]" />
          <h3 className="text-[16px] font-semibold text-[#333333]">Detalles del video</h3>
        </div>
      </div>
      <div className="p-6 grid md:grid-cols-2 gap-6">
        <DetailItem
          icon={<User className="h-5 w-5 text-[#4E81BD]" />}
          label="Estudiante"
          value={currentStudy
            ? `${currentStudy.first_name} ${currentStudy.last_name}`
            : 'No disponible'}
        />
        <DetailItem
          icon={<Calendar className="h-5 w-5 text-[#4E81BD]" />}
          label="Fecha de subida"
          value={new Date(meta.upload_date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        />
        <DetailItem
          icon={<ClipboardList className="h-5 w-5 text-[#4E81BD]" />}
          label="Estudio"
          value={currentStudy?.title ?? 'No disponible'}
        />
        <DetailItem
          icon={<VideoIcon className="h-5 w-5 text-[#4E81BD]" />}
          label="Archivo"
          value={meta.original_filename}
        />
      </div>
    </Card>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-[#4E81BD]/10 p-2 rounded-full">{icon}</div>
      <div>
        <h4 className="font-medium text-[#333333] mb-1">{label}</h4>
        <p className="text-[#666666]">{value}</p>
      </div>
    </div>
  );
}