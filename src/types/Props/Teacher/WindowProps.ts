import { WindowOption } from "../../protocol";

export interface WindowProps {
  index: number;
  options: WindowOption[];
  value?: number;
  onChange: (id: number) => void;
}