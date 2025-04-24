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