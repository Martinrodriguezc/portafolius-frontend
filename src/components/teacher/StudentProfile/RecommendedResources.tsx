import React from "react";
import { Bookmark, FileText, BookOpen, ClipboardList, Share2 } from "lucide-react";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";

interface Resource {
  id: number;
  title: string;
  type: string;
}

export const RecommendedResources: React.FC<{ resources: Resource[] }> = ({
  resources,
}) => (
  <div className="bg-white rounded-[16px] shadow-sm border border-slate-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-[#333333] flex items-center gap-2">
        <Bookmark className="h-5 w-5 text-[#4E81BD]" />
        Recursos recomendados
      </h3>
      <Button variant="outline" size="sm" className="text-[#4E81BD] border-[#4E81BD]">
        Ver todos
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {resources.map((res) => (
        <Card key={res.id} className="p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            {res.type === "pdf" && (
              <div className="bg-red-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
            )}
            {res.type === "video" && (
              <div className="bg-purple-100 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
            )}
            {res.type === "protocol" && (
              <div className="bg-green-100 p-2 rounded-full">
                <ClipboardList className="h-5 w-5 text-green-600" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-[#333333] font-medium">{res.title}</p>
              <p className="text-xs text-[#666666] uppercase">{res.type}</p>
            </div>
            <Button variant="outline" size="sm" className="text-[#4E81BD] border-[#4E81BD] flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
