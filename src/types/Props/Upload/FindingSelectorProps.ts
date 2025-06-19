import { FindingOption } from "../../protocol";

export interface FindingSelectorProps {
  options: FindingOption[];
  value?: number;
  onChange: (id: number) => void;
}