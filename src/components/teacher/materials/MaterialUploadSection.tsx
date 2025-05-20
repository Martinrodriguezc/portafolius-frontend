import React, { useRef } from "react";
import { Upload as UploadIcon } from "lucide-react";
import Button from "../../common/Button/Button";

export interface MaterialUploadSectionProps {
  accept: string;
  onFileSelected: (file: File) => void;
  selectedFileName?: string;
  maxSizeMb?: number;
}

export default function MaterialUploadSection({
  accept,
  onFileSelected,
  selectedFileName,
  maxSizeMb = 50,
}: MaterialUploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <div
        className={`
          border-2 border-dashed border-slate-300 rounded-[12px]
          p-8 flex flex-col items-center justify-center text-center
          cursor-pointer hover:border-[#4E81BD] transition-colors
        `}
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <UploadIcon className="h-10 w-10 text-[#4E81BD] mb-4" />
        <p className="font-medium text-[#333333] mb-2">
          Arrastra y suelta tu archivo aquí o haz clic para seleccionarlo
        </p>
        <Button variant="outline" className="flex items-center gap-2">
          <UploadIcon className="h-4 w-4" /> Seleccionar archivo
        </Button>
        <p className="text-xs text-[#666666] mt-2">
          Formatos admitidos:{" "}
          {accept
            .split(",")
            .map((s) => s.trim())
            .join(", ")}{" "}
          (máx. {maxSizeMb} MB)
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelected(file);
        }}
      />

      {selectedFileName && (
        <p className="mt-2 text-sm text-[#333333]">
          Archivo seleccionado: {selectedFileName}
        </p>
      )}
    </div>
  );
}