import { SubSubOption } from "../../protocol";

export interface SubSubdiagnosisSelectorProps {
  options: SubSubOption[];
  value?: number;
  onChange: (id: number) => void;
}