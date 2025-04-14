"use client"

import { useState } from "react"
import Button from "../../components/common/Button/Button"
import { Card, CardContent } from "../../components/common/Card/Card"
import { Textarea } from "../../components/common/Textarea/Textarea"
import { Play, Pause } from "lucide-react"

export default function VideoPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [comment, setComment] = useState("")

  // Datos de ejemplo
  const videoData = {
    id: params.id,
    title: "Ecografía abdominal",
    date: "12 mayo, 2023",
    tags: [
      { id: 1, text: "Hígado", author: "student" },
      { id: 2, text: "Vesícula biliar", author: "student" },
      { id: 3, text: "Orientación incorrecta", author: "teacher" },
    ],
    comments: [
      {
        id: 1,
        text: "Se observa correctamente el hígado, pero la orientación del transductor no es la adecuada.",
        author: "Dr. García",
        date: "13 mayo, 2023, 14:30",
      },
      {
        id: 2,
        text: "Gracias por la observación. Intentaré mejorar la orientación en el próximo estudio.",
        author: "Carlos Rodríguez",
        date: "13 mayo, 2023, 15:45",
      },
    ],
  }

  const handleSubmitComment = () => {
    if (!comment.trim()) return
    // Aquí iría la lógica para enviar el comentario
    setComment("")
  }

  return (
    <div className="p-8">
      <h1 className="text-[20px] font-bold text-[#333333] mb-6">{videoData.title}</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card className="border-none shadow-sm rounded-[16px] mb-6">
            <CardContent className="p-6">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-white/20 text-white hover:bg-white/30"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-[16px] font-medium text-[#333333] mb-2">Etiquetas</h3>
                <div className="flex flex-wrap gap-2">
                  {videoData.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className={`px-3 py-1 rounded-full text-[13px] ${
                        tag.author === "student" ? "bg-[#F4F4F4] text-[#333333]" : "bg-[#4E81BD]/10 text-[#4E81BD]"
                      }`}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]">
            Evaluar estudio completo
          </Button>
        </div>

        <div className="w-full lg:w-1/3">
          <Card className="border-none shadow-sm rounded-[16px]">
            <CardContent className="p-6">
              <h3 className="text-[16px] font-medium text-[#333333] mb-4">Comentarios</h3>

              <div className="space-y-4 mb-4">
                {videoData.comments.map((comment) => (
                  <div key={comment.id} className="bg-[#F4F4F4] rounded-[8px] p-4">
                    <p className="text-[14px] text-[#333333] mb-2">{comment.text}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-medium text-[#333333]">{comment.author}</span>
                      <span className="text-[13px] text-[#A0A0A0]">{comment.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Textarea
                  placeholder="Escribe un comentario..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px] text-[14px] border-[#A0A0A0] rounded-[8px] placeholder:text-[#A0A0A0]"
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={!comment.trim()}
                  className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]"
                >
                  Enviar comentario
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
