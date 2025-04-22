import { useEffect, useState } from 'react'
import { config } from '../../config/config'

export interface Evaluation {
  id: number
  student: string
  protocol: string
  videos: number
  tags: string[]
  date: string
  score?: number
}

export function useTeacherEvaluations(teacherId: number) {
  const [pending, setPending]       = useState<Evaluation[]>([])
  const [completed, setCompleted]   = useState<Evaluation[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string>('')

  useEffect(() => {
    ;(async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${config.SERVER_URL}/teacher/${teacherId}/evaluations/pending`),
          fetch(`${config.SERVER_URL}/teacher/${teacherId}/evaluations/completed`)
        ])
        if (!pRes.ok) throw new Error(`Error ${pRes.status}`)
        if (!cRes.ok) throw new Error(`Error ${cRes.status}`)
        const { pending }   = await pRes.json()
        const { completed } = await cRes.json()
        setPending(pending)
        setCompleted(completed)
      } catch (e: any) {
        setError(e.message || 'Error loading evaluations')
      } finally {
        setLoading(false)
      }
    })()
  }, [teacherId])

  return { pending, completed, loading, error }
}