"use client"

import type React from "react"

import { useState } from "react"
import Button from "../../components/common/Button/Button"
import { Card, CardContent }  from "../../components/common/Card/Card";
import Input from "../../components/common/Input/BaseInput";
import Label from "../../components/common/Label/Label";
import { Progress } from "../../components/common/Progress/Progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/common/Select/Select"
import { Textarea } from "../../components/common/Textarea/Textarea"
import { Upload, X, Plus } from "lucide-react"
import { Badge } from "../../components/common/Badge/Badge"

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [protocol, setProtocol] = useState("")
  const [comment, setComment] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<{ id: number; text: string }[]>([])

  // Opciones para los tags jerárquicos
  const organOptions = ["Corazón", "Hígado", "Riñón", "Pulmón", "Vesícula"]
  const structureOptions = {
    Corazón: ["Vena aorta", "Válvula mitral", "Ventrículo izquierdo", "Ventrículo derecho", "Aurícula"],
    Hígado: ["Lóbulo derecho", "Lóbulo izquierdo", "Vena porta", "Conductos biliares"],
    Riñón: ["Corteza", "Médula", "Pelvis renal", "Uréter"],
    Pulmón: ["Lóbulo superior", "Lóbulo inferior", "Pleura", "Bronquios"],
    Vesícula: ["Cuello", "Cuerpo", "Fondo", "Conducto cístico"],
  }
  const conditionOptions = {
    "Vena aorta": ["Aneurisma", "Disección", "Estenosis", "Normal"],
    "Válvula mitral": ["Estenosis", "Insuficiencia", "Prolapso", "Normal"],
    "Lóbulo derecho": ["Esteatosis", "Quiste", "Hemangioma", "Normal"],
    Corteza: ["Quiste", "Cálculo", "Hidronefrosis", "Normal"],
    // Otras condiciones para diferentes estructuras
  }

  const [selectedOrgan, setSelectedOrgan] = useState("")
  const [selectedStructure, setSelectedStructure] = useState("")
  const [selectedCondition, setSelectedCondition] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (selectedOrgan && selectedStructure && selectedCondition) {
      const tagText = `${selectedOrgan} → ${selectedStructure} → ${selectedCondition}`
      setTags([...tags, { id: Date.now(), text: tagText }])
      setSelectedOrgan("")
      setSelectedStructure("")
      setSelectedCondition("")
    }
  }

  const removeTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  const handleSubmit = () => {
    if (files.length < 4 || files.length > 8) {
      alert("Debes subir entre 4 y 8 videos")
      return
    }

    if (!protocol) {
      alert("Debes seleccionar un protocolo")
      return
    }

    setIsUploading(true)

    // Simulación de progreso de carga
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        alert("Estudio enviado con éxito")
      }
    }, 200)
  }

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-3xl border-none shadow-sm rounded-[16px]">
        <CardContent className="p-8">
          <h1 className="text-[20px] font-bold text-[#333333] mb-6">Subir estudio</h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="protocol" className="text-[14px] text-[#333333]">
                Selecciona el protocolo
              </Label>
              <Select value={protocol} onValueChange={setProtocol}>
                <SelectTrigger id="protocol" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
                  <SelectValue placeholder="Selecciona un protocolo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fate">FATE</SelectItem>
                  <SelectItem value="fast">FAST</SelectItem>
                  <SelectItem value="rush">RUSH</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border-2 border-dashed border-[#A0A0A0] rounded-[16px] p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-[#A0A0A0] mb-4" />
              <h3 className="text-[16px] font-medium mb-2 text-[#333333]">
                Arrastra tus videos aquí o haz clic para seleccionarlos
              </h3>
              <p className="text-[14px] text-[#A0A0A0] mb-4">
                Puedes subir entre 4 y 8 videos en formato .mp4, .avi o .mov
              </p>
              <Input
                type="file"
                accept="video/mp4,video/avi,video/quicktime"
                className="hidden"
                id="video-upload"
                multiple
                onChange={handleFileChange}
              />
              <Button
                asChild
                className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]"
              >
                <label htmlFor="video-upload" className="cursor-pointer">
                  Seleccionar Archivos
                </label>
              </Button>
            </div>

            {files.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[16px] font-medium text-[#333333]">Archivos seleccionados ({files.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {files.map((file, index) => (
                    <div key={index} className="bg-[#F4F4F4] rounded-[8px] p-3 flex justify-between items-center">
                      <span className="text-[14px] text-[#333333] truncate">{file.name}</span>
                      <button onClick={() => removeFile(index)} className="text-[#A0A0A0] hover:text-[#333333]">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sección de etiquetas/tags */}
            <div className="space-y-4 border border-[#A0A0A0]/30 rounded-[16px] p-6">
              <h3 className="text-[16px] font-medium text-[#333333]">Etiquetas de diagnóstico</h3>
              <p className="text-[14px] text-[#A0A0A0]">
                Añade etiquetas para indicar qué estructuras y condiciones se muestran en tus videos
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organ" className="text-[14px] text-[#333333]">
                    Órgano
                  </Label>
                  <Select value={selectedOrgan} onValueChange={setSelectedOrgan}>
                    <SelectTrigger id="organ" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
                      <SelectValue placeholder="Selecciona órgano" />
                    </SelectTrigger>
                    <SelectContent>
                      {organOptions.map((organ) => (
                        <SelectItem key={organ} value={organ}>
                          {organ}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="structure" className="text-[14px] text-[#333333]">
                    Estructura
                  </Label>
                  <Select value={selectedStructure} onValueChange={setSelectedStructure} disabled={!selectedOrgan}>
                    <SelectTrigger id="structure" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
                      <SelectValue placeholder="Selecciona estructura" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedOrgan &&
                        structureOptions[selectedOrgan as keyof typeof structureOptions]?.map((structure) => (
                          <SelectItem key={structure} value={structure}>
                            {structure}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition" className="text-[14px] text-[#333333]">
                    Condición
                  </Label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition} disabled={!selectedStructure}>
                    <SelectTrigger id="condition" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
                      <SelectValue placeholder="Selecciona condición" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedStructure &&
                        conditionOptions[selectedStructure as keyof typeof conditionOptions]?.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="button"
                onClick={addTag}
                disabled={!selectedOrgan || !selectedStructure || !selectedCondition}
                variant="outline"
                className="mt-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Añadir etiqueta
              </Button>

              {tags.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag.id} className="bg-[#4E81BD]/10 text-[#4E81BD] hover:bg-[#4E81BD]/20 px-3 py-1">
                        {tag.text}
                        <button onClick={() => removeTag(tag.id)} className="ml-2 text-[#4E81BD] hover:text-[#333333]">
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sección de comentarios */}
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-[14px] text-[#333333]">
                Comentarios adicionales
              </Label>
              <Textarea
                id="comment"
                placeholder="Añade cualquier información relevante sobre el estudio..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] text-[14px] border-[#A0A0A0] rounded-[8px] placeholder:text-[#A0A0A0]"
              />
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[14px] text-[#333333]">Subiendo estudio...</span>
                  <span className="text-[14px] text-[#333333]">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={isUploading || files.length < 4 || files.length > 8 || !protocol}
              className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]"
            >
              Enviar estudio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
