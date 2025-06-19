import { WindowOption } from "../../protocol";

export interface WindowSelectorProps {
  options: WindowOption[];
  value?: number;
  onChange: (id: number) => void;
}