const ALLOWED_EXTENSIONS = ["mov", "avi", "mp4"];
const MAX_DURATION_SECONDS = 35;

export function validateVideo(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      return reject(
        new Error("Formato no válido: solo se permiten .mov, .avi o .mp4")
      );
    }

    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = url;

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      if (video.duration > MAX_DURATION_SECONDS) {
        return reject(
          new Error(
            `Los vídeos no deben durar más de ${MAX_DURATION_SECONDS} segundos`
          )
        );
      }
      resolve();
    };

    video.onerror = (e) => {
      URL.revokeObjectURL(url);
      console.error("Video error event:", e);
      reject(new Error("No se pudo leer el archivo de vídeo"));
    };
  });
}
