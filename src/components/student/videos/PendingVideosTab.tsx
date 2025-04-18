import React from "react";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { Video } from "../../../types/video";

interface Props {
  videos: Video[];
}

export const PendingVideosTab: React.FC<Props> = ({ videos }) => (
  <div className="space-y-4">
    {videos.map((video) => (
      <Card key={video.id} className="rounded-[8px] p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-[#333333]">{video.title}</h3>
          <p className="text-sm text-[#A0A0A0]">{video.description}</p>
          <div className="text-xs text-[#A0A0A0] mt-1">
            {video.date} &bull; {video.duration}
          </div>
        </div>
        <Link to={`/student/videos/${video.id}`}>
          <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[8px] px-[12px] rounded-[8px]">
            Ver Video
          </Button>
        </Link>
      </Card>
    ))}
  </div>
);