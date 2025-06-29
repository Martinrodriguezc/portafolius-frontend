import React, { useEffect } from "react"
import Button from "../../common/Button/Button"
import { FileVideo, Trash2 } from "lucide-react"
import { useProtocolOptions } from "../../../hooks/student/protocols/useProtocolOptions"
import { useProtocolFlow } from "../../../hooks/student/ProtocolFlow/useProtocolFlow"
import { FileUploadRowTeacherProps } from "../../../types/Props/Video/FileUploadRowTeacherProps"
import { ProtocolSelectorTeacher }       from "./SelectorPages/ProtocolSelectorTeacher"
import { WindowSelectorTeacher }         from "./SelectorPages/WindowSelectorTeacher"
import { FindingSelectorTeacher }        from "./SelectorPages/FindingSelectorTeacher"
import { DiagnosisSelectorTeacher }      from "./SelectorPages/DiagnosisSelectorTeacher"
import { SubdiagnosisSelectorTeacher }   from "./SelectorPages/SubdiagnosisSelectorTeacher"
import { SubSubSelectorTeacher }         from "./SelectorPages/SubSubSelectorTeacher"
import { ThirdOrderSelectorTeacher }     from "./SelectorPages/ThirdOrderSelectorTeacher"
import { ImageQualitySelectorTeacher }   from "./SelectorPages/ImageQualitySelectorTeacher"
import { FinalDiagnosisSelectorTeacher } from "./SelectorPages/FinalDiagnosisSelectorTeacher"
import { CommentSectionTeacher }         from "./SelectorPages/CommentSectionTeacher"
import { ReadyCheckboxTeacher }          from "./SelectorPages/ReadyCheckboxTeacher"

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
  const { protocols } = useProtocolOptions()
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
  } = useProtocolFlow()

  useEffect(() => {
    if (!fileItem.protocolKey) return
    loadWindows(fileItem.protocolKey)
    loadImageQualities()
    loadFinalDiagnoses()
  }, [fileItem.protocolKey])

  useEffect(() => {
    if (!fileItem.protocolKey || fileItem.windowId == null) return
    loadFindings(fileItem.protocolKey, fileItem.windowId)
  }, [fileItem.protocolKey, fileItem.windowId])

  useEffect(() => {
    if (
      !fileItem.protocolKey ||
      fileItem.windowId == null ||
      fileItem.findingId == null
    )
      return
    loadDiagnoses(fileItem.protocolKey, fileItem.windowId, fileItem.findingId)
  }, [fileItem.protocolKey, fileItem.windowId, fileItem.findingId])

  useEffect(() => {
    if (!fileItem.protocolKey || fileItem.diagnosisId == null) return
    loadSubdiagnoses(fileItem.protocolKey, fileItem.diagnosisId)
  }, [fileItem.protocolKey, fileItem.diagnosisId])

  useEffect(() => {
    if (!fileItem.protocolKey || fileItem.subdiagnosisId == null) return
    loadSubSubs(fileItem.protocolKey, fileItem.subdiagnosisId)
  }, [fileItem.protocolKey, fileItem.subdiagnosisId])

  useEffect(() => {
    if (!fileItem.protocolKey || fileItem.subSubId == null) return
    loadThirdOrders(fileItem.protocolKey, fileItem.subSubId)
  }, [fileItem.protocolKey, fileItem.subSubId])

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
        <ProtocolSelectorTeacher
          index={index}
          protocols={protocols}
          value={fileItem.protocolKey ?? ""}
          onChange={(val) => {
            updateFileProtocol(val)
            loadWindows(val)
            loadImageQualities()
            loadFinalDiagnoses()
          }}
        />

        {fileItem.protocolKey && (
          <>
            <WindowSelectorTeacher
              index={index}
              options={windows}
              value={fileItem.windowId}
              onChange={(win) => {
                updateFileWindow(win)
                loadFindings(fileItem.protocolKey!, win)
              }}
            />

            <FindingSelectorTeacher
              index={index}
              options={findings}
              value={fileItem.findingId}
              onChange={(f) => {
                updateFileFinding(f)
                loadDiagnoses(fileItem.protocolKey!, fileItem.windowId!, f)
              }}
            />

            <DiagnosisSelectorTeacher
              index={index}
              options={diagnoses}
              value={fileItem.diagnosisId}
              onChange={(d) => {
                updateFileDiagnosis(d)
                loadSubdiagnoses(fileItem.protocolKey!, d)
              }}
            />

            <SubdiagnosisSelectorTeacher
              index={index}
              options={subdiagnoses}
              value={fileItem.subdiagnosisId}
              onChange={(sd) => {
                updateFileSubdiagnosis(sd)
                loadSubSubs(fileItem.protocolKey!, sd)
              }}
            />

            <SubSubSelectorTeacher
              index={index}
              options={subSubs}
              value={fileItem.subSubId}
              onChange={(ss) => {
                updateFileSubSub(ss)
                loadThirdOrders(fileItem.protocolKey!, ss)
              }}
            />

            <ThirdOrderSelectorTeacher
              index={index}
              options={thirdOrders}
              value={fileItem.thirdOrderId}
              onChange={(to) => updateFileThirdOrder(to)}
            />

            <ImageQualitySelectorTeacher
              index={index}
              options={imageQualities}
              value={fileItem.imageQualityId}
              onChange={(val) => updateFileImageQuality(val)}
            />

            <FinalDiagnosisSelectorTeacher
              index={index}
              options={finalDiagnoses}
              value={fileItem.finalDiagnosisId}
              onChange={(val) => updateFileFinalDiagnosis(val)}
            />
          </>
        )}

        <CommentSectionTeacher
          index={index}
          value={fileItem.comment ?? ""}
          onChange={(val) => updateFileComment(val)}
        />

        <ReadyCheckboxTeacher
          index={index}
          checked={fileItem.isReady ?? false}
          onChange={(val) => updateFileReady(val)}
        />
      </div>
    </div>
  )
}