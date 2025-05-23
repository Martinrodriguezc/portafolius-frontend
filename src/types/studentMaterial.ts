export type MaterialType = "document" | "video" | "link";

export interface StudentMaterial {
  id: number;
  student_id: number | null;
  type: "document" | "video" | "link";
  title: string;
  description: string;
  url: string;
  size_bytes?: number;
  mime_type?: string;
  upload_date: string;      
  created_by: number;
}