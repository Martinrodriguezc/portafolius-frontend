import { ProtocolOption } from "../../protocol";

export interface ProtocolSelectorProps {
  options: ProtocolOption[];
  value: string;
  onChange: (key: string) => void;
}