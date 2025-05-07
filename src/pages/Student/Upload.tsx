import type React from "react"

import { useState } from "react"
import { FileVideo, Plus, Tag, Trash2, Upload, X, ClipboardList, PlusCircle } from "lucide-react"

import Button from "../../components/common/Button/Button"
import Card from "../../components/common/Card/Card"
import { Label } from "../../components/common/Label/Label"
import { Progress } from "../../components/common/Progress/Progress"
import { Select, SelectValue } from "../../components/common/Select/SelectBase"
import { SelectContent, SelectTrigger } from "../../components/common/Select/SelectInteraction"
import { SelectItem } from "../../components/common/Select/SelectItems"
import { Link } from "react-router-dom"

interface FileWithMetadata {
  file: File
  protocol: string
  tags: string[]
  selectedOrgan: string
  selectedStructure: string
  selectedCondition: string
}

interface Study {
  id: string
  title: string
  date: string
  protocol: string
}

const mockStudies: Study[] = [
  { id: "study-1", title: "Evaluación cardíaca post-operatoria", date: "2023-05-15", protocol: "FATE" },
  { id: "study-2", title: "Evaluación abdominal de urgencia", date: "2023-05-18", protocol: "FAST" },
  { id: "study-3", title: "Evaluación pulmonar paciente COVID", date: "2023-05-20", protocol: "BLUE" },
  { id: "study-4", title: "Evaluación hemodinámica en UCI", date: "2023-05-22", protocol: "RUSH" },
  { id: "study-5", title: "Evaluación cardíaca pre-operatoria", date: "2023-05-25", protocol: "FOCUS" },
]

const useUploadPage = () => {
  const [files, setFiles] = useState<FileWithMetadata[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        protocol: "",
        tags: [],
        selectedOrgan: "",
        selectedStructure: "",
        selectedCondition: "",
      }))
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const updateFileProtocol = (index: number, protocol: string) => {
    setFiles((prev) => prev.map((item, i) => (i === index ? { ...item, protocol } : item)))
  }

  const updateFileOrgan = (index: number, selectedOrgan: string) => {
    setFiles((prev) => prev.map((item, i) => (i === index ? { ...item, selectedOrgan } : item)))
  }

  const updateFileStructure = (index: number, selectedStructure: string) => {
    setFiles((prev) => prev.map((item, i) => (i === index ? { ...item, selectedStructure } : item)))
  }

  const updateFileCondition = (index: number, selectedCondition: string) => {
    setFiles((prev) => prev.map((item, i) => (i === index ? { ...item, selectedCondition } : item)))
  }

  const addTagToFile = (index: number) => {
    const fileItem = files[index]
    if (fileItem.selectedCondition && !fileItem.tags.includes(fileItem.selectedCondition)) {
      const newTag = `${fileItem.selectedOrgan} - ${fileItem.selectedStructure} - ${fileItem.selectedCondition}`
      setFiles((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
              ...item,
              tags: [...item.tags, newTag],
              selectedOrgan: "",
              selectedStructure: "",
              selectedCondition: "",
            }
            : item,
        ),
      )
    }
  }

  const removeTagFromFile = (fileIndex: number, tagIndex: number) => {
    setFiles((prev) =>
      prev.map((item, i) =>
        i === fileIndex
          ? {
            ...item,
            tags: item.tags.filter((_, j) => j !== tagIndex),
          }
          : item,
      ),
    )
  }

  const handleSubmit = () => {
    if (!selectedStudy) {
      alert("Por favor selecciona un estudio al cual subir los videos.")
      return
    }

    if (files.length === 0) {
      alert("Por favor sube al menos un archivo.")
      return
    }

    const missingProtocols = files.some((file) => !file.protocol)
    if (missingProtocols) {
      alert("Por favor selecciona un protocolo para cada archivo.")
      return
    }

    setIsUploading(true)

    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        alert(`Videos subidos exitosamente al estudio "${mockStudies.find((s) => s.id === selectedStudy)?.title}"`)
        setFiles([])
        setSelectedStudy("")
      }
    }, 200)
  }

  return {
    files,
    uploadProgress,
    isUploading,
    selectedStudy,
    setSelectedStudy,
    handleFileChange,
    removeFile,
    handleSubmit,
    updateFileProtocol,
    updateFileOrgan,
    updateFileStructure,
    updateFileCondition,
    addTagToFile,
    removeTagFromFile,
  }
}

