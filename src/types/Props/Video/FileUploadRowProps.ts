import { FileWithMetadata } from "../../File";
import { UploadSectionProps } from "./UploadSectionProps";

export interface FileUploadRowProps
  extends Omit<UploadSectionProps, "files" | "handleFileChange"> {
  fileItem: FileWithMetadata;
  index: number;
  removeFile: (idx: number) => void;
}