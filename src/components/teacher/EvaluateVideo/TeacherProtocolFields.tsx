import React from "react";
import { Label } from "../../common/Label/Label";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";
import { TeacherProtocolFieldsProps } from "../../../types/Props/Teacher/TeacherProtocolFieldsProps";

export const TeacherProtocolFields: React.FC<TeacherProtocolFieldsProps> = ({
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
  updateFileImageQuality,
  updateFileFinalDiagnosis,
}) => (
  <div>
    <Label htmlFor={`protocol-${index}`}>Protocolo</Label>
    <Select
      value={fileItem.protocolKey ?? ""}
      onValueChange={(val) => {
        updateFileProtocol(index, val);
        protocolFlow.loadWindows(val);
        protocolFlow.loadImageQualities();
        protocolFlow.loadFinalDiagnoses();
      }}
    >
      <SelectTrigger id={`protocol-${index}`} className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
        <SelectValue placeholder="Selecciona protocolo" />
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
        <Label>Ventana</Label>
        <Select
          value={fileItem.windowId != null ? String(fileItem.windowId) : ""}
          onValueChange={(v) => {
            const id = Number(v);
            updateFileWindow(index, id);
            protocolFlow.loadFindings(fileItem.protocolKey!, id);
          }}
          disabled={protocolFlow.windows.length === 0}
        >
          <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
            <SelectValue placeholder="Selecciona ventana" />
          </SelectTrigger>
          <SelectContent>
            {protocolFlow.windows.map((w) => (
              <SelectItem key={w.id} value={String(w.id)}>
                {w.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Hallazgo</Label>
        <Select
          value={fileItem.findingId != null ? String(fileItem.findingId) : ""}
          onValueChange={(v) => {
            const id = Number(v);
            updateFileFinding(index, id);
            protocolFlow.loadDiagnoses(
              fileItem.protocolKey!,
              fileItem.windowId!,
              id
            );
          }}
          disabled={protocolFlow.findings.length === 0}
        >
          <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
            <SelectValue placeholder="Selecciona hallazgo" />
          </SelectTrigger>
          <SelectContent>
            {protocolFlow.findings.map((f) => (
              <SelectItem key={f.id} value={String(f.id)}>
                {f.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Diagnóstico posible</Label>
        <Select
          value={fileItem.diagnosisId != null ? String(fileItem.diagnosisId) : ""}
          onValueChange={(v) => {
            const id = Number(v);
            updateFileDiagnosis(index, id);
            protocolFlow.loadSubdiagnoses(fileItem.protocolKey!, id);
          }}
          disabled={protocolFlow.diagnoses.length === 0}
        >
          <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
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

        {protocolFlow.subdiagnoses.length > 0 && (
          <>
            <Label>Subdiagnóstico</Label>
            <Select
              value={fileItem.subdiagnosisId != null ? String(fileItem.subdiagnosisId) : ""}
              onValueChange={(v) => {
                const id = Number(v);
                updateFileSubdiagnosis(index, id);
                protocolFlow.loadSubSubs(fileItem.protocolKey!, id);
              }}
            >
              <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
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
          </>
        )}

        {protocolFlow.subSubs.length > 0 && (
          <>
            <Label>Sub-Subdiagnóstico</Label>
            <Select
              value={fileItem.subSubId != null ? String(fileItem.subSubId) : ""}
              onValueChange={(v) => {
                const id = Number(v);
                updateFileSubSub(index, id);
                protocolFlow.loadThirdOrders(fileItem.protocolKey!, id);
              }}
            >
              <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
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
          </>
        )}

        {protocolFlow.thirdOrders.length > 0 && (
          <>
            <Label>3.º orden</Label>
            <Select
              value={fileItem.thirdOrderId != null ? String(fileItem.thirdOrderId) : ""}
              onValueChange={(v) => updateFileThirdOrder(index, Number(v))}
            >
              <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
                <SelectValue placeholder="Selecciona 3.º orden" />
              </SelectTrigger>
              <SelectContent>
                {protocolFlow.thirdOrders.map((to) => (
                  <SelectItem key={to.id} value={String(to.id)}>
                    {to.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}

        <Label>Calidad de imagen</Label>
        <Select
          value={fileItem.imageQualityId != null ? String(fileItem.imageQualityId) : ""}
          onValueChange={(v) => updateFileImageQuality(index, Number(v))}
        >
          <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
            <SelectValue placeholder="Calidad de imagen" />
          </SelectTrigger>
          <SelectContent>
            {protocolFlow.imageQualities.map((iq) => (
              <SelectItem key={iq.id} value={String(iq.id)}>
                {iq.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Diagnóstico final</Label>
        <Select
          value={fileItem.finalDiagnosisId != null ? String(fileItem.finalDiagnosisId) : ""}
          onValueChange={(v) => updateFileFinalDiagnosis(index, Number(v))}
        >
          <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
            <SelectValue placeholder="Dx final" />
          </SelectTrigger>
          <SelectContent>
            {protocolFlow.finalDiagnoses.map((fd) => (
              <SelectItem key={fd.id} value={String(fd.id)}>
                {fd.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )}
  </div>
);