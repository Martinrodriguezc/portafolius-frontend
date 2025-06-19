import { ProtocolOption } from "../../protocol";

export interface ProtocolSelectorProps {
  index: number;
  protocols: ProtocolOption[];
  value?: string;
  onChange: (val: string) => void;
}