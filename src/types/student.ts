export interface Student {
  id: number;
  name: string;
  status: string;
  email: string;
  specialty: string;
  institution: string;
  year: string;
  studies: number;
  averageScore: number;
  lastActivity: string;
}

export interface StudentInfo {
  student: Student;
}
