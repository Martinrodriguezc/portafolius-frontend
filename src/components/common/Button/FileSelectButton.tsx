import { FileSelectButtonProps } from "../../../types/Props/common/FileSelectButtonProps";
import Button from "./Button";

const FileSelectButton: React.FC<FileSelectButtonProps> = ({
  onRemove,
  children,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-[#A0A0A0] hover:text-[#333333]"
      onClick={onRemove}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FileSelectButton;
