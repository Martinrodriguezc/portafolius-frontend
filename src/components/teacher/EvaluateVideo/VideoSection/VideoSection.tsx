import Card from '../../../common/Card/Card';
import VideoPlayer from '../../../student/videos/VideoPlayer';
import { useVideoSection } from '../../../../hooks/teacher/VideoSection/useVideoSection';
import { VideoSectionProps } from '../../../../types/Props/Video/VideoSectionProps';
import VideoDetailsCard from './VideoDetailsCard';
import StudentEvaluationCard from './StudentEvaluationCard';
import TeacherFeedbackCard from './TeacherFeedbackCard';

export default function VideoSection(props: VideoSectionProps) {
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
  } = useVideoSection(props.meta.id);

  return (
    <div className="w-full lg:w-2/3 space-y-6">
      <Card className="rounded-[16px] overflow-hidden border border-slate-200 shadow-sm">
        <VideoPlayer
          src={props.url}
          videoRef={props.videoRef}
          isPlaying={props.isPlaying}
          togglePlay={props.togglePlay}
          progress={props.progress}
          handleSeek={props.handleSeek}
          isFullscreen={props.isFullscreen}
          toggleFullscreen={props.toggleFullscreen}
        />
      </Card>
      <VideoDetailsCard meta={props.meta} currentStudy={props.currentStudy} />
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