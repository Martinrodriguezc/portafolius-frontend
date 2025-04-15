import React from "react";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { Video } from "lucide-react";

interface VideoItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  date: string;
}

interface VideosTabProps {
  videos: VideoItem[];
}

export function VideosTab({ videos }: VideosTabProps) {
  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Card key={video.id} className="rounded-[16px]">
          <div className="flex flex-col md:flex-row">
            <div className="bg-[#F4F4F4] w-full md:w-48 h-32 flex items-center justify-center rounded-lg mb-4 md:mb-0 md:mr-4">
              <Video className="h-8 w-8 text-[#A0A0A0]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-medium text-[#333333]">{video.title}</h3>
              <p className="text-[14px] text-[#A0A0A0] mt-1">{video.description}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-[13px] text-[#A0A0A0]">
                  <span className="mr-4">Fecha: {video.date}</span>
                  <span>Duración: {video.duration}</span>
                </div>
                <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white">
                  Ver Video
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}