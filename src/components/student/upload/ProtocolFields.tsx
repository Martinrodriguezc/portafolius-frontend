import React from "react";
import { Label } from "../../common/Label/Label";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";
import { ProtocolFieldsProps } from "../../../types/Props/Video/ProtocolFieldsProps";

export const ProtocolFields: React.FC<ProtocolFieldsProps> = ({
  fileItem,
  index,
  protocolOptions,
  protocolFlow,
  updateFileProtocol,
  updateFileWindow,
  updateFileFinding,
  updateFileDiagnosis,
  updateFileSubdiagnosis,
  updateFileSubSub,
  updateFileThirdOrder,
}) => (
  <div>
    <Label htmlFor={`protocol-${index}`} className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block">
      Protocolo para este video
    </Label>
    <Select
      value={fileItem.protocolKey}
      onValueChange={(val) => {
        updateFileProtocol(index, val);
        protocolFlow.loadWindows(val);
      }}
    >
      <SelectTrigger id={`protocol-${index}`} className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]">
        <SelectValue placeholder="Selecciona un protocolo" />
      </SelectTrigger>
      <SelectContent>
        {protocolOptions.protocols.map((p) => (
          <SelectItem key={p.id} value={p.key}>
            {p.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {fileItem.protocolKey && (
      <div className="space-y-4 pt-4">
        <Label className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block">
          Etiquetas para este video
        </Label>

        {/* Ventana */}
        <div className="mt-2">
          <Label htmlFor={`window-${index}`} className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block">
            Seleccionar Ventana
          </Label>
          <Select
            value={fileItem.windowId != null ? String(fileItem.windowId) : ""}
            onValueChange={(val) => {
              const winId = Number(val);
              updateFileWindow(index, winId);
              protocolFlow.loadFindings(fileItem.protocolKey, winId);
            }}
            disabled={protocolFlow.windows.length === 0}
          >
            <SelectTrigger id={`window-${index}`} className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]">
              <SelectValue placeholder="Selecciona una ventana" />
            </SelectTrigger>
            <SelectContent>
              {protocolFlow.windows.map((w) => (
                <SelectItem key={w.id} value={String(w.id)}>
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hallazgo */}
        <div className="mt-2">
          <Label htmlFor={`finding-${index}`} className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block">
            Seleccionar Hallazgo
          </Label>
          <Select
            value={fileItem.findingId != null ? String(fileItem.findingId) : ""}
            onValueChange={(val) => {
              const fId = Number(val);
              updateFileFinding(index, fId);
              protocolFlow.loadDiagnoses(fileItem.protocolKey, fileItem.windowId!, fId);
            }}
            disabled={protocolFlow.findings.length === 0}
          >
            <SelectTrigger id={`finding-${index}`} className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]">
              <SelectValue placeholder="Selecciona Hallazgo" />
            </SelectTrigger>
            <SelectContent>
              {protocolFlow.findings.map((f) => (
                <SelectItem key={f.id} value={String(f.id)}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Diagnóstico posible */}
        <div className="mt-2">
          <Label htmlFor={`diagnosis-${index}`} className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block">
            Seleccionar Diagnóstico posible
          </Label>
          <Select
            value={fileItem.diagnosisId != null ? String(fileItem.diagnosisId) : ""}
            onValueChange={(val) => {
              const dId = Number(val);
              updateFileDiagnosis(index, dId);
              protocolFlow.loadSubdiagnoses(fileItem.protocolKey, dId);
            }}
            disabled={protocolFlow.diagnoses.length === 0}
          >
            <SelectTrigger id={`diagnosis-${index}`} className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]">
              <SelectValue placeholder="Selecciona diagnóstico" />
            </SelectTrigger>
            <SelectContent>
              {protocolFlow.diagnoses.map((d) => (
                <SelectItem key={d.id} value={String(d.id)}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subdiagnóstico */}
        {fileItem.diagnosisId != null && protocolFlow.subdiagnoses.length > 0 && (
          <div className="mt-2">
            <Label htmlFor={`subdiagnosis-${index}`} className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block">
              Seleccionar Subdiagnóstico
            </Label>
            <Select
              value={fileItem.subdiagnosisId != null ? String(fileItem.subdiagnosisId) : ""}
              onValueChange={(val) => {
                const sdId = Number(val);
                updateFileSubdiagnosis(index, sdId);
                protocolFlow.loadSubSubs(fileItem.protocolKey, sdId);
              }}
            >
              <SelectTrigger id={`subdiagnosis-${index}`} className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]">
                <SelectValue placeholder="Selecciona subdiagnóstico" />
              </SelectTrigger>
              <SelectContent>
                {protocolFlow.subdiagnoses.map((sd) => (
                  <SelectItem key={sd.id} value={String(sd.id)}>
                    {sd.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Sub-Subdiagnóstico */}
        {fileItem.subdiagnosisId != null && protocolFlow.subSubs.length > 0 && (
          <div className="mt-2">
            <Label htmlFor={`subsub-${index}`} className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block">
              Seleccionar Sub-Subdiagnóstico
            </Label>
            <Select
              value={fileItem.subSubId != null ? String(fileItem.subSubId) : ""}
              onValueChange={(val) => {
                const ssId = Number(val);
                updateFileSubSub(index, ssId);
                protocolFlow.loadThirdOrders(fileItem.protocolKey, ssId);
              }}
            >
              <SelectTrigger id={`subsub-${index}`} className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]">
                <SelectValue placeholder="Selecciona sub-subdiagnóstico" />
              </SelectTrigger>
              <SelectContent>
                {protocolFlow.subSubs.map((ss) => (
                  <SelectItem key={ss.id} value={String(ss.id)}>
                    {ss.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Diagnóstico de 3er orden */}
        {fileItem.subSubId != null && protocolFlow.thirdOrders.length > 0 && (
          <div className="mt-2">
            <Label htmlFor={`thirdorder-${index}`} className="text-sm sm:text-[14px] font-medium text-[#333333] mb-1 block">
              Seleccionar Diagnóstico de 3er orden
            </Label>
            <Select
              value={fileItem.thirdOrderId != null ? String(fileItem.thirdOrderId) : ""}
              onValueChange={(val) => {
                const tId = Number(val);
                updateFileThirdOrder(index, tId);
              }}
            >
              <SelectTrigger id={`thirdorder-${index}`} className="h-10 sm:h-[42px] text-sm sm:text-[14px] border-[#A0A0A0] rounded-[8px] bg-white focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]">
                <SelectValue placeholder="Selecciona diagnóstico de 3er orden" />
              </SelectTrigger>
              <SelectContent>
                {protocolFlow.thirdOrders.map((to) => (
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
);