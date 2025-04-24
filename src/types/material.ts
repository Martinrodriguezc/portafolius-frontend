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
}
