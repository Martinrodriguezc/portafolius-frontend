import { FileUploadRowTeacher } from "../FileUploadRowTeacher";
import { TeacherSelectionPayload } from "../../../../types/Props/Video/TeacherSelectionPayload";

interface Props {
  teacherSelection: TeacherSelectionPayload;
  setTeacherSelection: React.Dispatch<
    React.SetStateAction<TeacherSelectionPayload>
  >;

  loadWindows: (protocolKey: string) => void;
  loadFindings: (protocolKey: string, windowId: number) => void;
  loadDiagnoses: (
    protocolKey: string,
    windowId: number,
    findingId: number,
  ) => void;
  loadSubdiagnoses: (protocolKey: string, diagnosisId: number) => void;
  loadSubSubs: (protocolKey: string, subId: number) => void;
  loadThirdOrders: (protocolKey: string, subSubId: number) => void;
  loadImageQualities: () => void;
  loadFinalDiagnoses: () => void;

  onSendInteraction: () => void;
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

  const canSend = Boolean(teacherSelection.protocolKey && teacherSelection.isReady);

  return (
    <div className="space-y-4">
      <FileUploadRowTeacher
        fileItem={teacherSelection}
        index={0}
        removeFile={() => setTeacherSelection({})}
        updateFileProtocol={(_, protocolKey) => {
          setTeacherSelection((prev) => {
            const next = {
              ...prev,
              protocolKey,
              windowId: undefined,
              findingId: undefined,
              diagnosisId: undefined,
              subdiagnosisId: undefined,
              subSubId: undefined,
              thirdOrderId: undefined,
            };
            loadWindows(protocolKey);
            loadImageQualities();
            loadFinalDiagnoses();
            return next;
          });
        }}
        updateFileWindow={(windowId) => {
          setTeacherSelection((prev) => {
            const next = {
              ...prev,
              windowId,
              findingId: undefined,
              diagnosisId: undefined,
              subdiagnosisId: undefined,
              subSubId: undefined,
              thirdOrderId: undefined,
            };
            if (next.protocolKey) {
              loadFindings(next.protocolKey, windowId);
            }
            return next;
          });
        }}
        updateFileFinding={(findingId) => {
          setTeacherSelection((prev) => {
            const next = {
              ...prev,
              findingId,
              diagnosisId: undefined,
              subdiagnosisId: undefined,
              subSubId: undefined,
              thirdOrderId: undefined,
            };
            if (next.protocolKey && next.windowId != null) {
              loadDiagnoses(next.protocolKey, next.windowId, findingId);
            }
            return next;
          });
        }}
        updateFileDiagnosis={(_, diagnosisId) => {
          setTeacherSelection((prev) => {
            const next = {
              ...prev,
              diagnosisId,
              subdiagnosisId: undefined,
              subSubId: undefined,
              thirdOrderId: undefined,
            };
            if (
              next.protocolKey &&
              next.windowId != null &&
              next.findingId != null
            ) {
              loadSubdiagnoses(next.protocolKey, diagnosisId);
            }
            return next;
          });
        }}
        updateFileSubdiagnosis={(subdiagnosisId) => {
          setTeacherSelection((prev) => {
            const next = {
              ...prev,
              subdiagnosisId,
              subSubId: undefined,
              thirdOrderId: undefined,
            };
            if (
              next.protocolKey &&
              next.windowId != null &&
              next.findingId != null &&
              next.diagnosisId != null
            ) {
              loadSubSubs(next.protocolKey, subdiagnosisId);
            }
            return next;
          });
        }}
        updateFileSubSub={(subSubId) => {
          setTeacherSelection((prev) => {
            const next = {
              ...prev,
              subSubId,
              thirdOrderId: undefined,
            };
            if (
              next.protocolKey &&
              next.windowId != null &&
              next.findingId != null &&
              next.diagnosisId != null &&
              next.subdiagnosisId != null
            ) {
              loadThirdOrders(next.protocolKey, subSubId);
            }
            return next;
          });
        }}
        updateFileThirdOrder={(thirdOrderId) =>
          setTeacherSelection((prev) => ({ ...prev, thirdOrderId }))
        }
        updateFileImageQuality={(_, imageQualityId) =>
          setTeacherSelection((prev) => ({ ...prev, imageQualityId }))
        }
        updateFileFinalDiagnosis={(_, finalDiagnosisId) =>
          setTeacherSelection((prev) => ({ ...prev, finalDiagnosisId }))
        }
        updateFileComment={(_, comment) =>
          setTeacherSelection((prev) => ({ ...prev, comment }))
        }
        updateFileReady={(_, isReady) =>
          setTeacherSelection((prev) => ({ ...prev, isReady }))
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
  );
}