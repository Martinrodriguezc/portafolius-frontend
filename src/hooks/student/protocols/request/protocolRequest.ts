import axios from 'axios'
import { Protocol } from '../../../../types/protocolRequestProps'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

export const fetchProtocolsRequest = async (): Promise<Protocol[]> => {
  const { data } = await api.get<Protocol[]>('/protocols')
  return data
}

export const createProtocolRequest = async (
  payload: { key: string; name: string }
): Promise<Protocol> => {
  const { data } = await api.post<Protocol>('/protocols', payload)
  return data
}

export type { Protocol }