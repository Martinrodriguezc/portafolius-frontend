import { FindingOption } from "../../protocol";

export interface FindingSelectorProps {
  index: number;
  options: FindingOption[];
  value?: number;
  onChange: (id: number) => void;
}