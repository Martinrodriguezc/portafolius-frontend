import { ThirdOrderOption } from "../../protocol";

export interface ThirdOrderProps {
  index: number;
  options: ThirdOrderOption[];
  value?: number;
  onChange: (id: number) => void;
}