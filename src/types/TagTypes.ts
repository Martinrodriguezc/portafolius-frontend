export interface DiagnosticTag {
  id: number;
  text: string;
}

export interface TagSectionProps {
  selectedOrgan: string;
  setSelectedOrgan: React.Dispatch<React.SetStateAction<string>>;
  selectedStructure: string;
  setSelectedStructure: React.Dispatch<React.SetStateAction<string>>;
  selectedCondition: string;
  setSelectedCondition: React.Dispatch<React.SetStateAction<string>>;
  organOptions: string[];
  structureOptions: Record<string, string[]>;
  conditionOptions: Record<string, string[]>;
  addTag: () => void;
  removeTag: (id: number) => void;
  tags: DiagnosticTag[];
}