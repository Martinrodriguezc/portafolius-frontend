import { Play, Pause, Maximize2, Minimize2 } from "lucide-react";
import Button from "../../common/Button/Button";
import { VideoPlayerProps } from "../../../types/Props/Video/VideoPlayerProps";

export default function VideoPlayer({
  src,
  videoRef,
  isPlaying,
  togglePlay,
  progress,
  handleSeek,
  isFullscreen,
  toggleFullscreen,
}: VideoPlayerProps) {
  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video ref={videoRef} src={src} className="w-full h-auto" />

      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={togglePlay}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>

        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={handleSeek}
          className="
            flex-1 h-1 rounded-lg
            bg-slate-300
            accent-[#4E81BD]
            cursor-pointer
          "
        />

        <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize2 /> : <Maximize2 />}
        </Button>
      </div>
    </div>
  );
}
