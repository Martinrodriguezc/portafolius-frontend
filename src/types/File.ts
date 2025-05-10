export interface FileWithMetadata {
  file: File;
  protocol: string;
  selectedOrgan: string;
  selectedStructure: string;
  selectedCondition: string;
  tags: { id: number; text: string }[];
}