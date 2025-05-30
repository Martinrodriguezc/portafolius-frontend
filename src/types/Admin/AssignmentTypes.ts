export interface Assignment {
  id: string;
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
  student: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
  assignedAt: string;
}

export interface AssignTeacherResponse {
  success: boolean;
  error?: string;
  data?: {
    teacherId: string;
    studentId: string;
    msg: string;
  };
} 