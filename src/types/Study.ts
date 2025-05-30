export interface RawStudy {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  has_evaluation: boolean;
  score?: number | null;
}

export interface Study {
  id: number;
  title: string;
  description: string;
  status: string;      
  created_at: string;
  has_evaluation: boolean;  
  score: number | null;      
}

export interface StudyWithStatus {
  study_id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  has_evaluation: boolean;
  first_name: string;
  last_name: string;
  email: string;
  score: number;
}

export interface StudyWithStudent {
  student_name: string;
  study: Study;
}