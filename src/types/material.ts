import { ResourceVideo } from "../components/student/materials/VideosTab";
import { LinksTabProps } from "./Props/Tabs/LinksTabProps";

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
  documents: Document[] | null;
  videos: ResourceVideo[]| null;
  links: LinksTabProps[] | null;
}
