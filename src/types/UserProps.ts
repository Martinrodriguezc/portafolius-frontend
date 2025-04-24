export interface UserProps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: UserProps;
}
