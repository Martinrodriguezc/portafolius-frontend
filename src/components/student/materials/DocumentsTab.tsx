import { useState } from "react"
import { FileText, Download, ExternalLink, Tag } from 'lucide-react'
import Card from "../../common/Card/Card"

export interface Document {
  id: number
  title: string
  description: string
  url: string
  thumbnail_url?: string
  created_at: string
  updated_at: string
  tags?: string[]
  file_type?: string
  file_size?: string
}

interface DocumentsTabProps {
  documents: Document[]
}

export default function DocumentsTab({ documents }: DocumentsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.tags && doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <FileText className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-[#333333] mb-2">No hay documentos disponibles</h3>
        <p className="text-[#666666] max-w-md">
          Actualmente no hay documentos disponibles en esta sección. Vuelve a consultar más tarde.
        </p>
      </div>
    )
  }

  return (
    <div>
      {searchTerm && (
        <div className="mb-6">
          <p className="text-[#666666]">
            <span className="font-medium text-[#333333]">{filteredDocuments.length}</span>{" "}
            {filteredDocuments.length === 1 ? "resultado encontrado" : "resultados encontrados"} para "
            <span className="text-[#4E81BD]">{searchTerm}</span>"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card
            key={doc.id}
            className="rounded-[12px] p-0 overflow-hidden border border-slate-200 hover:shadow-md transition-all h-full flex flex-col"
          >
            <div className="bg-[#4E81BD]/10 p-4 flex items-center justify-center">
              <FileText className="h-10 w-10 text-[#4E81BD]" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-medium text-[#333333] mb-2 line-clamp-2">{doc.title}</h3>
              <p className="text-sm text-[#666666] mb-4 line-clamp-3">{doc.description}</p>

              {doc.tags && doc.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                  {doc.tags.map((tag, index) => (
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
                <div className="text-xs text-[#666666]">
                  {doc.file_type && (
                    <span className="uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                      {doc.file_type}
                    </span>
                  )}
                  {doc.file_size && <span className="ml-2">{doc.file_size}</span>}
                </div>
                <div className="flex gap-2">
                  <a
                    href={doc.url}
                    download
                    className="p-2 rounded-full hover:bg-[#4E81BD]/10 text-[#4E81BD] transition-colors"
                    title="Descargar"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-[#4E81BD]/10 text-[#4E81BD] transition-colors"
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
    </div>
  )
}
