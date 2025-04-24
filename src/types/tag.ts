export interface Tag {
  id: string;
  name: string;
  created_by?: string;
}

export interface TagResponse {
  success: boolean;
  tags: Tag[];
  msg?: string;
}

export interface TagHierarchy {
  organs: string[];
  structures: Record<string, string[]>;
  conditions: Record<string, string[]>;
  loading: boolean;
  error: string | null;
}

export interface TagSelectorState {
  selectedOrgan: string;
  selectedStructure: string;
  selectedCondition: string;
  tags: { id: string; text: string }[];
}

export interface TagSectionProps {
  section: TagSelectorState & TagHierarchy & {
    setSelectedOrgan: (organ: string) => void;
    setSelectedStructure: (structure: string) => void;
    setSelectedCondition: (condition: string) => void;
    addTag: () => void;
    removeTag: (id: string) => void;
  };
} 