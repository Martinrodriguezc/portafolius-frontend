import { useState, useCallback } from 'react'
import {
  postStudentInteraction,
  postProfessorInteraction,
  fetchInteractions
} from './interactionsRequests/interactionRequest'
import {
  Interaction,
  StudentInteractionPayload,
  ProfessorInteractionPayload
} from '../../types/interaction'

export function useInteractions() {
  const [interactions, setInteractions] = useState<Interaction[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loadInteractions = useCallback(async (clipId: number) => {
    setLoading(true)
    setError(null)
    try {
      const data: Interaction[] = await fetchInteractions(clipId)
      setInteractions(data)
    } catch (err: unknown) {
      let msg: string
      if (err instanceof Error) {
        msg = err.message
      } else {
        msg = String(err)
      }
      setError(msg || 'Error al cargar interacciones')
    } finally {
      setLoading(false)
    }
  }, [])

  const createStudent = async (
    clipId: number,
    payload: StudentInteractionPayload
  ): Promise<Interaction> => {
    setError(null)
    try {
      const interaction: Interaction = await postStudentInteraction(clipId, payload)
      setInteractions(prev => [...prev, interaction])
      return interaction
    } catch (err: unknown) {
      let msg: string
      if (err instanceof Error) {
        msg = err.message
      } else {
        msg = String(err)
      }
      setError(msg || 'Error al enviar interacción de estudiante')
      throw err
    }
  }

  const createProfessor = async (
    clipId: number,
    payload: ProfessorInteractionPayload
  ): Promise<Interaction> => {
    setError(null)
    try {
      const interaction: Interaction = await postProfessorInteraction(clipId, payload)
      setInteractions(prev => [...prev, interaction])
      return interaction
    } catch (err: unknown) {
      let msg: string
      if (err instanceof Error) {
        msg = err.message
      } else {
        msg = String(err)
      }
      setError(msg || 'Error al enviar interacción de profesor')
      throw err
    }
  }

  return {
    interactions,
    loading,
    error,
    loadInteractions,
    createStudent,
    createProfessor,
    createInteraction: createStudent,
  }
}