import { useState, useEffect, useCallback } from "react"
import {
  ProtocolOption,
  WindowOption,
  FindingOption,
  DiagnosisOption,
  SubdiagnosisOption,
  SubSubOption,
  ThirdOrderOption,
  ImageQualityOption,
  FinalDiagnosisOption,
} from "../../../types/protocol"
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
} from "./request/protocolRequests"

export function useProtocolFlow() {
  const [protocols, setProtocols] = useState<ProtocolOption[]>([])
  const [windows, setWindows] = useState<WindowOption[]>([])
  const [findings, setFindings] = useState<FindingOption[]>([])
  const [diagnoses, setDiagnoses] = useState<DiagnosisOption[]>([])
  const [subdiagnoses, setSubdiagnoses] = useState<SubdiagnosisOption[]>([])
  const [subSubs, setSubSubs] = useState<SubSubOption[]>([])
  const [thirdOrders, setThirdOrders] = useState<ThirdOrderOption[]>([])
  const [imageQualities, setImageQualities] = useState<ImageQualityOption[]>([])
  const [finalDiagnoses, setFinalDiagnoses] = useState<FinalDiagnosisOption[]>(
    []
  )

  useEffect(() => {
    fetchProtocols()
      .then((r) => setProtocols(Array.isArray(r.data) ? r.data : []))
      .catch((e) => console.error("Error fetching protocols:", e))
  }, [])

  const loadWindows = useCallback((protocolKey: string) => {
    setWindows([])
    setFindings([])
    setDiagnoses([])
    setSubdiagnoses([])
    setSubSubs([])
    setThirdOrders([])
    fetchWindows(protocolKey)
      .then((r) => setWindows(Array.isArray(r.data) ? r.data : []))
      .catch((e) => console.error("Error fetching windows:", e))
  }, [])

  const loadFindings = useCallback((protocolKey: string, windowId: number) => {
    setFindings([])
    setDiagnoses([])
    setSubdiagnoses([])
    setSubSubs([])
    setThirdOrders([])
    fetchFindings(protocolKey, windowId)
      .then((r) => setFindings(Array.isArray(r.data) ? r.data : []))
      .catch((e) => console.error("Error fetching findings:", e))
  }, [])

  const loadDiagnoses = useCallback(
    (protocolKey: string, windowId: number, findingId: number) => {
      setDiagnoses([])
      setSubdiagnoses([])
      setSubSubs([])
      setThirdOrders([])
      fetchDiagnoses(protocolKey, windowId, findingId)
        .then((r) => setDiagnoses(Array.isArray(r.data) ? r.data : []))
        .catch((e) => console.error("Error fetching diagnoses:", e))
    },
    []
  )

  const loadSubdiagnoses = useCallback(
    (protocolKey: string, diagnosisId: number) => {
      setSubdiagnoses([])
      setSubSubs([])
      setThirdOrders([])
      fetchSubdiagnoses(protocolKey, diagnosisId)
        .then((r) => setSubdiagnoses(Array.isArray(r.data) ? r.data : []))
        .catch((e) => console.error("Error fetching subdiagnoses:", e))
    },
    []
  )

  const loadSubSubs = useCallback((protocolKey: string, subId: number) => {
    setSubSubs([])
    setThirdOrders([])
    fetchSubSubs(protocolKey, subId)
      .then((r) => setSubSubs(Array.isArray(r.data) ? r.data : []))
      .catch((e) => console.error("Error fetching subSubs:", e))
  }, [])

  const loadThirdOrders = useCallback(
    (protocolKey: string, subSubId: number) => {
      setThirdOrders([])
      fetchThirdOrders(protocolKey, subSubId)
        .then((r) => setThirdOrders(Array.isArray(r.data) ? r.data : []))
        .catch((e) => console.error("Error fetching third orders:", e))
    },
    []
  )

  const loadImageQualities = useCallback(() => {
    fetchImageQualities()
      .then((r) => setImageQualities(Array.isArray(r.data) ? r.data : []))
      .catch((e) => console.error("Error fetching image qualities:", e))
  }, [])

  const loadFinalDiagnoses = useCallback(() => {
    fetchFinalDiagnoses()
      .then((r) => setFinalDiagnoses(Array.isArray(r.data) ? r.data : []))
      .catch((e) => console.error("Error fetching final diagnoses:", e))
  }, [])

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