import { useEffect, useState } from 'react';
import { useInteractions } from '../../../hooks/upload/useInteractions';
import { useProtocolFlow } from '../../../hooks/student/ProtocolFlow/useProtocolFlow';
import { TeacherSelectionPayload } from '../../../types/Props/Video/TeacherSelectionPayload';

export function useVideoSection(metaId: number | undefined) {
  const { interactions, loadInteractions } = useInteractions();
  const [teacherSelection, setTeacherSelection] = useState<TeacherSelectionPayload>({});
  const protocolFlow = useProtocolFlow();

  useEffect(() => {
    if (metaId) {
      loadInteractions(metaId);
    }
  }, [metaId, loadInteractions]);

  useEffect(() => {
    protocolFlow.loadImageQualities();
    protocolFlow.loadFinalDiagnoses();
  }, [protocolFlow.loadImageQualities, protocolFlow.loadFinalDiagnoses]);

  return {
    interactions,
    teacherSelection,
    setTeacherSelection,
    ...protocolFlow,
  };
}