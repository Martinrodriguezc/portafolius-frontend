import { ProtocolOption,
         WindowOption,
         FindingOption,
         DiagnosisOption,
         SubdiagnosisOption,
         SubSubOption,
         ThirdOrderOption,
         ImageQualityOption,
         FinalDiagnosisOption } from "../../protocol"

export interface TeacherProtocolFieldsProps {
  fileItem: {
    protocolKey?: string;
    windowId?: number;
    findingId?: number;
    diagnosisId?: number;
    subdiagnosisId?: number;
    subSubId?: number;
    thirdOrderId?: number;
    imageQualityId?: number;
    finalDiagnosisId?: number;
  };
  index: number;
  protocolOptions: {
    protocols: ProtocolOption[];
  };
  protocolFlow: {
    windows: WindowOption[];
    findings: FindingOption[];
    diagnoses: DiagnosisOption[];
    subdiagnoses: SubdiagnosisOption[];
    subSubs: SubSubOption[];
    thirdOrders: ThirdOrderOption[];
    imageQualities: ImageQualityOption[];
    finalDiagnoses: FinalDiagnosisOption[];
    loadWindows: (protocolKey: string) => void;
    loadFindings: (protocolKey: string, windowId: number) => void;
    loadDiagnoses: (
      protocolKey: string,
      windowId: number,
      findingId: number
    ) => void;
    loadSubdiagnoses: (protocolKey: string, diagnosisId: number) => void;
    loadSubSubs: (protocolKey: string, subdiagnosisId: number) => void;
    loadThirdOrders: (protocolKey: string, subSubId: number) => void;
    loadImageQualities: () => void;
    loadFinalDiagnoses: () => void;
  };
  updateFileProtocol: (index: number, protocolKey: string) => void;
  updateFileWindow: (index: number, windowId: number) => void;
  updateFileFinding: (index: number, findingId: number) => void;
  updateFileDiagnosis: (index: number, diagnosisId: number) => void;
  updateFileSubdiagnosis: (index: number, subdiagnosisId: number) => void;
  updateFileSubSub: (index: number, subSubId: number) => void;
  updateFileThirdOrder: (index: number, thirdOrderId: number) => void;
  updateFileImageQuality: (index: number, imageQualityId: number) => void;
  updateFileFinalDiagnosis: (index: number, finalDiagnosisId: number) => void;
}