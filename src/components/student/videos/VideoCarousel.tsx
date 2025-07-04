import React, { useState } from "react";
import PreUploadPlayer from "./PreUploadPlayer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VideoCarouselProps } from "../../../types/VideoPlayer";

const VideoCarousel: React.FC<VideoCarouselProps> = ({ files, className }) => {
  const [current, setCurrent] = useState(0);
  if (!files || files.length === 0) return null;

  const goPrev = () => setCurrent((prev) => (prev === 0 ? files.length - 1 : prev - 1));
  const goNext = () => setCurrent((prev) => (prev === files.length - 1 ? 0 : prev + 1));

  const currentFile = files[current];

  return (
    <div className={`w-full flex flex-col items-center ${className ?? ""} relative`}>
      <div className="w-full flex items-center justify-center relative max-w-xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={goPrev}
          className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 p-0 m-0 border-none bg-transparent focus:outline-none"
          aria-label="Anterior"
          type="button"
        >
          <ChevronLeft className="w-8 h-8 text-[#4E81BD]" />
        </button>
        <PreUploadPlayer file={currentFile.file} className="w-full max-w-xl" />
        {/* Right Arrow */}
        <button
          onClick={goNext}
          className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-20 p-0 m-0 border-none bg-transparent focus:outline-none"
          aria-label="Siguiente"
          type="button"
        >
          <ChevronRight className="w-8 h-8 text-[#4E81BD]" />
        </button>
      </div>
      <div className="mt-3 text-center text-sm text-[#333] font-medium truncate max-w-xs">
        {currentFile.file.name}
      </div>
      <div className="flex gap-2 mt-2 justify-center">
        {files.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full ${idx === current ? "bg-[#4E81BD]" : "bg-slate-300"}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir al video ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel; 