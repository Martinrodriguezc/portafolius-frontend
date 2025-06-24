import { FileUploadRowTeacher } from '../FileUploadRowTeacher';
import { TeacherSelectionPayload } from '../../../../types/Props/Video/TeacherSelectionPayload';

interface Props {
  teacherSelection: TeacherSelectionPayload;
  setTeacherSelection: React.Dispatch<React.SetStateAction<TeacherSelectionPayload>>;
  loadWindows: (protocolKey: string) => void;
  loadFindings: (protocolKey: string, windowId: number) => void;
  loadDiagnoses: (protocolKey: string, windowId: number, findingId: number) => void;
  loadSubdiagnoses: (protocolKey: string, diagnosisId: number) => void;
  loadSubSubs: (protocolKey: string, subId: number) => void;
  loadThirdOrders: (protocolKey: string, subSubId: number) => void;
  loadImageQualities: () => void;
  loadFinalDiagnoses: () => void;
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
}: Props) {
  return (
    <FileUploadRowTeacher
      fileItem={teacherSelection}
      index={0}
      removeFile={() => setTeacherSelection({})}
      updateFileProtocol={(_, protocolKey) => {
        setTeacherSelection(prev => {
          const newSelection = {
            ...prev,
            protocolKey,
            windowId: undefined,
            findingId: undefined,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          };
          // Cargar ventanas, calidades, diagnósticos finales (si aplica)
          loadWindows(protocolKey);
          loadImageQualities();
          loadFinalDiagnoses();
          return newSelection;
        });
      }}
      updateFileWindow={(windowId) => {
        setTeacherSelection(prev => {
          const newSelection = {
            ...prev,
            windowId,
            findingId: undefined,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          };
          if (newSelection.protocolKey) {
            loadFindings(newSelection.protocolKey, windowId);
          }
          return newSelection;
        });
      }}
      updateFileFinding={(findingId) => {
        setTeacherSelection(prev => {
          const newSelection = {
            ...prev,
            findingId,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          };
          if (
            newSelection.protocolKey &&
            newSelection.windowId != null
          ) {
            loadDiagnoses(
              newSelection.protocolKey,
              newSelection.windowId,
              findingId
            );
          }
          return newSelection;
        });
      }}
      updateFileDiagnosis={(_, diagnosisId) => {
        setTeacherSelection(prev => {
          const newSelection = {
            ...prev,
            diagnosisId,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          };
          if (
            newSelection.protocolKey &&
            newSelection.windowId != null &&
            newSelection.findingId != null
          ) {
            loadSubdiagnoses(
              newSelection.protocolKey,
              diagnosisId
            );
          }
          return newSelection;
        });
      }}
      updateFileSubdiagnosis={(subdiagnosisId) => {
        setTeacherSelection(prev => {
          const newSelection = {
            ...prev,
            subdiagnosisId,
            subSubId: undefined,
            thirdOrderId: undefined,
          };
          if (
            newSelection.protocolKey &&
            newSelection.windowId != null &&
            newSelection.findingId != null &&
            newSelection.diagnosisId != null
          ) {
            loadSubSubs(
              newSelection.protocolKey,
              subdiagnosisId
            );
          }
          return newSelection;
        });
      }}
      updateFileSubSub={(subSubId) => {
        setTeacherSelection(prev => {
          const newSelection = {
            ...prev,
            subSubId,
            thirdOrderId: undefined,
          };
          if (
            newSelection.protocolKey &&
            newSelection.windowId != null &&
            newSelection.findingId != null &&
            newSelection.diagnosisId != null &&
            newSelection.subdiagnosisId != null
          ) {
            loadThirdOrders(
              newSelection.protocolKey,
              subSubId
            );
          }
          return newSelection;
        });
      }}
      updateFileThirdOrder={(thirdOrderId) => {
        setTeacherSelection(prev => ({
          ...prev,
          thirdOrderId,
        }));
      }}
      updateFileImageQuality={(_, imageQualityId) => {
        setTeacherSelection(prev => ({
          ...prev,
          imageQualityId,
        }));
      }}
      updateFileFinalDiagnosis={(_, finalDiagnosisId) => {
        setTeacherSelection(prev => ({
          ...prev,
          finalDiagnosisId,
        }));
      }}
      updateFileComment={(_, comment) => {
        setTeacherSelection(prev => ({
          ...prev,
          comment,
        }));
      }}
      updateFileReady={(_, isReady) => {
        setTeacherSelection(prev => ({
          ...prev,
          isReady,
        }));
      }}
    />
  );
}