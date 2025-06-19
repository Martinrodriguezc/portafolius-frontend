import React from 'react';
import Button from '../../common/Button/Button';
import { FileVideo, Trash2 } from 'lucide-react';
import { Label } from '../../common/Label/Label';
import { Select, SelectValue } from '../../common/Select/SelectBase';
import { SelectTrigger, SelectContent } from '../../common/Select/SelectInteraction';
import { SelectItem } from '../../common/Select/SelectItems';
import { useProtocolOptions } from '../../../hooks/student/protocols/useProtocolOptions';
import { useProtocolFlow } from '../../../hooks/student/ProtocolFlow/useProtocolFlow';

export interface TeacherSelectionPayload {
  protocolKey?: string;
  windowId?: number;
  findingId?: number;
  diagnosisId?: number;
  subdiagnosisId?: number;
  subSubId?: number;
  thirdOrderId?: number;
  imageQualityId?: number;
  finalDiagnosisId?: number;
  comment?: string;
  isReady?: boolean;
}

export interface FileUploadRowTeacherProps {
  fileItem: TeacherSelectionPayload;
  index: number;
  removeFile: (idx: number) => void;
  updateFileProtocol: (idx: number, protocolKey: string) => void;
  updateFileWindow: (idx: number, windowId: number) => void;
  updateFileFinding: (idx: number, findingId: number) => void;
  updateFileDiagnosis: (idx: number, diagnosisId: number) => void;
  updateFileSubdiagnosis: (idx: number, subdiagnosisId: number) => void;
  updateFileSubSub: (idx: number, subSubId: number) => void;
  updateFileThirdOrder: (idx: number, thirdOrderId: number) => void;
  updateFileImageQuality: (idx: number, imageQualityId: number) => void;
  updateFileFinalDiagnosis: (idx: number, finalDiagnosisId: number) => void;
  updateFileComment: (idx: number, comment?: string) => void;
  updateFileReady: (idx: number, isReady: boolean) => void;
}

