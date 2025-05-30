
export type ScoreScale = '0-5' | 'binary'

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

