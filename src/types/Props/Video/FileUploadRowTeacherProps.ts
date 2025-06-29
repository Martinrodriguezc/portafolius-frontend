import { TeacherSelectionPayload } from "./TeacherSelectionPayload"

export interface FileUploadRowTeacherProps {
  fileItem: TeacherSelectionPayload
  index: number
  removeFile: (idx: number) => void

  updateFileProtocol:       (protocolKey: string)    => void
  updateFileWindow:         (windowId: number)       => void
  updateFileFinding:        (findingId: number)      => void
  updateFileDiagnosis:      (diagnosisId: number)    => void
  updateFileSubdiagnosis:   (subdiagnosisId: number) => void
  updateFileSubSub:         (subSubId: number)       => void
  updateFileThirdOrder:     (thirdOrderId: number)   => void
  updateFileImageQuality:   (imageQualityId: number) => void
  updateFileFinalDiagnosis: (finalDiagnosisId: number) => void
  updateFileComment:        (comment?: string)       => void
  updateFileReady:          (isReady: boolean)       => void
}