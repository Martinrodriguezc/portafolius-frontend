import { authService } from '../../hooks/auth/authServices';
import { useStudentMaterials } from '../../hooks/student/Materials/useStudentMaterials';
import MaterialsHeader       from '../../components/student/materials/MaterialsHeader';
import MaterialsAuthError    from '../../components/student/materials/MaterialsAuthError';
import MaterialsLoading      from '../../components/student/materials/MaterialsLoading';
import MaterialsError        from '../../components/student/materials/MaterialsError';
import MaterialsSummary      from '../../components/student/materials/MaterialsSummary';
import MaterialsSearchFilter from '../../components/student/materials/MaterialsSearchFilter';
import MaterialsTabs         from '../../components/student/materials/MaterialsTabs';
import { Material }          from '../../types/material';

export default function MaterialsPage() {
  const user = authService.getCurrentUser();
  const studentId = Number(user?.id ?? '');
  const { data: materials, isLoading, error } = useStudentMaterials(studentId);

  if (!studentId) {
    return <MaterialsAuthError />;
  }
  if (isLoading) {
    return <MaterialsLoading />;
  }
  if (error) {
    return <MaterialsError message={error.toString()} />;
  }

  const items: Material[] = materials!;

  const documents = items
    .filter((m): m is Material & { documents: NonNullable<Material['documents']> } =>
      m.type === 'document' && Array.isArray(m.documents)
    )
    .flatMap(m => m.documents);

  const videos = items
    .filter((m): m is Material & { videos: NonNullable<Material['videos']> } =>
      m.type === 'video' && Array.isArray(m.videos)
    )
    .flatMap(m => m.videos);

  const links = items
    .filter((m): m is Material & { links: NonNullable<Material['links']> } =>
      m.type === 'link' && Array.isArray(m.links)
    )
    .flatMap(m => m.links);

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <MaterialsHeader />
      <MaterialsSummary counts={{ documents, videos, links }} />
      <MaterialsSearchFilter />
      <MaterialsTabs documents={documents} videos={videos} links={links} />
    </div>
  );
}


