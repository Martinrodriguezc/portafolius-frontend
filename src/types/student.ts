export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  studies: number;
  average_score: number;
  last_activity: string;
}

export interface TeacherStudent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}