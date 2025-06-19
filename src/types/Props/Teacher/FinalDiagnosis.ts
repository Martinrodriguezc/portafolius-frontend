import { FinalDiagnosisOption } from "../../protocol";

export interface FinalDiagnosis {
  index: number;
  options: FinalDiagnosisOption[];
  value?: number;
  onChange: (id: number) => void;
}