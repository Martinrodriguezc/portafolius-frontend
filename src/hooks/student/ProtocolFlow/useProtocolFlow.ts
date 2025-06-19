import { useState, useEffect } from 'react';
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
} from '../../../types/protocol';
import {
  fetchProtocols,
  fetchWindows,
  fetchFindings,
  fetchDiagnoses,
  fetchSubdiagnoses,
  fetchSubSubs,
  fetchThirdOrders,
  saveSelection,
  fetchSelection,
  fetchImageQualities,
  fetchFinalDiagnoses
} from './request/protocolRequests';

export function useProtocolFlow(clipId: number) {
  const [protocols, setProtocols] = useState<ProtocolOption[]>([]);
  const [windows, setWindows]   = useState<WindowOption[]>([]);
  const [findings, setFindings] = useState<FindingOption[]>([]);
  const [diagnoses, setDiagnoses] = useState<DiagnosisOption[]>([]);
  const [subdiagnoses, setSubdiagnoses] = useState<SubdiagnosisOption[]>([]);
  const [subSubs, setSubSubs] = useState<SubSubOption[]>([]);
  const [thirdOrders, setThirdOrders] = useState<ThirdOrderOption[]>([]);
  const [imageQualities, setImageQualities] = useState<ImageQualityOption[]>([]);
  const [finalDiagnoses, setFinalDiagnoses] = useState<FinalDiagnosisOption[]>([]);
  const [selection, setSelection] = useState<any>(null);

  // Carga inicial de protocolos
  useEffect(() => {
    fetchProtocols()
      .then(res => setProtocols(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  }, []);

  // Loaders dinámicos existentes
  const loadWindows = (protocolKey: string) => {
    setWindows([]); setFindings([]); setDiagnoses([]);
    setSubdiagnoses([]); setSubSubs([]); setThirdOrders([]);
    fetchWindows(protocolKey)
      .then(res => setWindows(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  const loadFindings = (protocolKey: string, windowId: number) => {
    setFindings([]); setDiagnoses([]); setSubdiagnoses([]); setSubSubs([]); setThirdOrders([]);
    fetchFindings(protocolKey, windowId)
      .then(res => setFindings(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  const loadDiagnoses = (protocolKey: string, windowId: number, findingId: number) => {
    setDiagnoses([]); setSubdiagnoses([]); setSubSubs([]); setThirdOrders([]);
    fetchDiagnoses(protocolKey, windowId, findingId)
      .then(res => setDiagnoses(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  const loadSubdiagnoses = (protocolKey: string, diagnosisId: number) => {
    setSubdiagnoses([]); setSubSubs([]); setThirdOrders([]);
    fetchSubdiagnoses(protocolKey, diagnosisId)
      .then(res => setSubdiagnoses(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err));
  };

  const loadSubSubs = (protocolKey: string, subId: number) => {
    setSubSubs([]); setThirdOrders([]);
    fetchSubSubs(protocolKey, subId)
      .then(res => setSubSubs(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  const loadThirdOrders = (protocolKey: string, subSubId: number) => {
    setThirdOrders([]);
    fetchThirdOrders(protocolKey, subSubId)
      .then(res => setThirdOrders(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  // **Nuevos loaders**
  const loadImageQualities = () => {
    fetchImageQualities()
      .then(res => setImageQualities(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  const loadFinalDiagnoses = () => {
    fetchFinalDiagnoses()
      .then(res => setFinalDiagnoses(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  // Selección guardada
  const saveClipSelection = (payload: any) =>
    saveSelection(clipId, payload).then(res => setSelection(res.data));

  const getClipSelection = () =>
    fetchSelection(clipId).then(res => setSelection(res.data)).catch(console.error);

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
    selection,
    loadWindows,
    loadFindings,
    loadDiagnoses,
    loadSubdiagnoses,
    loadSubSubs,
    loadThirdOrders,
    loadImageQualities,
    loadFinalDiagnoses,
    saveClipSelection,
    getClipSelection,
  };
}