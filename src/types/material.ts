import { Document as DocType }       from '../components/student/materials/DocumentsTab';
import { ResourceVideo }             from '../components/student/materials/VideosTab';
import { Link as LinkType }          from '../components/student/materials/LinksTab';

export type MaterialType = "document" | "video" | "link";

export interface Material {
  id: number;
  student_id: number | null;
  type: MaterialType;
  title: string;
  description: string;
  url: string;
  size_bytes?: number;
  mime_type?: string;
  uploaded_at: string;

  documents: DocType[]   | null;
  videos:    ResourceVideo[] | null;
  links:     LinkType[]  | null;
}
