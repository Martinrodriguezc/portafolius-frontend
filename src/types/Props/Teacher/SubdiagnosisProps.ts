import { SubdiagnosisOption } from "../../protocol";

export interface SubdiagnosisSelectorProps {
  index: number;
  options: SubdiagnosisOption[];
  value?: number;
  onChange: (id: number) => void;
}