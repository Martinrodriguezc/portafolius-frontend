export interface UserProfileProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface SaveProfileProps {
  profile: UserProfileProps;
  onSave: (data: Partial<Omit<UserProfileProps, "id">>) => Promise<void>;
}
