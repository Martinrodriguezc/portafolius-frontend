import React from "react";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { FileText, Download } from "lucide-react";

interface DocumentItem {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  size: string;
}

interface DocumentsTabProps {
  documents: DocumentItem[];
}

export function DocumentsTab({ documents }: DocumentsTabProps) {
  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="rounded-[16px]">
          <div className="flex items-start">
            <div className="bg-[#4E81BD]/10 p-3 rounded-lg mr-4">
              <FileText className="h-6 w-6 text-[#4E81BD]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-medium text-[#333333]">{doc.title}</h3>
              <p className="text-[14px] text-[#A0A0A0] mt-1">{doc.description}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-[13px] text-[#A0A0A0]">
                  <span className="mr-4">Fecha: {doc.date}</span>
                  <span>Tamaño: {doc.size}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#4E81BD] border-[#4E81BD] hover:bg-[#4E81BD]/10"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}