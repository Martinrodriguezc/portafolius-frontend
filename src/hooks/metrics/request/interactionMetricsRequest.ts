import axios from 'axios'

export interface InteractionMetrics {
  protocol: string
  count:    number
  tp:       number
  tn:       number
  fp:       number
  fn:       number
  iqGood:   number
  iqPoor:   number
  positive: number
  negative: number
}

export const fetchInteractionMetrics = async (
  studentId: number
): Promise<InteractionMetrics[]> => {
  const token = localStorage.getItem('auth_token') || ''
  const { data } = await axios.get<
    Array<Record<string, string>>
  >(
    `/metrics/${studentId}/interaction-metrics`,
    {
      baseURL: import.meta.env.VITE_API_URL,
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return data.map(row => ({
    protocol:  row.protocol,
    count:     Number(row.count),
    tp:        Number(row.tp),
    tn:        Number(row.tn),
    fp:        Number(row.fp),
    fn:        Number(row.fn),
    iqGood:    Number(row.iqGood),
    iqPoor:    Number(row.iqPoor),
    positive:  Number(row.positive),
    negative:  Number(row.negative),
  }))
}