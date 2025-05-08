import { useState } from "react";
import { useStudyVideos } from "../../../hooks/student/Videos/useStudyVideos";
import Card from "../../../components/common/Card/Card";
import Button from "../../../components/common/Button/Button";
import { Link } from "react-router-dom";
import { ReturnButton } from "../../../components/common/Button/ReturnButton";
import { Select, SelectValue } from "../../../components/common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../../components/common/Select/SelectInteraction";
import { SelectItem } from "../../../components/common/Select/SelectItems";

export default function StudentMultipleVideosPage() {
  const { videos, loading, error, study_id } = useStudyVideos();
  const [selectedProtocol, setSelectedProtocol] = useState<string>();
  const protocols = Array.from(new Set(videos.map((v) => v.protocol)));
  const filteredVideos =
    selectedProtocol && selectedProtocol !== "all"
      ? videos.filter((v) => v.protocol === selectedProtocol)
      : videos;

  const label = selectedProtocol
    ? selectedProtocol === "all"
      ? "Mostrar todos"
      : selectedProtocol
    : "";

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-[20px] font-bold text-[#333333]">
            Videos del estudio
          </h1>
          <p className="text-[#A0A0A0]">Revisa los videos de tu estudio</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
            <SelectTrigger className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
              {label
                ? `Filtrado por: ${label}`
                : <SelectValue placeholder="Filtrar por protocolo" />
              }
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Mostrar todos</SelectItem>
              {protocols.map((proto) => (
                <SelectItem key={proto} value={proto}>
                  {proto}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ReturnButton />
        </div>
      </header>

      {loading ? (
        <p className="p-4 text-center">Cargando videos…</p>
      ) : error ? (
        <p className="p-4 text-center text-red-500">Error: {error}</p>
      ) : filteredVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Card className="w-full max-w-3xl rounded-[16px]">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Aún no hay videos
            </h2>
            <p className="text-gray-500 mb-6">
              No se encontraron videos para el filtro seleccionado.
            </p>
            <Link to={`/student/upload`}>
              <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-5 py-2 rounded-md">
                Subir Video
              </Button>
            </Link>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="rounded-[8px] p-4 flex items-center justify-between"
            >
              <div className="flex-1 mr-4">
                <h3 className="text-lg font-medium text-[#333333]">
                  {video.original_filename}
                </h3>
                <div className="text-xs text-[#A0A0A0] mt-1">
                  Fecha:{" "}
                  {new Date(video.upload_date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                  <br />
                  Protocolo: {video.protocol}
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
      )}
    </div>
  );
}