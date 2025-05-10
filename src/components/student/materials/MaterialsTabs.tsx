import TabsContainer from '../../common/Tabs/TabsContainer';
import TabsList      from '../../common/Tabs/TabsList';
import TabsButton    from '../../common/Tabs/TabsButton';
import TabsPanel     from '../../common/Tabs/TabsPanel';

import DocumentsTab   , { Document }      from './DocumentsTab';
import { VideosTab, ResourceVideo }      from './VideosTab';
import { LinksTab, Link as LinkType }     from './LinksTab';

interface MaterialsTabsProps {
  documents: Document[];
  videos:    ResourceVideo[];
  links:     LinkType[];
}

export default function MaterialsTabs({ documents, videos, links }: MaterialsTabsProps) {
  return (
    <TabsContainer defaultValue="documents">
      <TabsList className="mb-8 border-b border-slate-200 pb-1 overflow-x-auto">
        <TabsButton value="documents">Documentos</TabsButton>
        <TabsButton value="videos">Videos</TabsButton>
        <TabsButton value="links">Enlaces</TabsButton>
      </TabsList>

      <TabsPanel value="documents">
        <DocumentsTab documents={documents} />
      </TabsPanel>
      <TabsPanel value="videos">
        <VideosTab videos={videos} />
      </TabsPanel>
      <TabsPanel value="links">
        <LinksTab links={links} />
      </TabsPanel>
    </TabsContainer>
  );
}