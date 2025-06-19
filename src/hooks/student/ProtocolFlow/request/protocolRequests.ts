import axios from 'axios'
import {
  ProtocolOption,
  WindowOption,
  FindingOption,
  DiagnosisOption,
  SubdiagnosisOption,
  SubSubOption,
  ThirdOrderOption,
  ImageQualityOption,
  FinalDiagnosisOption
} from '../../../../types/protocol'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

export const fetchProtocols = () =>
  api.get<ProtocolOption[]>('/protocols')

export const fetchWindows = (protocolKey: string) =>
  api.get<WindowOption[]>(`/protocols/${protocolKey}/windows`)

export const fetchFindings = (protocolKey: string, windowId: number) =>
  api.get<FindingOption[]>(
    `/protocols/${protocolKey}/windows/${windowId}/findings`
  )

export const fetchDiagnoses = (
  protocolKey: string,
  windowId: number,
  findingId: number
) =>
  api.get<DiagnosisOption[]>(
    `/protocols/${protocolKey}/windows/${windowId}/findings/${findingId}/diagnoses`
  )

export const fetchSubdiagnoses = (protocolKey: string, diagnosisId: number) =>
  api.get<SubdiagnosisOption[]>(
    `/protocols/${protocolKey}/diagnoses/${diagnosisId}/subdiagnoses`
  )

export const fetchSubSubs = (protocolKey: string, subId: number) =>
  api.get<SubSubOption[]>(
    `/protocols/${protocolKey}/subdiagnoses/${subId}/subsub`
  )

export const fetchThirdOrders = (protocolKey: string, subSubId: number) =>
  api.get<ThirdOrderOption[]>(
    `/protocols/${protocolKey}/subsub/${subSubId}/thirdorder`
  )

export const fetchImageQualities = () =>
  api.get<ImageQualityOption[]>('/protocols/image-qualities')

export const fetchFinalDiagnoses = () =>
  api.get<FinalDiagnosisOption[]>('/protocols/final-diagnoses')