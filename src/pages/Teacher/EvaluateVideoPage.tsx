import { useState, useEffect } from "react";

import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies";
import { useTeacherEvaluateVideo } from "../../hooks/teacher/evaluations/useTeacherEvaluateVideo/useTeacherEvaluateVideo";
import { useVideoSection } from "../../hooks/teacher/VideoSection/useVideoSection";

import LoadingState from "../../components/teacher/EvaluateVideo/LoadingState";
import ErrorState from "../../components/teacher/EvaluateVideo/ErrorState";
import VideoSection from "../../components/teacher/EvaluateVideo/VideoSection/VideoSection";

import { RUBRICS } from "../../utils/rubrics/rubrics";
import { attemptService } from "../../hooks/teacher/attemptService/attemptService";
import { postProfessorInteraction } from "../../hooks/upload/interactionsRequests/interactionRequest";

import type { Attempt } from "../../types/attempt";
import type { ProfessorInteractionPayload } from "../../types/interaction";
import type {
  RubricLevel,
  RubricItem,
  RubricSection,
  ProtocolRubric,
} from "../../utils/rubrics/rubrics";

import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  Save,
  ArrowLeft,
  User,
  MessageSquare,
  History,
  Star,
  FileText,
  CalendarDays,
  Timer,
  Award,
  TrendingUp,
  Eye,
} from "lucide-react";

interface AttemptsPanelProps {
  attempts: Attempt[];
}

