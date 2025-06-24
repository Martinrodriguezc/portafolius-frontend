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
  fileItem: any
  index: number
  protocolOptions: { protocols: ProtocolOption[] }
  protocolFlow: {
    windows: WindowOption[]
    findings: FindingOption[]
    diagnoses: DiagnosisOption[]
    subdiagnoses: SubdiagnosisOption[]
    subSubs: SubSubOption[]
    thirdOrders: ThirdOrderOption[]
    imageQualities: ImageQualityOption[]
    finalDiagnoses: FinalDiagnosisOption[]
    loadWindows: (k: string) => void
    loadFindings: (k: string, id: number) => void
    loadDiagnoses: (k: string, w: number, f: number) => void
    loadSubdiagnoses: (k: string, d: number) => void
    loadSubSubs: (k: string, sd: number) => void
    loadThirdOrders: (k: string, ss: number) => void
    loadImageQualities: () => void
    loadFinalDiagnoses: () => void
  }
  updateFileProtocol: (idx: number, v: string) => void
  updateFileWindow: (idx: number, v: number) => void
  updateFileFinding: (idx: number, v: number) => void
  updateFileDiagnosis: (idx: number, v: number) => void
  updateFileSubdiagnosis: (idx: number, v: number) => void
  updateFileSubSub: (idx: number, v: number) => void
  updateFileThirdOrder: (idx: number, v: number) => void
  updateFileImageQuality: (idx: number, v: number) => void
  updateFileFinalDiagnosis: (idx: number, v: number) => void
}