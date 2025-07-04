export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "estudiante" | "profesor" | "admin" | "google_login";
}

export interface ProfileFormValues {
  first_name: string;
  last_name: string;
  email: string;
  current_password: string;
  new_password: string;
  confirm_password: string;
}
export interface UseProfileFormReturn {
  form: ProfileFormValues;
  busy: boolean;
  saved: boolean;
  error: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

export interface UseUserProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<Omit<UserProfile, "id">>) => Promise<void>;
}

export interface UserProps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
  autorizado?: boolean;
}

export interface AuthResponse {
  token: string;
  user: UserProps;
  msg: string;
}
