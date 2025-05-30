import { User, UserRole } from '../Admin/UserTypes';

export interface UserTableProps {
  users: User[];
  userType: UserRole;
  onUserUpdate: () => void;
}

export interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  userType: UserRole;
  user?: User;
} 