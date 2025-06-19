import { DiagnosisOption } from "../../protocol";

export interface DiagnosisSelectorTeacherProps {
  index: number;
  options: DiagnosisOption[];
  value?: number;
  onChange: (id: number) => void;
}