import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchProtocolsRequest,
  createProtocolRequest,
  Protocol,
} from './request/protocolRequest'
import axios from 'axios'

export function useProtocolOptions() {
  const qc = useQueryClient()

  const {
    data: protocols = [],
    isLoading: loadingProtocols,
    error: protocolsError,
  } = useQuery<Protocol[], Error>({
    queryKey: ['protocols'],
    queryFn: fetchProtocolsRequest,
    staleTime: 5 * 60_000,
  })

  const mutation = useMutation<Protocol, Error, string>({
    mutationFn: createProtocolRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['protocols'] })
    },
  })

  const addProtocol = async (name: string): Promise<void> => {
    try {
      await mutation.mutateAsync(name)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        throw new Error('Ya existe ese protocolo')
      }
      throw new Error('Error creando protocolo')
    }
  }

  return {
    protocols,
    loadingProtocols,
    protocolsError,
    addProtocol,
    creating: mutation.status === 'pending',
    createError: mutation.error,
    reset: mutation.reset, 
  }
}