import TabsContainer from '../../common/Tabs/TabsContainer';
import TabsList from '../../common/Tabs/TabsList';
import TabsButton from '../../common/Tabs/TabsButton';
import TabsPanel from '../../common/Tabs/TabsPanel';

import { Material } from '../../../types/material';
import DocumentsTab from './DocumentsTab';
import VideosTab from './VideosTab';
import LinksTab from './LinksTab';

interface MaterialsTabsProps {
  materials: Material[];
  onEdit: (material: Material) => void;
  onDelete: (id: number) => void;
}

export default function MaterialsTabs({ materials, onEdit, onDelete }: MaterialsTabsProps) {
  const documents = materials.filter(material => material.type === 'document');
  const videos = materials.filter(material => material.type === 'video');
  const links = materials.filter(material => material.type === 'link');

  return (
    <TabsContainer defaultValue="documents">
      <TabsList className="mb-8 border-b border-slate-200 pb-1 overflow-x-auto">
        <TabsButton value="documents">Documentos ({documents.length})</TabsButton>
        <TabsButton value="videos">Videos ({videos.length})</TabsButton>
        <TabsButton value="links">Enlaces ({links.length})</TabsButton>
      </TabsList>

      <TabsPanel value="documents">
        <DocumentsTab documents={documents} onEdit={onEdit} onDelete={onDelete} />
      </TabsPanel>
      <TabsPanel value="videos">
        <VideosTab videos={videos} onEdit={onEdit} onDelete={onDelete} />
      </TabsPanel>
      <TabsPanel value="links">
        <LinksTab links={links} onEdit={onEdit} onDelete={onDelete} />
      </TabsPanel>
    </TabsContainer>
  );
} 