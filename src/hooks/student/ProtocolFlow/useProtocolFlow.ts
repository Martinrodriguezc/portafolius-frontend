import { useState, useEffect } from 'react'
import {
  ProtocolOption,
  WindowOption,
  FindingOption,
  DiagnosisOption,
  SubdiagnosisOption,
  SubSubOption,
  ThirdOrderOption,
  ImageQualityOption,
  FinalDiagnosisOption
} from '../../../types/protocol'
import {
  fetchProtocols,
  fetchWindows,
  fetchFindings,
  fetchDiagnoses,
  fetchSubdiagnoses,
  fetchSubSubs,
  fetchThirdOrders,
  fetchImageQualities,
  fetchFinalDiagnoses,
} from './request/protocolRequests'

export function useProtocolFlow() {
  const [protocols, setProtocols] = useState<ProtocolOption[]>([])
  const [windows, setWindows] = useState<WindowOption[]>([])
  const [findings, setFindings] = useState<FindingOption[]>([])
  const [diagnoses, setDiagnoses] = useState<DiagnosisOption[]>([])
  const [subdiagnoses, setSubdiagnoses] = useState<SubdiagnosisOption[]>([])
  const [subSubs, setSubSubs] = useState<SubSubOption[]>([])
  const [thirdOrders, setThirdOrders] = useState<ThirdOrderOption[]>([])
  const [imageQualities, setImageQualities] = useState<ImageQualityOption[]>([])
  const [finalDiagnoses, setFinalDiagnoses] = useState<FinalDiagnosisOption[]>([])

  useEffect(() => {
    fetchProtocols()
      .then(res => {
        const data = res.data
        setProtocols(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Error fetching protocols:', err)
      })
  }, [])

  const loadWindows = (protocolKey: string) => {
    setWindows([])
    setFindings([])
    setDiagnoses([])
    setSubdiagnoses([])
    setSubSubs([])
    setThirdOrders([])
    fetchWindows(protocolKey)
      .then(res => {
        const data = res.data
        setWindows(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Error fetching windows:', err)
      })
  }

  const loadFindings = (protocolKey: string, windowId: number) => {
    setFindings([])
    setDiagnoses([])
    setSubdiagnoses([])
    setSubSubs([])
    setThirdOrders([])
    fetchFindings(protocolKey, windowId)
      .then(res => {
        const data = res.data
        setFindings(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Error fetching findings:', err)
      })
  }

  const loadDiagnoses = (protocolKey: string, windowId: number, findingId: number) => {
    setDiagnoses([])
    setSubdiagnoses([])
    setSubSubs([])
    setThirdOrders([])
    fetchDiagnoses(protocolKey, windowId, findingId)
      .then(res => {
        const data = res.data
        setDiagnoses(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Error fetching diagnoses:', err)
      })
  }

  const loadSubdiagnoses = (protocolKey: string, diagnosisId: number) => {
    setSubdiagnoses([])
    setSubSubs([])
    setThirdOrders([])
    fetchSubdiagnoses(protocolKey, diagnosisId)
      .then(res => {
        const data = res.data
        setSubdiagnoses(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Error fetching subdiagnoses:', err)
      })
  }

  const loadSubSubs = (protocolKey: string, subId: number) => {
    setSubSubs([])
    setThirdOrders([])
    fetchSubSubs(protocolKey, subId)
      .then(res => {
        const data = res.data
        setSubSubs(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Error fetching sub-subs:', err)
      })
  }

  const loadThirdOrders = (protocolKey: string, subSubId: number) => {
    setThirdOrders([])
    fetchThirdOrders(protocolKey, subSubId)
      .then(res => {
        const data = res.data
        setThirdOrders(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Error fetching third orders:', err)
      })
  }

  const loadImageQualities = () => {
    fetchImageQualities()
      .then(res => {
        const data = res.data
        setImageQualities(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Error fetching image qualities:', err)
      })
  }

  const loadFinalDiagnoses = () => {
    fetchFinalDiagnoses()
      .then(res => {
        const data = res.data
        setFinalDiagnoses(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Error fetching final diagnoses:', err)
      })
  }

  return {
    protocols,
    windows,
    findings,
    diagnoses,
    subdiagnoses,
    subSubs,
    thirdOrders,
    imageQualities,
    finalDiagnoses,
    loadWindows,
    loadFindings,
    loadDiagnoses,
    loadSubdiagnoses,
    loadSubSubs,
    loadThirdOrders,
    loadImageQualities,
    loadFinalDiagnoses,
  }
}