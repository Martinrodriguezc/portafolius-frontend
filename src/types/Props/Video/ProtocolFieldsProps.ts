import { FileWithMetadata } from '../../File';
import {
  ProtocolOption,
  WindowOption,
  FindingOption,
  DiagnosisOption,
  SubdiagnosisOption,
  SubSubOption,
  ThirdOrderOption
} from '../../protocol';

export interface ProtocolFieldsProps {
  fileItem: FileWithMetadata;
  index: number;
  protocolOptions: { protocols: ProtocolOption[] };
  protocolFlow: {
    windows: WindowOption[];
    findings: FindingOption[];
    diagnoses: DiagnosisOption[];
    subdiagnoses: SubdiagnosisOption[];
    subSubs: SubSubOption[];
    thirdOrders: ThirdOrderOption[];
    loadWindows: (protocolKey: string) => void;
    loadFindings: (protocolKey: string, windowId: number) => void;
    loadDiagnoses: (protocolKey: string, windowId: number, findingId: number) => void;
    loadSubdiagnoses: (protocolKey: string, diagnosisId: number) => void;
    loadSubSubs: (protocolKey: string, subdiagnosisId: number) => void;
    loadThirdOrders: (protocolKey: string, subSubId: number) => void;
  };
  updateFileProtocol: (idx: number, protocolKey: string) => void;
  updateFileWindow: (idx: number, windowId: number) => void;
  updateFileFinding: (idx: number, findingId: number) => void;
  updateFileDiagnosis: (idx: number, diagnosisId: number) => void;
  updateFileSubdiagnosis: (idx: number, subdiagnosisId: number) => void;
  updateFileSubSub: (idx: number, subSubId: number) => void;
  updateFileThirdOrder: (idx: number, thirdOrderId: number) => void;
}