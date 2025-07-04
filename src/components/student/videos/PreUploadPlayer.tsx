import React from "react";
import { Play, Pause, Maximize2, Minimize2, Loader2, AlertCircle } from "lucide-react";
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
        isAnonymizing,
        anonymizationError,
        togglePlay,
        toggleFullscreen,
        handleTimeUpdate,
        handleVideoEnded,
        handleSeek,
        stopPropagation,
    } = usePreUploadPlayer({ file, previewUrl });

    return (
        <div className={`relative bg-black rounded-lg overflow-hidden ${className ?? ""}`}>
            {(!localUrl && !isAnonymizing) ? (
                <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                        <p className="text-sm">Cargando video...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Loading Overlay */}
                    {isAnonymizing && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                            <div className="text-center text-white">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                                <p className="text-sm">Anonimizando video...</p>
                            </div>
                        </div>
                    )}

                    {/* Error Overlay */}
                    {anonymizationError && (
                        <div className="absolute top-2 left-2 right-2 bg-red-500/90 text-white p-2 rounded text-xs flex items-center gap-2 z-10">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{anonymizationError}</span>
                        </div>
                    )}
                    
                    <video
                        ref={videoRef}
                        src={localUrl || undefined}
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
                                disabled={isAnonymizing}
                            >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>

                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={0.1}
                                value={progress}
                                onChange={handleSeek}
                                onClick={stopPropagation}
                                className="flex-1 h-1.5 rounded-lg bg-white/30 accent-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Barra de progreso del video"
                                disabled={isAnonymizing}
                            />

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleFullscreen}
                                aria-label={isFullscreen ? "Salir de pantalla completa" : "Expandir video"}
                                className="text-white hover:bg-white/20"
                                disabled={isAnonymizing}
                            >
                                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PreUploadPlayer;
