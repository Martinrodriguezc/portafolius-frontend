import Button from "../../common/Button/Button";
import {
  FileVideo,
  Upload,
  Trash2,
} from "lucide-react";
import { Label } from "../../common/Label/Label";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";
import { UploadSectionProps } from "../../../types/Props/Video/UploadSectionProps";
import { useProtocolOptions } from "../../../hooks/student/protocols/useProtocolOptions";
import { useProtocolFlow } from "../../../hooks/student/ProtocolFlow/useProtocolFlow";

export function UploadSection ({
  files,
  handleFileChange,
  removeFile,
  updateFileProtocol,
  updateFileWindow,
  updateFileFinding,
  updateFileDiagnosis,
  updateFileSubdiagnosis,
  updateFileSubSub,
  updateFileThirdOrder,
}: UploadSectionProps) {

  const {
    protocols,
  } = useProtocolOptions();

  // inicializamos flow para protocolos/ventanas/etc.
  const {
    windows,
    findings,
    diagnoses,
    subdiagnoses,
    subSubs,
    thirdOrders,
    loadWindows,
    loadFindings,
    loadDiagnoses,
    loadSubdiagnoses,
    loadSubSubs,
    loadThirdOrders,
  } = useProtocolFlow(0);

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
          <input
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

                  <Select
                    value={fileItem.protocolKey}
                    onValueChange={(val) => {
                      updateFileProtocol(index, val);
                      console.log(`Protocolo seleccionado: ${val}`, windows);
                      loadWindows(val);
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
                          <SelectItem key={p.id} value={p.key}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* ————— Dinámico: Etiquetas para este video ————— */}
                    {fileItem.protocolKey && (
                      <div className="space-y-4 pt-4">
                        <Label className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block">
                          Etiquetas para este video
                        </Label>
                        {/* Ventana */}
                        {windows.length > 0 && (
                          <div className="mt-2">
                            <Label
                              htmlFor={`window-${index}`}
                              className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block"
                            >
                              Seleccionar Ventana
                            </Label>
                            <Select
                              value={fileItem.windowId != null ? String(fileItem.windowId) : ""}
                              onValueChange={(val) => {
                                const winId = Number(val);
                                updateFileWindow(index, winId);
                                loadFindings(fileItem.protocolKey, winId);
                              }}
                            >
                              <SelectTrigger
                                id={`window-${index}`}
                                className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                              >
                                <SelectValue placeholder="Selecciona una ventana" />
                              </SelectTrigger>
                              <SelectContent>
                                {windows.map((w) => (
                                  <SelectItem key={w.id} value={String(w.id)}>
                                    {w.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {/* Hallazgo */}
                        {fileItem.windowId != null && findings.length > 0 && (
                          <div className="mt-2">
                            <Label
                              htmlFor={`finding-${index}`}
                              className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block"
                            >
                              Seleccionar Hallazgo
                            </Label>
                            <Select
                              value={fileItem.findingId != null ? String(fileItem.findingId) : ""}
                              onValueChange={(val) => {
                                const fId = Number(val);
                                updateFileFinding(index, fId);
                                loadDiagnoses(fileItem.protocolKey, fileItem.windowId!, fId);
                              }}
                            >
                              <SelectTrigger
                                id={`finding-${index}`}
                                className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                              >
                                <SelectValue placeholder="Selecciona Hallazgo" />
                              </SelectTrigger>
                              <SelectContent>
                                {findings.map((f) => (
                                  <SelectItem key={f.id} value={String(f.id)}>
                                    {f.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {/* Diagnósticos posibles */}
                        {fileItem.findingId != null && diagnoses.length > 0 && (
                          <div className="mt-2">
                            <Label
                              htmlFor={`diagnosis-${index}`}
                              className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block"
                            >
                              Seleccionar Diagnóstico posible
                            </Label>
                            <Select
                              value={fileItem.diagnosisId != null ? String(fileItem.diagnosisId) : ""}
                              onValueChange={(val) => {
                                const dId = Number(val);
                                updateFileDiagnosis(index, dId);
                                loadSubdiagnoses(fileItem.protocolKey, dId);
                              }}
                            >
                              <SelectTrigger
                                id={`diagnosis-${index}`}
                                className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                              >
                                <SelectValue placeholder="Selecciona diagnóstico" />
                              </SelectTrigger>
                              <SelectContent>
                                {diagnoses.map((d) => (
                                  <SelectItem key={d.id} value={String(d.id)}>
                                    {d.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {/* Subdiagnósticos (ej. cardiaco u otros que tengan subniveles) */}
                        {fileItem.diagnosisId != null && subdiagnoses.length > 0 && (
                          <div className="mt-2">
                            <Label
                              htmlFor={`subdiagnosis-${index}`}
                              className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block"
                            >
                              Seleccionar Subdiagnóstico
                            </Label>
                            <Select
                              value={fileItem.subdiagnosisId != null ? String(fileItem.subdiagnosisId) : ""}
                              onValueChange={(val) => {
                                const sdId = Number(val);
                                updateFileSubdiagnosis(index, sdId);
                                loadSubSubs(fileItem.protocolKey, sdId);
                              }}
                            >
                              <SelectTrigger
                                id={`subdiagnosis-${index}`}
                                className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                              >
                                <SelectValue placeholder="Selecciona subdiagnóstico" />
                              </SelectTrigger>
                              <SelectContent>
                                {subdiagnoses.map((sd) => (
                                  <SelectItem key={sd.id} value={String(sd.id)}>
                                    {sd.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {/* Sub-Subdiagnósticos */}
                        {fileItem.subdiagnosisId != null && subSubs.length > 0 && (
                          <div className="mt-2">
                            <Label
                              htmlFor={`subsub-${index}`}
                              className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block"
                            >
                              Seleccionar Sub-Subdiagnóstico
                            </Label>
                            <Select
                              value={fileItem.subSubId != null ? String(fileItem.subSubId) : ""}
                              onValueChange={(val) => {
                                const ssId = Number(val);
                                updateFileSubSub(index, ssId);
                                loadThirdOrders(fileItem.protocolKey, ssId);
                              }}
                            >
                              <SelectTrigger
                                id={`subsub-${index}`}
                                className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0]rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                              >
                                <SelectValue placeholder="Selecciona sub-subdiagnóstico" />
                              </SelectTrigger>
                              <SelectContent>
                                {subSubs.map((ss) => (
                                  <SelectItem key={ss.id} value={String(ss.id)}>
                                    {ss.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {/* Third order */}
                        {fileItem.subSubId != null && thirdOrders.length > 0 && (
                          <div className="mt-2">
                            <Label
                              htmlFor={`thirdorder-${index}`}
                              className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block"
                            >
                              Seleccionar Diagnóstico de 3er orden
                            </Label>
                            <Select
                              value={fileItem.thirdOrderId != null ? String(fileItem.thirdOrderId) : ""}
                              onValueChange={(val) => {
                                const tId = Number(val);
                                updateFileThirdOrder(index, tId);
                              }}
                            >
                              <SelectTrigger
                                id={`thirdorder-${index}`}
                                className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                              >
                                <SelectValue placeholder="Selecciona diagnóstico de 3er orden" />
                              </SelectTrigger>
                              <SelectContent>
                                {thirdOrders.map((to) => (
                                  <SelectItem key={to.id} value={String(to.id)}>
                                    {to.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
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