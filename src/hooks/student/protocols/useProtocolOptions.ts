import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchProtocolsRequest,
  createProtocolRequest,
  Protocol,
} from './request/protocolRequest'

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

  return {
    protocols,
    loadingProtocols,
    protocolsError,
    createProtocol: mutation.mutateAsync,
    creating: mutation.status === 'pending',
    createError: mutation.error,
    reset: mutation.reset, 
  }
}