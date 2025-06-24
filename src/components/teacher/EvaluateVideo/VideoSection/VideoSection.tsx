import Card from '../../../common/Card/Card';
import VideoPlayer from '../../../student/videos/VideoPlayer';
// now VideoSectionProps must include interactions, teacherSelection, setTeacherSelection, loadWindows, loadFindings, loadDiagnoses, loadSubdiagnoses, loadSubSubs, loadThirdOrders, loadImageQualities, loadFinalDiagnoses
import { VideoSectionProps } from '../../../../types/Props/Video/VideoSectionProps';
import VideoDetailsCard from './VideoDetailsCard';
import StudentEvaluationCard from './StudentEvaluationCard';
import TeacherFeedbackCard from './TeacherFeedbackCard';

export default function VideoSection({
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
}: VideoSectionProps) {
  return (
    <div className="w-full lg:w-2/3 space-y-6">
      <Card className="rounded-[16px] overflow-hidden border border-slate-200 shadow-sm">
        <VideoPlayer
          src={url}
          videoRef={videoRef}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          progress={progress}
          handleSeek={handleSeek}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
        />
      </Card>
      <VideoDetailsCard meta={meta} currentStudy={currentStudy} />
      <StudentEvaluationCard interactions={interactions} />
      <TeacherFeedbackCard
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
      />
    </div>
  );
}