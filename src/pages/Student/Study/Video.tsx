import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import Card from "../../../components/common/Card/Card";
import VideoPlayer from "../../../components/student/videos/VideoPlayer";
import EvaluationsReceivedPanel from "../../../components/student/videos/EvaluationsReceivedPanel";
import { attemptService } from "../../../hooks/teacher/attemptService/attemptService";
import { Attempt } from "../../../types/attempt";
import VideoProtocolTags from "../../../components/student/videos/VideoProtocolTags";
import VideoComments from "../../../components/student/videos/VideoComments";
import VideoDetails from "../../../components/student/videos/VideoDetails";
import { useStudentVideoPage } from "../../../hooks/student/Videos/VideoPage/useStudentVideoPage";
import { useStudentStudies } from "../../../hooks/student/Studies/useStudentStudies";
import { authService } from "../../../hooks/auth/authServices";
import { useParams } from "react-router-dom";
import { useStudyVideos } from "../../../hooks/student/Videos/useStudyVideos";
import VideoCarousel from "../../../components/common/Carousel/VideoCarousel";
import { useInteractions } from "../../../hooks/upload/useInteractions";
import { PageHeader } from "./VideoPageHeader";

export default function StudentVideoPage() {
  const { studyId } = useParams<{ studyId: string }>();
  const { clipId } = useParams<{ clipId: string }>();
  const { videos } = useStudyVideos(studyId);
  const [evaluations, setEvaluations] = useState<Attempt[]>([]);

  const {
    videoRef,
    url,
    meta,
    loading,
    error,
    isPlaying,
    progress,
    togglePlay,
    handleSeek,
    isFullscreen,
    toggleFullscreen,
  } = useStudentVideoPage();

  const { interactions, loadInteractions } = useInteractions();

  // carga de interacciones del estudiante
  useEffect(() => {
    if (meta?.id) {
      loadInteractions(meta.id);
    }
  }, [meta, loadInteractions]);

  // carga de evaluaciones recibidas
  useEffect(() => {
    if (meta?.id) {
      attemptService
        .list(meta.id)
        .then(setEvaluations)
        .catch(console.error);
    }
  }, [meta?.id]);

  const { studies, loading: studiesLoading } = useStudentStudies();
  const study = studies.find((s) => s.id === meta?.study_id);
  const currentUser = authService.getCurrentUser();
  const studentName = currentUser
    ? `${currentUser.first_name} ${currentUser.last_name}`
    : "";

  if (loading || studiesLoading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader meta={meta} studyId={studyId} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader meta={meta} studyId={studyId} />
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader meta={meta} studyId={studyId} />

      <div className="flex flex-col lg:flex-row gap-6 animate-fadeIn">
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

          {videos.length > 1 && (
            <VideoCarousel videos={videos} studyId={studyId!} teacher={false} />
          )}

          <VideoDetails
            meta={meta}
            study={study}
            studentName={studentName}
          />

          <div className="space-y-6">
            <VideoProtocolTags interactions={interactions} />
            <VideoComments interactions={interactions} />
          </div>
        </div>

        <div className="w-full lg:w-1/3 sticky top-6">
          {/* Panel de Evaluaciones Recibidas */}
          <EvaluationsReceivedPanel evaluations={evaluations} clipId={clipId!} />
        </div>
      </div>
    </div>
  );
}


