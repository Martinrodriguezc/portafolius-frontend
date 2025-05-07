import React from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { FileVideo, Upload, Trash2, Plus, Tag, X } from "lucide-react";
import { Label } from "../../common/Label/Label";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";

/**
 * Metadatos asociados a cada archivo de video.
 */
export interface FileWithMetadata {
  file: File;
  protocol: string;
  selectedOrgan: string;
  selectedStructure: string;
  selectedCondition: string;
  tags: string[];
}

/**
 * Props para el componente UploadSection.
 */
export interface UploadSectionProps {
  /**
   * Lista de archivos con metadatos.
   */
  files: FileWithMetadata[];
  /**
   * Manejador de selección de archivos.
   */
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Elimina un archivo por su índice.
   */
  removeFile: (index: number) => void;
  /**
   * Actualiza el protocolo de un archivo.
   */
  updateFileProtocol: (index: number, protocol: string) => void;
  /**
   * Actualiza el órgano del archivo.
   */
  updateFileOrgan: (index: number, organ: string) => void;
  /**
   * Actualiza la estructura del archivo.
   */
  updateFileStructure: (index: number, structure: string) => void;
  /**
   * Actualiza la condición del archivo.
   */
  updateFileCondition: (index: number, condition: string) => void;
  /**
   * Agrega una etiqueta basada en los metadatos seleccionados de un archivo.
   */
  addTagToFile: (index: number) => void;
  /**
   * Remueve una etiqueta de un archivo.
   */
  removeTagFromFile: (fileIndex: number, tagIndex: number) => void;
}

/**
 * Componente UploadSection: muestra una zona de drop/select de archivos,
 * permite asignar protocolo, órgano, estructura y condición,
 * y agregar/remover tags para cada archivo.
 */
export const UploadSection: React.FC<UploadSectionProps> = ({
  files,
  handleFileChange,
  removeFile,
  updateFileProtocol,
  updateFileOrgan,
  updateFileStructure,
  updateFileCondition,
  addTagToFile,
  removeTagFromFile,
}) => {
  return (
    <div className="mt-6 mb-6">
      <Label className="text-[14px] text-[#333333] mb-2 block">Archivos de video</Label>

      <div className="border-2 border-dashed border-[#A0A0A0] rounded-[8px] p-6 text-center">
        <FileVideo className="h-12 w-12 mx-auto text-[#4E81BD] mb-2" />
        <p className="text-[14px] text-[#333333] mb-4">
          Arrastra y suelta tus archivos de video aquí o haz clic para seleccionarlos
        </p>
        <div className="relative">
          <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-[12px] rounded-[8px] flex items-center justify-center gap-2 mx-auto">
            <Upload className="h-4 w-4" /> Seleccionar archivos
          </Button>
          <Input
            type="file"
            accept="video/mp4,video/avi,video/quicktime"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-[12px] text-[#A0A0A0] mt-2">
          Formatos soportados: .mp4, .avi, .mov (máx. 50MB por archivo)
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-6">
          <h3 className="text-[16px] font-medium text-[#333333] mb-2">
            Archivos seleccionados ({files.length})
          </h3>

          {files.map((fileItem, index) => (
            <div key={index} className="border border-slate-200 rounded-[8px] overflow-hidden">
              <div className="flex items-center justify-between bg-slate-50 p-3">
                <div className="flex items-center">
                  <FileVideo className="h-5 w-5 text-[#4E81BD] mr-2" />
                  <span className="text-[14px] text-[#333333] truncate max-w-[200px]">
                    {fileItem.file.name}
                  </span>
                  <span className="text-[12px] text-[#A0A0A0] ml-2">
                    ({(fileItem.file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
                <Button variant="ghost" onClick={() => removeFile(index)} className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <Label htmlFor={`protocol-${index}`} className="text-[14px] text-[#333333] mb-1 block">
                    Protocolo para este video
                  </Label>
                  <Select value={fileItem.protocol} onValueChange={(val) => updateFileProtocol(index, val)}>
                    <SelectTrigger id={`protocol-${index}`} className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
                      <SelectValue placeholder="Selecciona un protocolo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fate">FATE</SelectItem>
                      <SelectItem value="fast">FAST</SelectItem>
                      <SelectItem value="rush">RUSH</SelectItem>
                      <SelectItem value="blue">BLUE</SelectItem>
                      <SelectItem value="focus">FOCUS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[14px] text-[#333333] mb-2 block">Etiquetas para este video</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`organ-${index}`} className="text-[12px] text-[#333333] mb-1 block">Órgano</Label>
                      <Select value={fileItem.selectedOrgan} onValueChange={(val) => updateFileOrgan(index, val)}>
                        <SelectTrigger id={`organ-${index}`} className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corazon">Corazón</SelectItem>
                          <SelectItem value="pulmon">Pulmón</SelectItem>
                          <SelectItem value="higado">Hígado</SelectItem>
                          <SelectItem value="rinon">Riñón</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor={`structure-${index}`} className="text-[12px] text-[#333333] mb-1 block">Estructura</Label>
                      <Select value={fileItem.selectedStructure} onValueChange={(val) => updateFileStructure(index, val)}>
                        <SelectTrigger id={`structure-${index}`} className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="valvula">Válvula</SelectItem>
                          <SelectItem value="ventriculo">Ventrículo</SelectItem>
                          <SelectItem value="auricula">Aurícula</SelectItem>
                          <SelectItem value="arteria">Arteria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <div className="flex-1">
                        <Label htmlFor={`condition-${index}`} className="text-[12px] text-[#333333] mb-1 block">Condición</Label>
                        <Select value={fileItem.selectedCondition} onValueChange={(val) => updateFileCondition(index, val)}>
                          <SelectTrigger id={`condition-${index}`} className="h-[42px] text-[14px] border-[#A0A0A0] rounded-l-[8px] rounded-r-none flex-1">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="dilatado">Dilatado</SelectItem>
                            <SelectItem value="estenosis">Estenosis</SelectItem>
                            <SelectItem value="regurgitacion">Regurgitación</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="secondary" className="ml-2 h-10 w-10 p-0 rounded-r-[8px] flex items-center justify-center" onClick={() => addTagToFile(index)} disabled={!fileItem.selectedOrgan || !fileItem.selectedStructure || !fileItem.selectedCondition}>
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {fileItem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {fileItem.tags.map((tag, tagIndex) => (
                        <div key={tagIndex} className="flex items-center gap-1 bg-[#4E81BD]/10 text-[#4E81BD] px-3 py-1 rounded-full text-[12px]">
                          <Tag className="h-3 w-3" />
                          <span>{tag}</span>
                          <button onClick={() => removeTagFromFile(index, tagIndex)} className="ml-1 text-[#4E81BD] hover:text-[#4E81BD]/70">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};