export const FileUploadRowTeacher: React.FC<FileUploadRowTeacherProps> = ({
  fileItem,
  index,
  removeFile,
  updateFileProtocol,
  updateFileWindow,
  updateFileFinding,
  updateFileDiagnosis,
  updateFileSubdiagnosis,
  updateFileSubSub,
  updateFileThirdOrder,
  updateFileImageQuality,
  updateFileFinalDiagnosis,
  updateFileComment,
  updateFileReady,
}) => {
  const { protocols } = useProtocolOptions();
  // Usamos useProtocolFlow con la posición index, igual que el flujo de estudiante
  const {
    windows,
    findings,
    diagnoses,
    subdiagnoses,
    subSubs,
    thirdOrders,
    imageQualities,
    finalDiagnoses,
    loadWindows,
    loadFindings,
    loadDiagnoses,
    loadSubdiagnoses,
    loadSubSubs,
    loadThirdOrders,
    loadImageQualities,
    loadFinalDiagnoses,
  } = useProtocolFlow(index);

  return (
    <div className="border border-slate-200 rounded-[12px] shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between bg-slate-50 p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <FileVideo className="h-5 w-5 text-[#4E81BD]" />
          <span className="font-medium text-[#333333]">Feedback profesor</span>
        </div>
        <Button
          variant="ghost"
          onClick={() => removeFile(index)}
          className="text-red-500 hover:bg-red-50 rounded-full p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6 space-y-4 bg-white">
        {/* Protocolo */}
        <div>
          <Label htmlFor={`protocol-${index}`}>Protocolo</Label>
          <Select
            value={fileItem.protocolKey || ''}
            onValueChange={val => {
              updateFileProtocol(index, val);
              loadWindows(val);
              loadImageQualities();
              loadFinalDiagnoses();
            }}
          >
            <SelectTrigger id={`protocol-${index}`} className="w-full">
              <SelectValue placeholder="Selecciona protocolo" />
            </SelectTrigger>
            <SelectContent>
              {protocols.map(p => (
                <SelectItem key={p.id} value={p.key}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {fileItem.protocolKey && (
          <>
            {/* Ventana */}
            <div>
              <Label htmlFor={`window-${index}`}>Ventana</Label>
              <Select
                value={fileItem.windowId != null ? String(fileItem.windowId) : ''}
                onValueChange={val => {
                  if (!val) return;
                  const win = Number(val);
                  updateFileWindow(index, win);
                  loadFindings(fileItem.protocolKey!, win);
                }}
                disabled={!windows.length}
              >
                <SelectTrigger id={`window-${index}`} className="w-full">
                  <SelectValue placeholder="Selecciona ventana" />
                </SelectTrigger>
                <SelectContent>
                  {windows.map(w => (
                    <SelectItem key={w.id} value={String(w.id)}>
                      {w.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Hallazgo */}
            <div>
              <Label htmlFor={`finding-${index}`}>Hallazgo</Label>
              <Select
                value={fileItem.findingId != null ? String(fileItem.findingId) : ''}
                onValueChange={val => {
                  if (!val) return;
                  const f = Number(val);
                  updateFileFinding(index, f);
                  loadDiagnoses(fileItem.protocolKey!, fileItem.windowId!, f);
                }}
                disabled={!findings.length}
              >
                <SelectTrigger id={`finding-${index}`} className="w-full">
                  <SelectValue placeholder="Selecciona hallazgo" />
                </SelectTrigger>
                <SelectContent>
                  {findings.map(f => (
                    <SelectItem key={f.id} value={String(f.id)}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Diagnóstico posible */}
            <div>
              <Label htmlFor={`diagnosis-${index}`}>Diagnóstico posible</Label>
              <Select
                value={fileItem.diagnosisId != null ? String(fileItem.diagnosisId) : ''}
                onValueChange={val => {
                  if (!val) return;
                  const d = Number(val);
                  updateFileDiagnosis(index, d);
                  loadSubdiagnoses(fileItem.protocolKey!, d);
                }}
                disabled={!diagnoses.length}
              >
                <SelectTrigger id={`diagnosis-${index}`} className="w-full">
                  <SelectValue placeholder="Selecciona diagnóstico" />
                </SelectTrigger>
                <SelectContent>
                  {diagnoses.map(d => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subdiagnóstico */}
            {subdiagnoses.length > 0 && (
              <div>
                <Label htmlFor={`subdiagnosis-${index}`}>Subdiagnóstico</Label>
                <Select
                  value={fileItem.subdiagnosisId != null ? String(fileItem.subdiagnosisId) : ''}
                  onValueChange={val => {
                    if (!val) return;
                    const sd = Number(val);
                    updateFileSubdiagnosis(index, sd);
                    loadSubSubs(fileItem.protocolKey!, sd);
                  }}
                  disabled={!subdiagnoses.length}
                >
                  <SelectTrigger id={`subdiagnosis-${index}`} className="w-full">
                    <SelectValue placeholder="Selecciona subdiagnóstico" />
                  </SelectTrigger>
                  <SelectContent>
                    {subdiagnoses.map(sd => (
                      <SelectItem key={sd.id} value={String(sd.id)}>
                        {sd.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Sub-Subdiagnóstico */}
            {subSubs.length > 0 && (
              <div>
                <Label htmlFor={`subsub-${index}`}>Sub-Subdiagnóstico</Label>
                <Select
                  value={fileItem.subSubId != null ? String(fileItem.subSubId) : ''}
                  onValueChange={val => {
                    if (!val) return;
                    const ss = Number(val);
                    updateFileSubSub(index, ss);
                    loadThirdOrders(fileItem.protocolKey!, ss);
                  }}
                  disabled={!subSubs.length}
                >
                  <SelectTrigger id={`subsub-${index}`} className="w-full">
                    <SelectValue placeholder="Selecciona sub-subdiagnóstico" />
                  </SelectTrigger>
                  <SelectContent>
                    {subSubs.map(ss => (
                      <SelectItem key={ss.id} value={String(ss.id)}>
                        {ss.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* 3er orden */}
            {thirdOrders.length > 0 && (
              <div>
                <Label htmlFor={`thirdorder-${index}`}>3er orden</Label>
                <Select
                  value={fileItem.thirdOrderId != null ? String(fileItem.thirdOrderId) : ''}
                  onValueChange={val => {
                    if (!val) return;
                    updateFileThirdOrder(index, Number(val));
                  }}
                  disabled={!thirdOrders.length}
                >
                  <SelectTrigger id={`thirdorder-${index}`} className="w-full">
                    <SelectValue placeholder="Selecciona 3er orden" />
                  </SelectTrigger>
                  <SelectContent>
                    {thirdOrders.map(to => (
                      <SelectItem key={to.id} value={String(to.id)}>
                        {to.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Calidad de imagen */}
            <div>
              <Label htmlFor={`imageQuality-${index}`}>Calidad de imagen</Label>
              <Select
                value={fileItem.imageQualityId != null ? String(fileItem.imageQualityId) : ''}
                onValueChange={val => {
                  if (!val) return;
                  updateFileImageQuality(index, Number(val));
                }}
                disabled={!imageQualities.length}
              >
                <SelectTrigger id={`imageQuality-${index}`} className="w-full">
                  <SelectValue placeholder="Selecciona calidad" />
                </SelectTrigger>
                <SelectContent>
                  {imageQualities.map(iq => (
                    <SelectItem key={iq.id} value={String(iq.id)}>
                      {iq.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Diagnóstico final */}
            <div>
              <Label htmlFor={`finalDiagnosis-${index}`}>Diagnóstico final</Label>
              <Select
                value={fileItem.finalDiagnosisId != null ? String(fileItem.finalDiagnosisId) : ''}
                onValueChange={val => {
                  if (!val) return;
                  updateFileFinalDiagnosis(index, Number(val));
                }}
                disabled={!finalDiagnoses.length}
              >
                <SelectTrigger id={`finalDiagnosis-${index}`} className="w-full">
                  <SelectValue placeholder="Selecciona diagnóstico final" />
                </SelectTrigger>
                <SelectContent>
                  {finalDiagnoses.map(fd => (
                    <SelectItem key={fd.id} value={String(fd.id)}>
                      {fd.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Comentario */}
        <div>
          <Label htmlFor={`comment-${index}`}>Comentario</Label>
          <textarea
            id={`comment-${index}`}
            className="w-full border rounded p-2"
            rows={2}
            placeholder="Comentario opcional"
            value={fileItem.comment || ''}
            onChange={e => updateFileComment(index, e.target.value)}
          />
        </div>

        {/* Listo */}
        <div className="flex items-center gap-2">
          <input
            id={`ready-${index}`}
            type="checkbox"
            checked={fileItem.isReady || false}
            onChange={e => updateFileReady(index, e.target.checked)}
          />
          <Label htmlFor={`ready-${index}`}>Listo</Label>
        </div>
      </div>
    </div>
  );
};