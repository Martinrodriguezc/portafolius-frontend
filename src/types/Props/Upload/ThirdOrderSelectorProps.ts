import { ThirdOrderOption } from "../../protocol";

export interface ThirdOrderSelectorProps {
  options: ThirdOrderOption[];
  value?: number;
  onChange: (id: number) => void;
}