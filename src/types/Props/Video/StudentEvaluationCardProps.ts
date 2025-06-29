export interface Interaction {
  id: number
  protocolKey?: string
  windowName?: string
  findingName?: string
  possibleDiagnosisName?: string
  subdiagnosisName?: string
  subSubName?: string
  thirdOrderName?: string
  role: string
  comment?: string
  professorComment?: string
}

export interface StudentEvaluationCardProps {
  interactions: Interaction[]
}