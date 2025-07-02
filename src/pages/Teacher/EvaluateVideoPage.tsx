import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies";
import { useTeacherEvaluateVideo } from "../../hooks/teacher/evaluations/useTeacherEvaluateVideo/useTeacherEvaluateVideo";
import { useVideoSection } from "../../hooks/teacher/VideoSection/useVideoSection";
import { attemptService } from "../../hooks/teacher/attemptService/attemptService";
import { RUBRICS } from "../../utils/rubrics/rubrics";
import { Attempt } from "../../types/attempt";
import { ProfessorInteractionPayload } from "../../types/interaction";
import { useInteractions } from "../../hooks/teacher/interactions/useInteractions";
import EvaluateVideoLayout from "../../components/teacher/EvaluateVideo/EvaluateVideoLayout";
import LoadingState from "../../components/teacher/EvaluateVideo/LoadingState";
// import ErrorState from "../../components/teacher/EvaluateVideo/ErrorState";

export default function EvaluateVideoPage() {
  const { clipId } = useParams<{ clipId: string }>();
  const {
    url,
    videoRef,
    isPlaying,
    togglePlay,
    progress,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
    meta,
    protocol,
    responses,
    updateScore,
  } = useTeacherEvaluateVideo();

  const {
    interactions,
    load: loadInteractions,
    send: sendInteraction,
  } = useInteractions(Number(meta?.id));

  const videoSection = useVideoSection(meta?.id ?? 0);
  const { pending, completed } = useAllStudies();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [professorComment, setProfessorComment] = useState("");

  useEffect(() => {
    if (!meta?.id) return;
    attemptService.list(meta.id).then(setAttempts).catch(console.error);
    loadInteractions();
    // eslint-disable-next-line
  }, [meta?.id]);

  const allStudies = [...pending, ...completed];
  const currentStudy = meta
    ? allStudies.find((s) => s.study_id === meta.study_id)
    : undefined;

  const handleSaveAttempt = async () => {
    try {
      await attemptService.create(Number(meta!.id), {
        protocolKey: protocol!.key,
        responses,
        ...(professorComment.trim() && { comment: professorComment.trim() }),
      });
      alert("Evaluación guardada correctamente");
      attemptService.list(meta!.id).then(setAttempts);
    } catch (err) {
      console.error(err);
      alert("Error al guardar la evaluación");
    }
  };

  const handleSendInteraction = async () => {
    try {
      const payload: ProfessorInteractionPayload = {
        protocolKey: videoSection.teacherSelection.protocolKey,
        windowId: videoSection.teacherSelection.windowId,
        findingId: videoSection.teacherSelection.findingId,
        diagnosisId: videoSection.teacherSelection.diagnosisId,
        subdiagnosisId: videoSection.teacherSelection.subdiagnosisId,
        subSubId: videoSection.teacherSelection.subSubId,
        thirdOrderId: videoSection.teacherSelection.thirdOrderId,
        imageQualityId: videoSection.teacherSelection.imageQualityId,
        finalDiagnosisId: videoSection.teacherSelection.finalDiagnosisId,
        professorComment: videoSection.teacherSelection.comment?.trim() || undefined,
        isReady: videoSection.teacherSelection.isReady,
      };
      await sendInteraction(payload);
      alert("Feedback enviado al estudiante");
      loadInteractions();
    } catch (err) {
      console.error(err);
      alert("Error al enviar feedback");
    }
  };

  if (!protocol || !meta) return <LoadingState />;

  return (
    <EvaluateVideoLayout
      url={url}
      videoRef={videoRef as React.RefObject<HTMLVideoElement>}
      isPlaying={isPlaying}
      togglePlay={togglePlay}
      progress={progress}
      handleSeek={handleSeek}
      isFullscreen={isFullscreen}
      toggleFullscreen={toggleFullscreen}
      meta={meta}
      currentStudy={currentStudy}
      interactions={interactions}
      teacherSelection={videoSection.teacherSelection}
      setTeacherSelection={videoSection.setTeacherSelection}
      loadWindows={videoSection.loadWindows}
      loadFindings={videoSection.loadFindings}
      loadDiagnoses={videoSection.loadDiagnoses}
      loadSubdiagnoses={videoSection.loadSubdiagnoses}
      loadSubSubs={videoSection.loadSubSubs}
      loadThirdOrders={videoSection.loadThirdOrders}
      loadImageQualities={videoSection.loadImageQualities}
      loadFinalDiagnoses={videoSection.loadFinalDiagnoses}
      onSendInteraction={handleSendInteraction}
      attempts={attempts}
      rubric={RUBRICS[protocol.key]}
      responses={responses.reduce(
        (acc, { itemKey, score }) => {
          acc[itemKey] = score;
          return acc;
        },
        {} as Record<string, number>
      )}
      updateScore={updateScore}
      professorComment={professorComment}
      setProfessorComment={setProfessorComment}
      onSaveAttempt={handleSaveAttempt}
    />
  );
}