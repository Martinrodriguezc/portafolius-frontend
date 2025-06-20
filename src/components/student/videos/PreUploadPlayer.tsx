import React from "react";
import { Play, Pause, Maximize2, Minimize2 } from "lucide-react";
import Button from "../../common/Button/Button";
import { PreUploadPlayerProps } from "../../../types/VideoPlayer";
import { usePreUploadPlayer } from "../../../hooks/video/usePreUploadPlayer";

const PreUploadPlayer: React.FC<PreUploadPlayerProps> = ({ file, previewUrl, className }) => {
    const {
        videoRef,
        isPlaying,
        progress,
        isFullscreen,
        localUrl,
        togglePlay,
        toggleFullscreen,
        handleTimeUpdate,
        handleVideoEnded,
        handleSeek,
        stopPropagation,
    } = usePreUploadPlayer({ file, previewUrl });

    if (!localUrl) return null; // No file to preview

    return (
        <div className={`relative bg-black rounded-lg overflow-hidden ${className ?? ""}`}>            
            <video
                ref={videoRef}
                src={localUrl}
                className="w-full h-auto max-h-[340px] bg-black"
                controls={false}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                onClick={togglePlay}
                tabIndex={0}
                style={{ cursor: "pointer" }}
            />

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                    {/* Play/Pause Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { stopPropagation(e); togglePlay(); }}
                        aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
                        className="text-white hover:bg-white/20"
                    >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>

                    {/* Progress Bar */}
                    <input
                        type="range"
                        min={0}
                        max={100}
                        step={0.1}
                        value={progress}
                        onChange={handleSeek}
                        onClick={stopPropagation}
                        className="flex-1 h-1.5 rounded-lg bg-white/30 accent-white cursor-pointer"
                        aria-label="Barra de progreso del video"
                    />

                    {/* Fullscreen Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreen}
                        aria-label={isFullscreen ? "Salir de pantalla completa" : "Expandir video"}
                        className="text-white hover:bg-white/20"
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PreUploadPlayer;
