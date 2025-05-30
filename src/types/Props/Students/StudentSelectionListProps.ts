import { UserProps } from "../../User";

export interface StudentSelectionListProps {
  students: UserProps[];
  selectedStudentIds: number[];
  isLoading: boolean;
  error: string | null;
  onToggleStudent: (id: number | string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}