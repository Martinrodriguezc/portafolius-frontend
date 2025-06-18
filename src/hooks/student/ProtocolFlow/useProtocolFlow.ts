import { useState, useEffect } from 'react';
import {
  ProtocolOption,
  WindowOption,
  FindingOption,
  DiagnosisOption,
  SubdiagnosisOption,
  SubSubOption,
  ThirdOrderOption
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
  fetchSelection
} from './request/protocolRequests';

export function useProtocolFlow(clipId: number) {
  const [protocols, setProtocols] = useState<ProtocolOption[]>([]);
  const [windows, setWindows]   = useState<WindowOption[]>([]);
  const [findings, setFindings] = useState<FindingOption[]>([]);
  const [diagnoses, setDiagnoses] = useState<DiagnosisOption[]>([]);
  const [subdiagnoses, setSubdiagnoses] = useState<SubdiagnosisOption[]>([]);
  const [subSubs, setSubSubs] = useState<SubSubOption[]>([]);
  const [thirdOrders, setThirdOrders] = useState<ThirdOrderOption[]>([]);
  const [selection, setSelection] = useState<any>(null);

  useEffect(() => {
    fetchProtocols().then(res => setProtocols(Array.isArray(res.data) ? res.data : [])).catch(console.error);
  }, []);

  const loadWindows = (protocolKey: string) => {
    setWindows([]); setFindings([]); setDiagnoses([]);
    setSubdiagnoses([]); setSubSubs([]); setThirdOrders([]);
    fetchWindows(protocolKey).then(res => setWindows(Array.isArray(res.data) ? res.data : [])).catch(console.error);
  };

  const loadFindings = (protocolKey: string, windowId: number) => {
    setFindings([]); setDiagnoses([]); setSubdiagnoses([]); setSubSubs([]); setThirdOrders([]);
    fetchFindings(protocolKey, windowId).then(res => setFindings(Array.isArray(res.data) ? res.data : [])).catch(console.error);
  };

  const loadDiagnoses = (protocolKey: string, windowId: number, findingId: number) => {
    setDiagnoses([]); setSubdiagnoses([]); setSubSubs([]); setThirdOrders([]);
    fetchDiagnoses(protocolKey, windowId, findingId).then(res => setDiagnoses(Array.isArray(res.data) ? res.data : [])).catch(console.error);
  };

  const loadSubdiagnoses = (protocolKey: string, diagnosisId: number) => {
  setSubdiagnoses([]);
  setSubSubs([]);
  setThirdOrders([]);

  fetchSubdiagnoses(protocolKey, diagnosisId)
    .then(res => {
      const data = Array.isArray(res.data) ? res.data : [];
      console.log(`Subdiagnósticos cargados para diagnosisId=${diagnosisId}:`, data);
      setSubdiagnoses(data);
    })
    .catch(err => {
      console.error(`Error cargando subdiagnósticos para diagnosisId=${diagnosisId}:`, err);
    });
};

  const loadSubSubs = (protocolKey: string, subId: number) => {
    setSubSubs([]); setThirdOrders([]);
    fetchSubSubs(protocolKey, subId).then(res => setSubSubs(Array.isArray(res.data) ? res.data : [])).catch(console.error);
  };

  const loadThirdOrders = (protocolKey: string, subSubId: number) => {
    setThirdOrders([]);
    fetchThirdOrders(protocolKey, subSubId).then(res => setThirdOrders(Array.isArray(res.data) ? res.data : [])).catch(console.error);
  };

  const saveClipSelection = (payload: any) => {
    return saveSelection(clipId, payload).then(res => setSelection(res.data));
  };

  const getClipSelection = () => {
    fetchSelection(clipId).then(res => setSelection(res.data)).catch(console.error);
  };

  return {
    protocols,
    windows,
    findings,
    diagnoses,
    subdiagnoses,
    subSubs,
    thirdOrders,
    selection,
    loadWindows,
    loadFindings,
    loadDiagnoses,
    loadSubdiagnoses,
    loadSubSubs,
    loadThirdOrders,
    saveClipSelection,
    getClipSelection
  };
}
