import { useState } from "react";
import { Play, Download, Calendar } from "lucide-react";
import Card from "../../common/Card/Card";
import { config } from "../../../config/config";

export interface ResourceVideo {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  duration?: string;
}

interface VideosTabProps {
  videos: ResourceVideo[];
}

export default function VideosTab({ videos }: VideosTabProps) {
  const [searchTerm] = useState("");

  const filtered = videos.filter((v) =>
    (v.title + " " + v.description).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <Play className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-[#333333] mb-2">
          No hay videos disponibles
        </h3>
        <p className="text-[#666666] max-w-md">
          Actualmente no hay videos disponibles en esta sección.
        </p>
      </div>
    );
  }

  const handleDownload = (video: ResourceVideo) => {
    window.location.href = `${config.SERVER_URL}/materials/download/${video.id}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((video) => (
        <Card
          key={video.id}
          className="rounded-[12px] p-0 overflow-hidden border border-slate-200 hover:shadow-md transition-all h-full flex flex-col"
        >
          <div className="bg-[#4E81BD]/10 p-4 flex items-center justify-center">
            <Play className="h-10 w-10 text-[#4E81BD]" />
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-medium text-[#333333] mb-2 line-clamp-2">
              {video.title}
            </h3>
            <p className="text-sm text-[#666666] mb-4 line-clamp-3">
              {video.description}
            </p>
            <div className="mt-auto">
              <button
                onClick={() => handleDownload(video)}
                className="inline-flex items-center gap-2 text-[#4E81BD] hover:text-[#2c5f9f]"
                title="Descargar video"
              >
                <Download className="h-4 w-4" /> Descargar
              </button>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-xs text-[#666666]">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(video.created_at).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}