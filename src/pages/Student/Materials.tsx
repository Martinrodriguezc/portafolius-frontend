import { materialsData } from "../../utils/materialsConstants";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import { FileText, Video, ExternalLink } from "lucide-react";
import { DocumentsTab } from "../../components/student/materials/DocumentsTab";
import { VideosTab } from "../../components/student/materials/VideosTab";
import { LinksTab } from "../../components/student/materials/LinksTab";

export default function MaterialsPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">
          Material de Estudio
        </h1>
        <p className="text-[#A0A0A0]">
          Recursos educativos para mejorar tus habilidades en ultrasonido
        </p>
      </header>

      <TabsContainer defaultValue="documents">
        <TabsList className="mb-6">
          <TabsButton value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documentos
          </TabsButton>
          <TabsButton value="videos">
            <Video className="mr-2 h-4 w-4" />
            Videos
          </TabsButton>
          <TabsButton value="links">
            <ExternalLink className="mr-2 h-4 w-4" />
            Enlaces
          </TabsButton>
        </TabsList>

        <TabsPanel value="documents" className="space-y-4">
          <DocumentsTab documents={materialsData.documents} />
        </TabsPanel>
        <TabsPanel value="videos" className="space-y-4">
          <VideosTab videos={materialsData.videos} />
        </TabsPanel>
        <TabsPanel value="links" className="space-y-4">
          <LinksTab links={materialsData.links} />
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}