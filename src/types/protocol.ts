
export type ScoreScale = '0-5' | 'binary'

export interface ProtocolOption { id: number; key: string; name: string; }
export interface WindowOption   { id: number; key: string; name: string; }
export interface FindingOption  { id: number; key: string; name: string; }
export interface DiagnosisOption{ id: number; key: string; name: string; }
export interface SubdiagnosisOption { id: number; key: string; name: string; }
export interface SubSubOption   { id: number; key: string; name: string; }
export interface ThirdOrderOption { id: number; key: string; name: string; }
export interface ProtocolItem {
  key: string
  label: string
  score_scale: ScoreScale
  max_score: number
}

export interface ProtocolSection {
  key: string
  name: string
  items: ProtocolItem[]
}

export interface Protocol {
  key: string
  name: string
  sections: ProtocolSection[]
}

