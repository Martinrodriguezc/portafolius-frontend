import React, { useState } from "react";
import axios from "axios";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import {
  FileVideo,
  Upload,
  Trash2,
  Plus,
  TagIcon,
  X,
} from "lucide-react";
import { Label } from "../../common/Label/Label";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";
import { UploadSectionProps } from "../../../types/Props/Video/UploadSectionProps";
import { useTagOptions } from "../../../hooks/upload/TagUtils";
import { useProtocolOptions } from "../../../hooks/student/protocols/useProtocolOptions";

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
  const { organs, structures, conditions } = useTagOptions();
  const {
    protocols,
    loadingProtocols,
    protocolsError,
    createProtocol,
    creating: creatingProtocol,
    createError: protocolCreationError,
    reset: resetProtocol,
  } = useProtocolOptions();

  // Estado para edición inline de protocolo
  const [editingProtocolIndex, setEditingProtocolIndex] = useState<number | null>(null);
  const [newProtocolName, setNewProtocolName] = useState("");
  const [inlineError, setInlineError] = useState<string | null>(null);

  return (
    <div className="mt-8 mb-8 space-y-6">
      <Label className="text-base sm:text-[15px] font-medium text-[#333333] mb-2 block">
        Archivos de video
      </Label>

      {/* Dropzone */}
      <div className="border-2 border-dashed border-[#A0A0A0] rounded-[12px] p-4 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
        <FileVideo className="h-12 w-12 sm:h-14 sm:w-14 mx-auto text-[#4E81BD] mb-3" />
        <p className="text-sm sm:text-[15px] text-[#333333] mb-4">
          Arrastra y suelta tus archivos de video aquí o haz clic para seleccionarlos
        </p>
        <div className="relative max-w-xs mx-auto">
          <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-sm sm:text-[14px] font-medium py-2.5 sm:py-3 px-4 sm:px-5 rounded-[8px] w-full flex items-center justify-center gap-2 shadow-sm">
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
        <p className="text-xs sm:text-[12px] text-[#666666] mt-3">
          Formatos soportados: .mp4, .avi, .mov (máx. 50 MB por archivo)
        </p>
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="text-base sm:text-[16px] font-medium text-[#333333]">
              Archivos seleccionados ({files.length})
            </h3>
            {files.length > 1 && (
              <Button variant="ghost" className="text-sm sm:text-[14px] text-[#4E81BD] hover:bg-[#4E81BD]/10">
                Ordenar archivos
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {files.map((fileItem, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* File header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50 p-3 sm:p-4 border-b border-slate-200 gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="bg-[#4E81BD]/10 p-2 rounded-md flex-shrink-0">
                      <FileVideo className="h-5 w-5 text-[#4E81BD]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm sm:text-[15px] font-medium text-[#333333] block truncate">
                        {fileItem.file.name}
                      </span>
                      <span className="text-xs sm:text-[12px] text-[#666666]">
                        {(fileItem.file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* File details */}
                <div className="p-4 sm:p-5 bg-white space-y-5">
                  {/* Protocolo dinámico */}
                  <div>
                    <Label
                      htmlFor={`protocol-${index}`}
                      className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block"
                    >
                      Protocolo para este video
                    </Label>

                    {editingProtocolIndex === index ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={newProtocolName}
                          onChange={(e) => {
                            setInlineError(null);
                            setNewProtocolName(e.target.value.toUpperCase())
                          }}
                          placeholder="Nuevo protocolo"
                          className="flex-1"
                        />
                        <Button
                          onClick={async () => {
                            if (!newProtocolName.trim()) return;
                            try {
                              await createProtocol(newProtocolName.trim());
                              updateFileProtocol(index, newProtocolName.trim());
                              setEditingProtocolIndex(null);
                            } catch (err) {
                              if (
                                axios.isAxiosError(err) &&
                                err.response?.status === 409
                              ) {
                                setInlineError("Ya existe ese protocolo");
                              } else {
                                setInlineError("Error creando protocolo");
                              }
                            }
                          }}
                          disabled={creatingProtocol || !newProtocolName.trim()}
                          className="px-3 py-1 bg-[#4E81BD] text-white rounded"
                        >
                          Guardar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setInlineError(null);
                            resetProtocol();
                            setEditingProtocolIndex(null);
                          }}
                          className="px-3 py-1 rounded"
                        >
                          Cancelar
                        </Button>
                        {inlineError && (
                          <p className="text-sm text-red-500 w-full mt-1">
                            {inlineError}
                          </p>
                        )}
                      </div>
                    ) : loadingProtocols ? (
                      <p className="text-sm text-gray-500">Cargando protocolos…</p>
                    ) : protocolsError ? (
                      <p className="text-sm text-red-500">Error cargando</p>
                    ) : (
                      <Select
                        value={fileItem.protocol}
                        onValueChange={(val) => {
                          if (val === "__new") {
                            setNewProtocolName("");
                            setEditingProtocolIndex(index);
                          } else {
                            updateFileProtocol(index, val);
                          }
                        }}
                      >
                        <SelectTrigger
                          id={`protocol-${index}`}
                          className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                        >
                          <SelectValue placeholder="Selecciona un protocolo" />
                        </SelectTrigger>
                        <SelectContent>
                          {protocols.map((p) => (
                            <SelectItem key={p.id} value={p.name}>
                              {p.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="__new" className="text-[#4E81BD] font-medium">
                            + Agregar protocolo
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    {creatingProtocol && (
                      <p className="text-sm text-[#4E81BD] mt-1">
                        Creando protocolo…
                      </p>
                    )}
                    {!inlineError && protocolCreationError && (
                      <p className="text-sm text-red-500 mt-1">
                        {protocolCreationError.message}
                      </p>
                    )}
                  </div>

                  {/* Etiquetas (órgano/estructura/condición) */}
                  <div>
                    <Label className="text-sm sm:text-[14px] font-medium text-[#333333] mb-2 block">
                      Etiquetas para este video
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {/* Órgano */}
                      <div>
                        <Label
                          htmlFor={`organ-${index}`}
                          className="text-xs sm:text-[13px] text-[#333333] mb-1 block"
                        >
                          Órgano
                        </Label>
                        <Select
                          value={fileItem.selectedOrgan}
                          onValueChange={(val) => updateFileOrgan(index, val)}
                        >
                          <SelectTrigger
                            id={`organ-${index}`}
                            className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                          >
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {organs.map((org) => (
                              <SelectItem key={org.id} value={String(org.id)}>
                                {org.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Estructura */}
                      <div>
                        <Label
                          htmlFor={`structure-${index}`}
                          className="text-xs sm:text-[13px] text-[#333333] mb-1 block"
                        >
                          Estructura
                        </Label>
                        <Select
                          value={fileItem.selectedStructure}
                          onValueChange={(val) => updateFileStructure(index, val)}
                        >
                          <SelectTrigger
                            id={`structure-${index}`}
                            className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                          >
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {structures
                              .filter((s) => String(s.organ_id) === fileItem.selectedOrgan)
                              .map((s) => (
                                <SelectItem key={s.id} value={String(s.id)}>
                                  {s.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Condición */}
                      <div>
                        <Label
                          htmlFor={`condition-${index}`}
                          className="text-xs sm:text-[13px] text-[#333333] mb-1 block"
                        >
                          Condición
                        </Label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <Select
                              value={fileItem.selectedCondition}
                              onValueChange={(val) => updateFileCondition(index, val)}
                            >
                              <SelectTrigger
                                id={`condition-${index}`}
                                className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                              >
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent>
                                {conditions
                                  .filter((c) => String(c.structure_id) === fileItem.selectedStructure)
                                  .map((c) => (
                                    <SelectItem key={c.id} value={String(c.id)}>
                                      {c.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            variant="secondary"
                            className="h-10 sm:h-[42px] w-10 sm:w-[42px] p-0 rounded-[8px] flex items-center justify-center bg-[#4E81BD] text-white hover:bg-[#4E81BD]/90 disabled:bg-[#A0A0A0] disabled:opacity-50"
                            onClick={() => addTagToFile(index)}
                            disabled={
                              !fileItem.selectedOrgan ||
                              !fileItem.selectedStructure ||
                              !fileItem.selectedCondition
                            }
                          >
                            <Plus className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Tag pills */}
                    {fileItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-2 border-t border-slate-100">
                        {fileItem.tags.map((tagObj, tagIndex) => (
                          <div
                            key={tagObj.id}
                            className="flex items-center gap-1 bg-[#4E81BD]/10 text-[#4E81BD] px-3 py-1 rounded-full text-xs sm:text-[13px] border border-[#4E81BD]/20"
                          >
                            <TagIcon className="h-3 w-3" />
                            <span>{tagObj.text}</span>
                            <button
                              onClick={() => removeTagFromFile(index, tagIndex)}
                              className="ml-1 text-[#4E81BD] hover:text-[#4E81BD]/70 p-0.5 rounded-full hover:bg-[#4E81BD]/10"
                              aria-label="Eliminar etiqueta"
                            >
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
        </div>
      )}
    </div>
  );
};