import { useState } from "react";
import { FileText, Download, Calendar } from "lucide-react";
import Card from "../../common/Card/Card";
import { config } from "../../../config/config";

export interface Document {
  id: number;
  title: string;
  description: string;
  url: string;
  created_at: string;
  updated_at: string;
  file_type?: string;
  file_size?: string;
}

interface DocumentsTabProps {
  documents: Document[];
}

export default function DocumentsTab({ documents }: DocumentsTabProps) {
  const [searchTerm] = useState("");

  const filtered = documents.filter((doc) =>
    (doc.title + " " + doc.description)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <FileText className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-[#333333] mb-2">
          No hay documentos disponibles
        </h3>
        <p className="text-[#666666] max-w-md">Vuelve a consultar más tarde.</p>
      </div>
    );
  }

  const handleDownload = (doc: Document) => {
    window.location.href = `${config.SERVER_URL}/materials/download/${doc.id}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((doc) => (
        <Card
          key={doc.id}
          className="rounded-[12px] p-0 overflow-hidden border border-slate-200 hover:shadow-md transition-all h-full flex flex-col"
        >
          <div className="bg-[#4E81BD]/10 p-4 flex items-center justify-center">
            <FileText className="h-10 w-10 text-[#4E81BD]" />
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-medium text-[#333333] mb-2 line-clamp-2">
              {doc.title}
            </h3>
            <p className="text-sm text-[#666666] mb-4 line-clamp-3">
              {doc.description}
            </p>
            <div className="mt-auto">
              <div className="text-xs text-[#666666] mb-2">
                {doc.file_type && (
                  <span className="uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                    {doc.file_type}
                  </span>
                )}
                {doc.file_size && <span className="ml-2">{doc.file_size}</span>}
              </div>
              <button
                onClick={() => handleDownload(doc)}
                className="inline-flex items-center gap-2 text-[#4E81BD] hover:text-[#2c5f9f]"
                title="Descargar"
              >
                <Download className="h-4 w-4" /> Descargar
              </button>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-xs text-[#666666]">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(doc.created_at).toLocaleDateString("es-ES", {
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