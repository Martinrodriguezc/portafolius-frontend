import React from "react";
import Button from "../common/Button/Button";
import { VideoProps } from "../../types/Props/Video/VideoProps";

export const VideoCard: React.FC<VideoProps> = ({ video }) => {
  return (
    <div className="mb-6 p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {video.original_filename}
      </h3>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Fecha:</span> {video.upload_date}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Estudiante:</span>Juan perez
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Diagnóstico:</span> Diagnostico
      </p>
      <Button
        onClick={() => {
          console.log(`Evaluar video con id: ${video.id}`);
        }}
        className="mt-4 text-white px-4 py-2 rounded-md transition"
      >
        Evaluar video
      </Button>
    </div>
  );
};

export default VideoCard;
