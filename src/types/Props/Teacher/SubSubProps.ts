import { SubSubOption } from "../../protocol";

export interface SubSubdiagnosisSelectorProps {
  index: number;
  options: SubSubOption[];
  value?: number;
  onChange: (id: number) => void;
}