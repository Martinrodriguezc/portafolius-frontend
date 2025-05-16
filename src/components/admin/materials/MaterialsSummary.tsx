import { FileText, Video, Link as LinkIcon } from 'lucide-react';
import { Material } from '../../../types/material';

interface MaterialsSummaryProps {
  materials: Material[];
}

export default function MaterialsSummary({ materials }: MaterialsSummaryProps) {
  const totalDocuments = materials.filter(m => m.type === 'document').length;
  const totalVideos = materials.filter(m => m.type === 'video').length;
  const totalLinks = materials.filter(m => m.type === 'link').length;

  const summaryItems = [
    {
      title: 'Documentos',
      count: totalDocuments,
      icon: <FileText className="h-6 w-6 text-[#4E81BD]" />,
      bgColor: 'bg-[#4E81BD]/10',
    },
    {
      title: 'Videos',
      count: totalVideos,
      icon: <Video className="h-6 w-6 text-emerald-600" />,
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Enlaces',
      count: totalLinks,
      icon: <LinkIcon className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {summaryItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center p-5 rounded-lg border border-slate-200 gap-4"
        >
          <div className={`${item.bgColor} p-3 rounded-full`}>{item.icon}</div>
          <div>
            <p className="text-[#666666] text-sm">{item.title}</p>
            <p className="text-[#333333] text-xl font-semibold">{item.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 