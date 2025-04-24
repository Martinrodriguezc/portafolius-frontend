export interface UserProfileProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
}

export type UserRole = "estudiante" | "profesor" | "admin" | "google_login";

export interface SaveProfileProps {
  profile: UserProfileProps;
  onSave: (data: Partial<Omit<UserProfileProps, "id">>) => Promise<void>;
}
