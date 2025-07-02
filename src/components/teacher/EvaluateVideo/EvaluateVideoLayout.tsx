import VideoSection from './VideoSection/VideoSection';
import AttemptsPanel from './AttemptsPanel';
import GraderPanel from './GraderPanel';
import { Attempt } from '../../../types/attempt';
import { ProtocolRubric } from '../../../utils/rubrics/rubrics';
import { Interaction } from '../../../types/interaction';
import { TeacherSelectionPayload } from '../../../types/Props/Video/TeacherSelectionPayload';
import { StudyWithStatus } from '../../../types/Study';
import { Video } from '../../../types/VideoTypes';

interface Props {
    url: string;
    videoRef: React.RefObject<HTMLVideoElement>;
    isPlaying: boolean;
    togglePlay: () => void;
    progress: number;
    handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isFullscreen: boolean;
    toggleFullscreen: () => void;
    meta: Video;
    currentStudy?: StudyWithStatus;
    interactions: Interaction[];
    teacherSelection: TeacherSelectionPayload;
    setTeacherSelection: React.Dispatch<React.SetStateAction<TeacherSelectionPayload>>;
    loadWindows: (protocolKey: string) => void;
    loadFindings: (protocolKey: string, windowId: number) => void;
    loadDiagnoses: (protocolKey: string, windowId: number, findingId: number) => void;
    loadSubdiagnoses: (protocolKey: string, diagnosisId: number) => void;
    loadSubSubs: (protocolKey: string, subId: number) => void;
    loadThirdOrders: (protocolKey: string, subSubId: number) => void;
    loadImageQualities: () => void;
    loadFinalDiagnoses: () => void;
    onSendInteraction: () => void;
    attempts: Attempt[];
    rubric: ProtocolRubric;
    responses: Record<string, number>;
    updateScore: (itemKey: string, score: number) => void;
    professorComment: string;
    setProfessorComment: (v: string) => void;
    onSaveAttempt: () => void;
}

export default function EvaluateVideoLayout({
    url,
    videoRef,
    isPlaying,
    togglePlay,
    progress,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
    meta,
    currentStudy,
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
    onSendInteraction,
    attempts,
    rubric,
    responses,
    updateScore,
    professorComment,
    setProfessorComment,
    onSaveAttempt,
}: Props) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Evaluación de Video - {rubric.name}
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
                            onSendInteraction={onSendInteraction}
                        />
                    </div>
                </div>
                <AttemptsPanel attempts={attempts} />
                <div className="w-full md:w-96 flex-shrink-0">
                    <GraderPanel
                        rubric={rubric}
                        responses={responses}
                        onChange={updateScore}
                        comment={professorComment}
                        onCommentChange={setProfessorComment}
                        onSave={onSaveAttempt}
                    />
                </div>
            </div>
        </div>
    );
} 