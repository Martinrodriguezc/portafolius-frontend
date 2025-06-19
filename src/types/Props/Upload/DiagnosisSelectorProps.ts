import { DiagnosisOption } from "../../protocol";

export interface DiagnosisSelectorProps {
  options: DiagnosisOption[];
  value?: number;
  onChange: (id: number) => void;
}