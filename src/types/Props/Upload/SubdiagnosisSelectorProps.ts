import { SubdiagnosisOption } from "../../protocol";

export interface SubdiagnosisSelectorProps {
  options: SubdiagnosisOption[];
  value?: number;
  onChange: (id: number) => void;
}