// Custom UploadSection component
const UploadSection = ({
  files,
  handleFileChange,
  removeFile,
  updateFileProtocol,
  updateFileOrgan,
  updateFileStructure,
  updateFileCondition,
  addTagToFile,
  removeTagFromFile,
}: {
  files: FileWithMetadata[]
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: (index: number) => void
  updateFileProtocol: (index: number, protocol: string) => void
  updateFileOrgan: (index: number, selectedOrgan: string) => void
  updateFileStructure: (index: number, selectedStructure: string) => void
  updateFileCondition: (index: number, selectedCondition: string) => void
  addTagToFile: (index: number) => void
  removeTagFromFile: (fileIndex: number, tagIndex: number) => void
}) => {
  return (
    <div className="mt-6 mb-6">
      <Label className="text-[14px] text-[#333333] mb-2 block">Archivos de video</Label>

      <div className="border-2 border-dashed border-[#A0A0A0] rounded-[8px] p-6 text-center">
        <FileVideo className="h-12 w-12 mx-auto text-[#4E81BD] mb-2" />
        <p className="text-[14px] text-[#333333] mb-4">Arrastra y suelta tus archivos de video aquí o</p>
        <div className="relative">
          <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-[12px] rounded-[8px] flex items-center justify-center gap-2 mx-auto">
            <Upload className="h-4 w-4" />
            Seleccionar archivos
          </Button>
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-[12px] text-[#A0A0A0] mt-2">
          Formatos soportados: .mp4, .mov, .mpeg (máx. 50MB por archivo)
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-6">
          <h3 className="text-[16px] font-medium text-[#333333] mb-2">Archivos seleccionados:</h3>

          {files.map((fileItem, index) => (
            <div key={index} className="border border-slate-200 rounded-[8px] overflow-hidden">
              {/* File header */}
              <div className="flex items-center justify-between bg-slate-50 p-3">
                <div className="flex items-center">
                  <FileVideo className="h-5 w-5 text-[#4E81BD] mr-2" />
                  <span className="text-[14px] text-[#333333] truncate max-w-[200px]">{fileItem.file.name}</span>
                  <span className="text-[12px] text-[#A0A0A0] ml-2">
                    ({(fileItem.file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* File metadata */}
              <div className="p-4">
                {/* Protocol selection */}
                <div className="mb-4">
                  <Label htmlFor={`protocol-${index}`} className="text-[14px] text-[#333333] mb-1 block">
                    Protocolo para este video
                  </Label>
                  <Select value={fileItem.protocol} onValueChange={(value) => updateFileProtocol(index, value)}>
                    <SelectTrigger
                      id={`protocol-${index}`}
                      className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                    >
                      <SelectValue placeholder="Selecciona un protocolo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fate">FATE</SelectItem>
                      <SelectItem value="fast">FAST</SelectItem>
                      <SelectItem value="rush">RUSH</SelectItem>
                      <SelectItem value="blue">BLUE</SelectItem>
                      <SelectItem value="focus">FOCUS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags section */}
                <div className="mb-3">
                  <Label className="text-[14px] text-[#333333] mb-2 block">Etiquetas para este video</Label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`organ-${index}`} className="text-[12px] text-[#333333] mb-1 block">
                        Órgano
                      </Label>
                      <Select value={fileItem.selectedOrgan} onValueChange={(value) => updateFileOrgan(index, value)}>
                        <SelectTrigger
                          id={`organ-${index}`}
                          className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                        >
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corazon">Corazón</SelectItem>
                          <SelectItem value="pulmon">Pulmón</SelectItem>
                          <SelectItem value="higado">Hígado</SelectItem>
                          <SelectItem value="rinon">Riñón</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor={`structure-${index}`} className="text-[12px] text-[#333333] mb-1 block">
                        Estructura
                      </Label>
                      <Select
                        value={fileItem.selectedStructure}
                        onValueChange={(value) => updateFileStructure(index, value)}
                      >
                        <SelectTrigger
                          id={`structure-${index}`}
                          className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                        >
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="valvula">Válvula</SelectItem>
                          <SelectItem value="ventriculo">Ventrículo</SelectItem>
                          <SelectItem value="auricula">Aurícula</SelectItem>
                          <SelectItem value="arteria">Arteria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor={`condition-${index}`} className="text-[12px] text-[#333333] mb-1 block">
                        Condición
                      </Label>
                      <div className="flex">
                        <Select
                          value={fileItem.selectedCondition}
                          onValueChange={(value) => updateFileCondition(index, value)}
                        >
                          <SelectTrigger
                            id={`condition-${index}`}
                            className="h-[42px] text-[14px] border-[#A0A0A0] rounded-l-[8px] rounded-r-none flex-1"
                          >
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="dilatado">Dilatado</SelectItem>
                            <SelectItem value="estenosis">Estenosis</SelectItem>
                            <SelectItem value="regurgitacion">Regurgitación</SelectItem>
                          </SelectContent>
                        </Select>
                        <button
                          onClick={() => addTagToFile(index)}
                          disabled={
                            !fileItem.selectedOrgan || !fileItem.selectedStructure || !fileItem.selectedCondition
                          }
                          className="bg-[#4E81BD] text-white px-3 rounded-r-[8px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {fileItem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {fileItem.tags.map((tag, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="flex items-center gap-1 bg-[#4E81BD]/10 text-[#4E81BD] px-3 py-1 rounded-full text-[12px]"
                        >
                          <Tag className="h-3 w-3" />
                          <span>{tag}</span>
                          <button
                            onClick={() => removeTagFromFile(index, tagIndex)}
                            className="ml-1 text-[#4E81BD] hover:text-[#4E81BD]/70"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function UploadPage() {
  const {
    files,
    uploadProgress,
    isUploading,
    selectedStudy,
    setSelectedStudy,
    handleFileChange,
    removeFile,
    handleSubmit,
    updateFileProtocol,
    updateFileOrgan,
    updateFileStructure,
    updateFileCondition,
    addTagToFile,
    removeTagFromFile,
  } = useUploadPage()

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-3xl rounded-[16px]">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="h-6 w-6 text-[#4E81BD]" />
            <h1 className="text-[20px] font-bold text-[#333333]">Subir videos a estudio</h1>
          </div>

          <div className="space-y-2 mb-6">
            <Label htmlFor="study" className="text-[14px] text-[#333333]">
              Selecciona el estudio
            </Label>
            <div className="space-y-2">
              <Select value={selectedStudy} onValueChange={setSelectedStudy}>
                <SelectTrigger id="study" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
                  <SelectValue placeholder="Selecciona un estudio existente" />
                </SelectTrigger>
                <SelectContent>
                  {mockStudies.map((study) => (
                    <SelectItem key={study.id} value={study.id}>
                      <div className="flex flex-col">
                        <span>{study.title}</span>
                        <span className="text-[11px] text-[#A0A0A0]">
                          {study.protocol} • {new Date(study.date).toLocaleDateString()}
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

          {selectedStudy && (
            <div className="bg-blue-50 border border-blue-100 rounded-[8px] p-4 mb-6">
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-md mr-3">
                  <ClipboardList className="h-5 w-5 text-[#4E81BD]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-[#333333]">
                    {mockStudies.find((s) => s.id === selectedStudy)?.title}
                  </h3>
                  <p className="text-[12px] text-[#666666]">
                    Protocolo: {mockStudies.find((s) => s.id === selectedStudy)?.protocol} • Fecha:{" "}
                    {new Date(mockStudies.find((s) => s.id === selectedStudy)?.date || "").toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <UploadSection
            files={files}
            handleFileChange={handleFileChange}
            removeFile={removeFile}
            updateFileProtocol={updateFileProtocol}
            updateFileOrgan={updateFileOrgan}
            updateFileStructure={updateFileStructure}
            updateFileCondition={updateFileCondition}
            addTagToFile={addTagToFile}
            removeTagFromFile={removeTagFromFile}
          />

          {isUploading && (
            <div className="space-y-2 mt-6">
              <div className="flex justify-between text-sm">
                <span className="text-[14px] text-[#333333]">Subiendo videos...</span>
                <span className="text-[14px] text-[#333333]">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-[12px] rounded-[8px] mt-6"
            disabled={!selectedStudy || files.length === 0}
          >
            Subir videos al estudio
          </Button>
        </div>
      </Card>
    </div>
  )
}
