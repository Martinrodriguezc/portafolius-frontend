export interface Attempt {
  id: number
  submitted_at: string      
  total_score: number       
}

export interface ResponseItem {
  protocol_item_id: number  
  score: number             
}

export interface CreateAttemptResponse {
  attemptId: number
  submitted_at: string
}

export interface ListAttemptsResponse {
  attempts: Attempt[]
}

export type ListResponsesResponse = ResponseItem[]