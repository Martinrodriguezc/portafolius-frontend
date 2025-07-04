import { FileUploadRowTeacher } from "../FileUploadRowTeacher"
import { TeacherFeedbackCardProps } from "../../../../types/Props/Video/TeacherFeedbackCardProps"

export default function TeacherFeedbackCard({
  teacherSelection,
  setTeacherSelection,
  loadWindows: _lw,
  loadFindings: _lf,
  loadDiagnoses: _ld,
  loadSubdiagnoses: _lsd,
  loadSubSubs: _lss,
  loadThirdOrders: _lto,
  loadImageQualities: _liq,
  loadFinalDiagnoses: _lfd,
  onSendInteraction,
}: TeacherFeedbackCardProps) {
  const canSend =
    Boolean(teacherSelection.protocolKey) && Boolean(teacherSelection.isReady)

  return (
    <div className="space-y-4">
      <FileUploadRowTeacher
        fileItem={teacherSelection}
        index={0}
        removeFile={() => setTeacherSelection({} as any)}
        updateFileProtocol={(protocolKey) =>
          setTeacherSelection((p) => ({
            ...p,
            protocolKey,
            windowId: undefined,
            findingId: undefined,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }))
        }
        updateFileWindow={(windowId) =>
          setTeacherSelection((p) => ({
            ...p,
            windowId,
            findingId: undefined,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }))
        }
        updateFileFinding={(findingId) =>
          setTeacherSelection((p) => ({
            ...p,
            findingId,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }))
        }
        updateFileDiagnosis={(diagnosisId) =>
          setTeacherSelection((p) => ({
            ...p,
            diagnosisId,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }))
        }
        updateFileSubdiagnosis={(subdiagnosisId) =>
          setTeacherSelection((p) => ({
            ...p,
            subdiagnosisId,
            subSubId: undefined,
            thirdOrderId: undefined,
          }))
        }
        updateFileSubSub={(subSubId) =>
          setTeacherSelection((p) => ({
            ...p,
            subSubId,
            thirdOrderId: undefined,
          }))
        }
        updateFileThirdOrder={(thirdOrderId) =>
          setTeacherSelection((p) => ({ ...p, thirdOrderId }))
        }
        updateFileImageQuality={(imageQualityId) =>
          setTeacherSelection((p) => ({ ...p, imageQualityId }))
        }
        updateFileFinalDiagnosis={(finalDiagnosisId) =>
          setTeacherSelection((p) => ({ ...p, finalDiagnosisId }))
        }
        updateFileComment={(comment) =>
          setTeacherSelection((p) => ({ ...p, comment }))
        }
        updateFileReady={(isReady) =>
          setTeacherSelection((p) => ({ ...p, isReady }))
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