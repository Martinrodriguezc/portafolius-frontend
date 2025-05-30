import React, { useRef } from "react";
import { Upload as UploadIcon } from "lucide-react";
import Button from "../../common/Button/Button";

export interface MaterialUploadSectionProps {
  accept: string;
  onFilesSelected: (files: FileList) => void;
  selectedFileNames?: string[];
  onRemoveFile?: (index: number) => void;
  maxSizeMb?: number;
}

export default function MaterialUploadSection({
  accept,
  onFilesSelected,
  selectedFileNames = [],
  maxSizeMb = 50,
  onRemoveFile,
}: MaterialUploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  return (
    <div>
      <div
        className="
          border-2 border-dashed border-slate-300 rounded-[12px]
          p-8 flex flex-col items-center justify-center text-center
          cursor-pointer hover:border-[#4E81BD] transition-colors
        "
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <UploadIcon className="h-10 w-10 text-[#4E81BD] mb-4" />
        <p className="font-medium text-[#333333] mb-2">
          Arrastra y suelta tus archivos aquí o haz clic para seleccionarlos
        </p>
        <Button variant="outline" className="flex items-center gap-2">
          <UploadIcon className="h-4 w-4" /> Seleccionar archivos
        </Button>
        <p className="text-xs text-[#666666] mt-2">
          Formatos admitidos:{" "}
          {accept.split(",").map((s) => s.trim()).join(", ")} (máx. {maxSizeMb} MB c/u)
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) onFilesSelected(e.target.files);
        }}
      />

      {selectedFileNames.length > 0 && (
        <div className="mt-2 space-y-1">
          {selectedFileNames.map((name, idx) => (
            <div key={name} className="flex items-center justify-between text-sm text-[#333333]">
              <span>📄 {name}</span>
              {onRemoveFile && (
                <button
                  type="button"
                  onClick={() => onRemoveFile(idx)}
                  className="text-red-500 hover:text-red-700 ml-2"
                  aria-label="Eliminar archivo"
                >
                  ✖
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}