import { BookOpenCheck, FileText, Video, ExternalLink } from 'lucide-react';
import { Document } from './DocumentsTab';
import { ResourceVideo } from './VideosTab';
import { Link as LinkType } from './LinksTab';

interface Counts {
  documents: Document[];
  videos: ResourceVideo[];
  links: LinkType[];
}

export default function MaterialsSummary({ counts }: { counts: Counts }) {
  return (
    <div className="mb-8 bg-gradient-to-r from-[#4E81BD]/5 to-[#4E81BD]/10 rounded-[16px] shadow-sm border border-[#4E81BD]/20 p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#4E81BD]/20 p-3 rounded-full">
            <BookOpenCheck className="h-8 w-8 text-[#4E81BD]" />
          </div>
          <div>
            <h2 className="text-[18px] font-semibold text-[#333333]">Biblioteca de recursos</h2>
            <p className="text-[#666666]">
              Tienes acceso a{' '}
              <span className="font-medium text-[#4E81BD]">
                {counts.documents.length} documentos · {counts.videos.length} videos · {counts.links.length} enlaces
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
          {[
            { label: 'Documentos', Icon: FileText, count: counts.documents.length },
            { label: 'Videos',    Icon: Video,    count: counts.videos.length    },
            { label: 'Enlaces',   Icon: ExternalLink, count: counts.links.length },
          ].map(({ label, Icon, count }) => (
            <div key={label} className="bg-white p-3 rounded-lg shadow-sm border text-center">
              <Icon className="h-5 w-5 text-[#4E81BD] mx-auto mb-1" />
              <p className="text-xs text-[#666666]">{label}</p>
              <p className="text-sm font-medium text-[#333333]">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
