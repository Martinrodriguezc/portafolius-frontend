import { useStudentMaterials } from "../../hooks/student/useStudentMaterials";
import { authService } from "../../hooks/auth/authServices";
import { groupBy } from "lodash";

import DocumentsTab from "../../components/student/materials/DocumentsTab";
import { VideosTab } from "../../components/student/materials/VideosTab";
import { LinksTab } from "../../components/student/materials/LinksTab";

import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import { FileText, Video, ExternalLink } from "lucide-react";

export default function MaterialsPage() {
  const user = authService.getCurrentUser();
  const studentId = user?.id;
  const { data, isLoading } = useStudentMaterials(studentId);

  if (!studentId) return <p className="p-8 text-red-600">Sesión expirada.</p>;
  if (isLoading) return <p className="p-8">Cargando materiales…</p>;
  if (!data?.length) return <p className="p-8">No hay materiales asignados.</p>;

  const grouped = groupBy(data, "type");

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333]">
          Material de Estudio
        </h1>
        <p className="text-[#A0A0A0]">
          Recursos educativos para mejorar tus habilidades en ultrasonido
        </p>
      </header>

      <TabsContainer defaultValue="documents">
        <TabsList className="mb-6">
          <TabsButton value="documents">
            <FileText className="mr-2 h-4 w-4" /> Documentos
          </TabsButton>
          <TabsButton value="videos">
            <Video className="mr-2 h-4 w-4" /> Videos
          </TabsButton>
          <TabsButton value="links">
            <ExternalLink className="mr-2 h-4 w-4" /> Enlaces
          </TabsButton>
        </TabsList>

        <TabsPanel value="documents">
          <DocumentsTab documents={grouped.document ?? []} />
        </TabsPanel>
        <TabsPanel value="videos">
          <VideosTab videos={grouped.video ?? []} />
        </TabsPanel>
        <TabsPanel value="links">
          <LinksTab links={grouped.link ?? []} />
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}
