export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  specialty: string;
  year: string;
  avatar: string;
}

export interface PersonalTabProps {
  profile: ProfileData;
  setProfile: (val: ProfileData) => void;
}
