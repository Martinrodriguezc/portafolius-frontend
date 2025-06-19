import { ImageQualityOption } from "../../protocol";

export interface ImageQualityProps {
  index: number;
  options: ImageQualityOption[];
  value?: number;
  onChange: (id: number) => void;
}