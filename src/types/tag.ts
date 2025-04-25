export interface Tag {
  id: string;
  name: string;
  organ: string;
  structure: string;
  condition: string;
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
  tags: DiagnosticTag[];
}

export interface DiagnosticTag {
  id: number;
  text: string;
}

export interface TagSectionProps {
  section: TagSelectorState & TagHierarchy & {
    setSelectedOrgan: (organ: string) => void;
    setSelectedStructure: (structure: string) => void;
    setSelectedCondition: (condition: string) => void;
    addTag: () => void;
    removeTag: (id: number) => void;
  };
}