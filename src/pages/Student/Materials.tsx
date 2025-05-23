// src/pages/Materials.tsx
import { authService } from "../../hooks/auth/authServices";
import { useStudentMaterials } from "../../hooks/student/Materials/useStudentMaterials";
import MaterialsHeader from "../../components/student/materials/MaterialsHeader";
import MaterialsAuthError from "../../components/student/materials/MaterialsAuthError";
import MaterialsLoading from "../../components/student/materials/MaterialsLoading";
import MaterialsError from "../../components/student/materials/MaterialsError";
import MaterialsSummary from "../../components/student/materials/MaterialsSummary";
import MaterialsSearchFilter from "../../components/student/materials/MaterialsSearchFilter";
import MaterialsTabs from "../../components/student/materials/MaterialsTabs";

import type { StudentMaterial } from "../../types/studentMaterial";
import type { Document } from "../../components/student/materials/DocumentsTab";
import type { ResourceVideo } from "../../components/student/materials/VideosTab";
import type { Link as LinkType } from "../../components/student/materials/LinksTab";

export default function MaterialsPage() {
  const user = authService.getCurrentUser();
  const studentId = Number(user?.id ?? "");
  const { data: materials, isLoading, error } = useStudentMaterials(studentId);

  if (!studentId) return <MaterialsAuthError />;
  if (isLoading) return <MaterialsLoading />;
  if (error) return <MaterialsError message={error.message} />;

  const docs: Document[] = [];
  const vids: ResourceVideo[] = [];
  const links: LinkType[] = [];

  materials!.forEach((m: StudentMaterial) => {
    switch (m.type) {
      case "document":
        docs.push({
          id:          m.id,
          title:       m.title,
          description: m.description,
          url:         m.url,           // <-- aquí
          created_at:  m.upload_date,
          updated_at:  m.upload_date,
          file_type:   m.mime_type ?? undefined,
          file_size:   m.size_bytes
                        ? `${(m.size_bytes / 1024 ** 2).toFixed(1)} MB`
                        : undefined,
        });
        break;

      case "video":
        vids.push({
          id: m.id,
          title: m.title,
          description: m.description,
          url: m.url,               // para vídeos/enlaces seguimos usando la URL tal cual
          thumbnail_url: undefined,
          created_at: m.upload_date,
          updated_at: m.upload_date,
          tags: [],
          duration: undefined,
        });
        break;

      case "link":
        links.push({
          id: m.id,
          title: m.title,
          description: m.description,
          url: m.url,
          thumbnail_url: undefined,
          created_at: m.upload_date,
          updated_at: m.upload_date,
          tags: [],
          domain: undefined,
        });
        break;
    }
  });

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
      <MaterialsHeader />
      <MaterialsSummary counts={{ documents: docs, videos: vids, links }} />
      <MaterialsSearchFilter />
      <MaterialsTabs documents={docs} videos={vids} links={links} />
    </div>
  );
}