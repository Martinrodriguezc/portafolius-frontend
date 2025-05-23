import { User } from '../../Admin/UserTypes';

export interface UserListProps {
  users: User[];
  searchTerm: string;
  onSelect: (user: User) => void;
  selectedUser: User | null;
  selectedUsers?: User[];
  placeholder: string;
  label: string;
  multiSelect?: boolean;
  showAssignmentStatus?: boolean;
} 