import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { FileText, Download } from "lucide-react";
import { Material } from "../../../types/material";

interface Props { documents: Material[] }

export default function DocumentsTab({ documents }: Props) {
  return (
    <div className="space-y-4">
      {documents.map((doc) => {
        const fecha = new Date(doc.uploaded_at)
          .toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
        const size  = doc.size_bytes ? `${(doc.size_bytes / 1_000_000).toFixed(1)} MB` : "—";

        return (
          <Card key={doc.id} className="rounded-[16px]">
            <div className="flex items-start">
              <div className="bg-[#4E81BD]/10 p-3 rounded-lg mr-4">
                <FileText className="h-6 w-6 text-[#4E81BD]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] font-medium text-[#333]">{doc.title}</h3>
                <p className="text-[14px] text-[#A0A0A0] mt-1">{doc.description}</p>

                <div className="flex items-center justify-between mt-4 text-[13px] text-[#A0A0A0]">
                  <span className="mr-4">Fecha: {fecha}</span>
                  <span>Tamaño: {size}</span>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#4E81BD] border-[#4E81BD] hover:bg-[#4E81BD]/10"
                    asChild
                  >
                    <a href={doc.url} target="_blank" rel="noopener">
                      <Download className="mr-2 h-4 w-4" /> Descargar
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}