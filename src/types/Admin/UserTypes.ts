export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
  profileImage?: string;
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export type UserRole = 'estudiante' | 'profesor'; 