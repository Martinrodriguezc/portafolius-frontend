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
  status: string;
}

export interface TeacherVideo {
  id: number;
  study_id: number;
  original_filename: string;
  upload_date: string;
  duration_seconds: number;
  evaluated_at?: string;
  score?: number;
}

