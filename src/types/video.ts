/*export interface Video {
    id: string;
    title: string;
    description: string;
    date: string;
    duration: string;
    tags: { id: number; text: string; author: "student" | "teacher" }[];
    comments: { id: number; text: string; author: string; date: string }[];
    original_filename?: string;
    mime_type?: string;
    upload_date?: string;
  }
*/
export interface Video {
  id: number;
  study_id: number;
  object_key: string;
  original_filename: string;
  mime_type: string;
  size_bytes: number;
  duration_seconds: number;
  upload_date: string;
  order_index: number;
}
