export type ProtocolType = "fate" | "fast" | "rush" | "blue" | "focus";

export interface Protocol {
  id?: string;
  name: string;
  description: string;
  type: ProtocolType;
  createdAt?: string;
  updatedAt?: string;
}