function AttemptsPanel({ attempts }: AttemptsPanelProps) {
  const MAX_SCORE = 29;

  const getScoreColor = (score: number) => {
    const pct = (score / MAX_SCORE) * 100;
    if (pct >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (pct >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    if (pct >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreIcon = (score: number) => {
    const pct = (score / MAX_SCORE) * 100;
    if (pct >= 90) return <Award className="w-4 h-4" />;
    if (pct >= 80) return <TrendingUp className="w-4 h-4" />;
    if (pct >= 70) return <Star className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Intentos Previos</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {attempts.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {attempts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No hay intentos previos</p>
          </div>
        ) : (
          <div className="space-y-3">
            {attempts.map((attempt) => {
              const submitted = new Date(attempt.submitted_at);
              const date = submitted.toLocaleDateString();
              const time = submitted.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={attempt.id}
                  className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`flex items-center gap-2 px-2 py-1 rounded-full border text-xs font-medium ${getScoreColor(
                        attempt.total_score
                      )}`}
                    >
                      {getScoreIcon(attempt.total_score)}
                      <span>
                        {attempt.total_score}/{MAX_SCORE}
                      </span>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      Completado
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3 h-3" />
                      <span>{date}</span>
                      <Timer className="w-3 h-3 ml-2" />
                      <span>{time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{attempt.evaluator_name}</span>
                    </div>
                  </div>

                  {attempt.comment && (
                    <div className="mt-2 bg-gray-50 rounded p-2">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-700">
                          {attempt.comment}
                        </p>
                      </div>
                    </div>
                  )}

                  <button className="w-full mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" />
                    Ver detalles
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface GraderPanelProps {
  rubric: ProtocolRubric;
  responses: Record<string, number>;
  onChange(itemKey: string, value: number): void;
  professorComment: string;
  setProfessorComment: (value: string) => void;
  onSave: () => void;
}

function ModernGraderPanel({
  rubric,
  responses,
  onChange,
  professorComment,
  setProfessorComment,
  onSave,
}: GraderPanelProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(rubric.sections.map((s) => [s.key, true]))
  );

  const toggleSection = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalScore = Object.values(responses).reduce((a, b) => a + b, 0);
  const percentage = Math.round(
    (totalScore / rubric.totalStudyMaxScore) * 100
  );

  return (
    <div className="bg-white h-full flex flex-col">
      {/* header con porcentaje */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Evaluación</h2>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Puntuación Total
            </span>
            <span className="text-sm text-gray-500">{percentage}%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {totalScore}
            </span>
            <span className="text-lg text-gray-500">
              / {rubric.totalStudyMaxScore}
            </span>
          </div>
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {rubric.sections.map((section: RubricSection) => (
            <div
              key={section.key}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <h3 className="font-semibold text-gray-900">{section.name}</h3>
                {openSections[section.key] ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {openSections[section.key] && (
                <div className="p-4">
                  <div className="space-y-4">
                    {section.items.map((item: RubricItem) => (
                      <div
                        key={item.key}
                        className="border border-gray-100 rounded-lg p-4"
                      >
                        <h4 className="font-medium text-gray-900 mb-3">
                          {item.label}
                        </h4>

                        <div className="grid grid-cols-1 gap-2">
                          {item.levels.map((level: RubricLevel) => {
                            const selected =
                              responses[item.key] === level.value;

                            return (
                              <button
                                key={level.value}
                                onClick={() =>
                                  onChange(item.key, level.value)
                                }
                                className={`p-3 rounded-lg border-2 transition-all text-left ${
                                  selected
                                    ? "border-blue-500 bg-blue-50 shadow-sm"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {selected ? (
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span
                                        className={`font-semibold ${
                                          selected
                                            ? "text-blue-900"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {level.value} puntos
                                      </span>
                                    </div>
                                    <p
                                      className={`text-sm ${
                                        selected
                                          ? "text-blue-700"
                                          : "text-gray-600"
                                      }`}
                                    >
                                      {level.longDescription}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 px-6">
        <h3 className="font-medium text-gray-700 mb-1">
          Comentarios para este intento
        </h3>
        <textarea
          value={professorComment}
          onChange={(e) => setProfessorComment(e.target.value)}
          placeholder="Escribe tus comentarios para el estudiante…"
          className="w-full border border-gray-300 rounded p-2 h-24 resize-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <button
          onClick={onSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Guardar Evaluación
        </button>
      </div>
    </div>
  );
}


export default function EvaluateVideoPage() {
  const {
    videoRef,
    url,
    meta,
    loading,
    error,
    protocol,
    responses,
    updateScore,
    isPlaying,
    togglePlay,
    progress,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
  } = useTeacherEvaluateVideo();

  const {
    interactions,
    teacherSelection,
    setTeacherSelection,
    loadWindows,
    loadFindings,
    loadDiagnoses,
    loadSubdiagnoses,
    loadSubSubs,
    loadThirdOrders,
    loadImageQualities,
    loadFinalDiagnoses,
  } = useVideoSection(meta?.id ?? 0);

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [professorComment, setProfessorComment] = useState("");

  useEffect(() => {
    if (!meta?.id) return;
    attemptService.list(meta.id).then(setAttempts).catch(console.error);
  }, [meta?.id]);

  const { pending, completed } = useAllStudies();
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
    } catch (err) {
      console.error(err);
      alert("Error al guardar la evaluación");
    }
  };

  const handleSendInteraction = async () => {
    try {
      const payload: ProfessorInteractionPayload = {
        protocolKey: teacherSelection.protocolKey,
        windowId: teacherSelection.windowId,
        findingId: teacherSelection.findingId,
        diagnosisId: teacherSelection.diagnosisId,
        subdiagnosisId: teacherSelection.subdiagnosisId,
        subSubId: teacherSelection.subSubId,
        thirdOrderId: teacherSelection.thirdOrderId,
        imageQualityId: teacherSelection.imageQualityId,
        finalDiagnosisId: teacherSelection.finalDiagnosisId,
        professorComment: teacherSelection.comment?.trim() || undefined,
        isReady: teacherSelection.isReady,
      };
      await postProfessorInteraction(Number(meta!.id), payload);
      alert("Feedback enviado al estudiante");
    } catch (err) {
      console.error(err);
      alert("Error al enviar feedback");
    }
  };

  if (loading || !meta) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!protocol) return <div className="p-8">Cargando protocolo…</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            Evaluación de Video - {protocol.name}
          </h1>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
        <div className="flex-1 bg-gray-50 flex flex-col min-h-0 overflow-y-auto">
          <div className="flex-1 flex justify-center">
            <VideoSection
              url={url}
              videoRef={videoRef}
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              progress={progress}
              handleSeek={handleSeek}
              isFullscreen={isFullscreen}
              toggleFullscreen={toggleFullscreen}
              meta={meta}
              currentStudy={currentStudy}
              interactions={interactions}
              teacherSelection={teacherSelection}
              setTeacherSelection={setTeacherSelection}
              loadWindows={loadWindows}
              loadFindings={loadFindings}
              loadDiagnoses={loadDiagnoses}
              loadSubdiagnoses={loadSubdiagnoses}
              loadSubSubs={loadSubSubs}
              loadThirdOrders={loadThirdOrders}
              loadImageQualities={loadImageQualities}
              loadFinalDiagnoses={loadFinalDiagnoses}
              onSendInteraction={handleSendInteraction}
            />
          </div>
        </div>

        <AttemptsPanel attempts={attempts} />

        <div className="w-full md:w-96 flex-shrink-0">
          <ModernGraderPanel
            rubric={RUBRICS[protocol.key]}
            responses={responses.reduce(
              (acc, { itemKey, score }) => {
                acc[itemKey] = score;
                return acc;
              },
              {} as Record<string, number>
            )}
            onChange={updateScore}
            professorComment={professorComment}
            setProfessorComment={setProfessorComment}
            onSave={handleSaveAttempt}
          />
        </div>
      </div>
    </div>
  );
}