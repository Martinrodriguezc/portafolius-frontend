import { Link } from "react-router-dom"
import { ClipboardList, PlusCircle, Upload, Info } from "lucide-react"
import Button from "../../components/common/Button/Button"
import Card from "../../components/common/Card/Card"
import { Label } from "../../components/common/Label/Label"
import { Progress } from "../../components/common/Progress/Progress"
import { Select, SelectValue } from "../../components/common/Select/SelectBase"
import { SelectTrigger, SelectContent } from "../../components/common/Select/SelectInteraction"
import { SelectItem } from "../../components/common/Select/SelectItems"
import Loading from "../../components/common/Loading/Loading"
import { ErrorDisplay } from "../../components/common/Error/Error"
import { useUploadPage } from "../../hooks/upload/useUploadPage"
import { UploadSection } from "../../components/student/upload/UploadSection"
import VideoCarousel from "../../components/student/videos/VideoCarousel"

export default function UploadPage() {
  const {
    studies,
    files,
    uploadProgress,
    isUploading,
    selectedStudy,
    setSelectedStudy,
    handleFileChange,
    removeFile,
    updateFileProtocol,
    handleSubmit,
    updateFileWindow,
    updateFileFinding,
    updateFileDiagnosis,
    updateFileSubdiagnosis,
    updateFileSubSub,
    updateFileThirdOrder,
    updateFileComment,
    updateFileReady,
    loading,
    error,
  } = useUploadPage()

  const currentStudy = studies.find((s) => s.id === selectedStudy)

  // Page header component - extracted for reuse in all states
  const PageHeader = () => (
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-[#4E81BD]/10 p-2 rounded-full">
        <Upload className="h-6 w-6 text-[#4E81BD]" />
      </div>
      <div>
        <h1 className="text-[24px] font-bold text-[#333333]">Subir videos a estudio</h1>
        <p className="text-[#666666] text-[14px] mt-1">
          Sube videos de ultrasonido para recibir retroalimentación de tus profesores
        </p>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="p-8 md:p-10 max-w-3xl mx-auto">
        <PageHeader />
        <Loading
          title="Cargando estudios"
          description="Estamos recuperando tus estudios disponibles. Esto tomará solo un momento."
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-3xl mx-auto">
        <PageHeader />
        <ErrorDisplay error={error.toString() || "Ha ocurrido un error al obtener los datos de tus estudios."} />
        <div className="flex justify-center">
          <Link to="/student/create_study">
            <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] flex items-center gap-2 shadow-sm hover:shadow transition-all">
              <PlusCircle className="h-5 w-5" />
              Crear nuevo estudio
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (studies.length === 0) {
    return (
      <div className="p-8 md:p-10 max-w-3xl mx-auto">
        <PageHeader />
        <Card className="rounded-[16px] shadow-sm border border-slate-200">
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-[#4E81BD]/10 p-6 rounded-full mb-6">
              <ClipboardList className="h-12 w-12 text-[#4E81BD]" />
            </div>
            <h2 className="text-[22px] font-semibold text-[#333333] mb-3">No tienes estudios disponibles</h2>
            <p className="text-[16px] text-[#666666] mb-8 max-w-md">
              Para subir videos, primero necesitas crear un estudio. Los estudios te ayudan a organizar tus videos por
              protocolo.
            </p>
            <Link to="/student/create_study">
              <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-3 rounded-[8px] flex items-center gap-2 shadow-sm hover:shadow transition-all">
                <PlusCircle className="h-5 w-5" />
                Crear nuevo estudio
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 md:p-10 max-w-3xl mx-auto">
      <PageHeader />

      <Card className="w-full rounded-[16px] shadow-sm border border-slate-200 animate-fadeIn">
        <div className="p-8">
          <div className="space-y-4 mb-6">
            <Label htmlFor="study" className="text-[15px] font-medium text-[#333333]">
              Selecciona el estudio
            </Label>
            <div className="space-y-3">
              <Select value={selectedStudy} onValueChange={setSelectedStudy}>
                <SelectTrigger
                  id="study"
                  className="h-[42px] text-[14px] border-slate-300 rounded-[8px] focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
                >
                  <SelectValue placeholder="Selecciona un estudio existente" />
                </SelectTrigger>
                <SelectContent>
                  {studies.map((study) => (
                    <SelectItem key={study.id} value={study.id}>
                      <div className="flex flex-col py-1">
                        <span className="font-medium">{study.title}</span>
                        <span className="text-[11px] text-[#666666]">
                          Fecha: {new Date(study.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Link
                to="/student/create_study"
                className="flex items-center text-[14px] text-[#4E81BD] hover:text-[#4E81BD]/80 transition-colors"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Crear nuevo estudio
              </Link>
            </div>
          </div>

          {currentStudy && (
            <div className="bg-blue-50 border border-blue-100 rounded-[12px] p-5 mb-8 shadow-sm">
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-md mr-3 shadow-sm">
                  <ClipboardList className="h-5 w-5 text-[#4E81BD]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#333333] mb-1">{currentStudy.title}</h3>
                  <p className="text-[13px] text-[#666666]">
                    Fecha: {new Date(currentStudy.created_at).toLocaleDateString()}
                  </p>
                  {currentStudy.description && (
                    <p className="text-[13px] text-[#666666] mt-2 border-t border-blue-100 pt-2">
                      {currentStudy.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {selectedStudy && (
            <>
              {files.length > 0 && (
                <div className="mb-8 space-y-5">
                  <Label className="text-[15px] font-medium text-[#333333] mb-2 mt-4 text-center">Vista previa de los videos</Label>
                  <VideoCarousel files={files} />
                </div>
              )}
              <UploadSection
                files={files}
                handleFileChange={handleFileChange}
                removeFile={removeFile}
                updateFileProtocol={updateFileProtocol}
                updateFileWindow={updateFileWindow}
                updateFileFinding={updateFileFinding}
                updateFileDiagnosis={updateFileDiagnosis}
                updateFileSubdiagnosis={updateFileSubdiagnosis}
                updateFileSubSub={updateFileSubSub}
                updateFileThirdOrder={updateFileThirdOrder}
                updateFileComment={updateFileComment}
                updateFileReady={updateFileReady}
              />
            </>
          )}

          {!selectedStudy && (
            <div className="bg-amber-50 border border-amber-100 rounded-[12px] p-5 mb-6 flex items-start">
              <div className="bg-white p-2 rounded-md mr-3 shadow-sm">
                <Info className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-amber-700 mb-1">Selecciona un estudio</h3>
                <p className="text-[13px] text-amber-600">
                  Por favor, selecciona un estudio existente o crea uno nuevo para comenzar a subir videos.
                </p>
              </div>
            </div>
          )}

          {isUploading && (
            <div className="space-y-3 mt-8 bg-slate-50 p-5 rounded-[12px] border border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-[15px] font-medium text-[#333333]">Subiendo videos...</span>
                <span className="text-[15px] font-medium text-[#4E81BD]">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2.5 bg-slate-200" />
              <p className="text-[13px] text-[#666666] italic">
                Por favor, no cierres esta ventana hasta que la carga se complete.
              </p>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[15px] font-medium py-[14px] rounded-[8px] mt-8 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            disabled={
              !selectedStudy ||
              files.length === 0 ||
              files.some((f) => !f.isReady)
            }
          >
            <Upload className="h-5 w-5" />
            {files.length > 0
              ? `Subir ${files.length} ${files.length === 1 ? "video" : "videos"} al estudio`
              : "Subir videos al estudio"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
