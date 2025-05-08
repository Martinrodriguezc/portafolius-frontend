import { useState } from "react"
import { Play, ExternalLink, Tag, Calendar, Clock } from 'lucide-react'
import Card from "../../common/Card/Card"

export interface ResourceVideo {
  id: number
  title: string
  description: string
  url: string
  thumbnail_url?: string
  created_at: string
  updated_at: string
  tags?: string[]
  duration?: string
}

interface VideosTabProps {
  videos: ResourceVideo[]
}

export function VideosTab({ videos }: VideosTabProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.tags && video.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <Play className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-[#333333] mb-2">No hay videos disponibles</h3>
        <p className="text-[#666666] max-w-md">
          Actualmente no hay videos disponibles en esta sección. Vuelve a consultar más tarde.
        </p>
      </div>
    )
  }

  return (
    <div>
      {searchTerm && (
        <div className="mb-6">
          <p className="text-[#666666]">
            <span className="font-medium text-[#333333]">{filteredVideos.length}</span>{" "}
            {filteredVideos.length === 1 ? "resultado encontrado" : "resultados encontrados"} para "
            <span className="text-[#4E81BD]">{searchTerm}</span>"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card
            key={video.id}
            className="rounded-[12px] p-0 overflow-hidden border border-slate-200 hover:shadow-md transition-all h-full flex flex-col"
          >
            <div className="relative group">
              <div className="aspect-video bg-slate-200 overflow-hidden">
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#4E81BD]/10 flex items-center justify-center">
                    <Play className="h-12 w-12 text-[#4E81BD]" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 text-[#4E81BD] p-3 rounded-full hover:bg-white transition-colors"
                >
                  <Play className="h-8 w-8" />
                </a>
              </div>
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {video.duration}
                </div>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-medium text-[#333333] mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-[#666666] mb-4 line-clamp-3">{video.description}</p>

              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                  {video.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-[#4E81BD]/10 text-[#4E81BD] px-2 py-1 rounded-full text-xs"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
                <div className="text-xs text-[#666666] flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(video.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-[#4E81BD]/10 text-[#4E81BD] transition-colors"
                  title="Ver video"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
