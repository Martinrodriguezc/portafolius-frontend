import React from "react";
import Button from "./Button";

interface FileSelectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onRemove: () => void;
}

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