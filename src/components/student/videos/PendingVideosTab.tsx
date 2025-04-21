import React from "react";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { useStudyVideos } from "../../../hooks/student/useStudyVideos";
import { Video } from "../../../types/video";

export const PendingVideosTab: React.FC = () => {
  const { videos, loading, error, study_id } = useStudyVideos();
  const pendingVideos = videos.filter((video) => video.status == "pendiente");

  if (loading) {
    return <p className="p-4 text-center">Cargando videos…</p>;
  }
  if (error) {
    return <p className="p-4 text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-4">
      {pendingVideos.map((video: Video) => (
        <Card
          key={video.id}
          className="rounded-[8px] p-4 flex items-center justify-between"
        >
          <div className="flex-1 mr-4">
            <h3 className="text-lg font-medium text-[#333333]">
              {video.original_filename}
            </h3>
            <p className="text-sm text-[#A0A0A0]">{video.mime_type}</p>
            <div className="text-xs text-[#A0A0A0] mt-1">
              {video.upload_date} &bull; {video.duration_seconds}s
            </div>
          </div>
          <Link to={`/student/${study_id}/videos/${video.id}`}>
            <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[8px] px-[12px] rounded-[8px]">
              Ver Video
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  );
};
