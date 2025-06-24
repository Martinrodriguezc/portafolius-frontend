import { FileUploadRowTeacher } from "../FileUploadRowTeacher"
import { TeacherSelectionPayload } from "../../../../types/Props/Video/TeacherSelectionPayload"

interface Props {
  teacherSelection: TeacherSelectionPayload
  setTeacherSelection: React.Dispatch<React.SetStateAction<TeacherSelectionPayload>>

  loadWindows:      (protocolKey: string) => void
  loadFindings:     (protocolKey: string, windowId: number) => void
  loadDiagnoses:    (protocolKey: string, windowId: number, findingId: number) => void
  loadSubdiagnoses: (protocolKey: string, diagnosisId: number) => void
  loadSubSubs:      (protocolKey: string, subId: number) => void
  loadThirdOrders:  (protocolKey: string, subSubId: number) => void
  loadImageQualities: () => void
  loadFinalDiagnoses: () => void

  onSendInteraction: () => void
}

export default function TeacherFeedbackCard({
  teacherSelection,
  setTeacherSelection,
  loadWindows,
  loadFindings,
  loadDiagnoses,
  loadSubdiagnoses,
  loadSubSubs,
  loadThirdOrders,
  loadImageQualities,
  loadFinalDiagnoses,
  onSendInteraction,
}: Props) {
  const canSend = Boolean(teacherSelection.protocolKey && teacherSelection.isReady)

  return (
    <div className="space-y-4">
      <FileUploadRowTeacher
        fileItem={teacherSelection}
        index={0}
        removeFile={() => setTeacherSelection({} as TeacherSelectionPayload)}

        updateFileProtocol={protocolKey => {
          setTeacherSelection(prev => ({
            ...prev,
            protocolKey,
            windowId: undefined,
            findingId: undefined,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }))
          loadWindows(protocolKey)
          loadImageQualities()
          loadFinalDiagnoses()
        }}

        updateFileWindow={windowId => {
          setTeacherSelection(prev => ({
            ...prev,
            windowId,
            findingId: undefined,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }))
          if (teacherSelection.protocolKey) loadFindings(teacherSelection.protocolKey, windowId)
        }}

        updateFileFinding={findingId => {
          setTeacherSelection(prev => ({
            ...prev,
            findingId,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }))
          if (teacherSelection.protocolKey && teacherSelection.windowId != null)
            loadDiagnoses(teacherSelection.protocolKey, teacherSelection.windowId, findingId)
        }}

        updateFileDiagnosis={diagnosisId => {
          setTeacherSelection(prev => ({
            ...prev,
            diagnosisId,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }))
          if (
            teacherSelection.protocolKey &&
            teacherSelection.windowId != null &&
            teacherSelection.findingId != null
          )
            loadSubdiagnoses(teacherSelection.protocolKey, diagnosisId)
        }}

        updateFileSubdiagnosis={subdiagnosisId => {
          setTeacherSelection(prev => ({
            ...prev,
            subdiagnosisId,
            subSubId: undefined,
            thirdOrderId: undefined,
          }))
          if (
            teacherSelection.protocolKey &&
            teacherSelection.windowId != null &&
            teacherSelection.findingId != null &&
            teacherSelection.diagnosisId != null
          )
            loadSubSubs(teacherSelection.protocolKey, subdiagnosisId)
        }}

        updateFileSubSub={subSubId => {
          setTeacherSelection(prev => ({
            ...prev,
            subSubId,
            thirdOrderId: undefined,
          }))
          if (
            teacherSelection.protocolKey &&
            teacherSelection.windowId != null &&
            teacherSelection.findingId != null &&
            teacherSelection.diagnosisId != null &&
            teacherSelection.subdiagnosisId != null
          )
            loadThirdOrders(teacherSelection.protocolKey, subSubId)
        }}

        updateFileThirdOrder={thirdOrderId =>
          setTeacherSelection(prev => ({ ...prev, thirdOrderId }))
        }

        updateFileImageQuality={imageQualityId =>
          setTeacherSelection(prev => ({ ...prev, imageQualityId }))
        }

        updateFileFinalDiagnosis={finalDiagnosisId =>
          setTeacherSelection(prev => ({ ...prev, finalDiagnosisId }))
        }

        updateFileComment={comment =>
          setTeacherSelection(prev => ({ ...prev, comment }))
        }

        updateFileReady={isReady =>
          setTeacherSelection(prev => ({ ...prev, isReady }))
        }
      />

      <div className="flex justify-end">
        <button
          onClick={onSendInteraction}
          disabled={!canSend}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            canSend
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Enviar feedback al estudiante
        </button>
      </div>
    </div>
  )
}