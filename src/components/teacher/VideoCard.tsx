import { Video } from "../../types/video";
import React from "react";

interface VideoProps {
  video: Video;
}

export const VideoCard: React.FC<VideoProps> = ({ video }) => {
  return (
    <div className="mb-6 p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{video.title}</h3>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Fecha:</span> {video.date}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Estudiante:</span> {video.student}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Diagnóstico:</span> {video.diagnosis}
      </p>
      {video.status === "pendiente" && (
        <button
          onClick={() => {
            console.log(`Evaluar video con id: ${video.id}`);
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Evaluar video
        </button>
      )}
    </div>
  );
};

export default VideoCard;
