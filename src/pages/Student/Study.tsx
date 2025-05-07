import { useState } from "react"
import { X, Plus, Tag, ClipboardList, CalendarIcon } from 'lucide-react'
import Card from "../../components/common/Card/Card"
import { Label } from "../../components/common/Label/Label"
import { Select, SelectValue } from "../../components/common/Select/SelectBase"
import { SelectContent, SelectTrigger } from "../../components/common/Select/SelectInteraction"
import { SelectItem } from "../../components/common/Select/SelectItems"
import { Textarea } from "../../components/common/Textarea/Textarea"
import { Progress } from "../../components/common/Progress/Progress"
import Button from "../../components/common/Button/Button"

export default function StudentCreateStudyPage() {
    // State management
    const [title, setTitle] = useState("")
    const [comment, setComment] = useState("")
    const [isCreating, setIsCreating] = useState(false)
    const [createProgress, setCreateProgress] = useState(0)
    const [date, setDate] = useState("")



    // Submit function
    const handleSubmit = () => {

        setIsCreating(true)

        // Simulate creation progress
        let progress = 0
        const interval = setInterval(() => {
            progress += 10
            setCreateProgress(progress)

            if (progress >= 100) {
                clearInterval(interval)
                setIsCreating(false)
                alert("Estudio creado exitosamente")
                // Reset form
                setTitle("")
                setComment("")
                setDate("")
            }
        }, 200)
    }

    return (
        <div className="p-8 flex justify-center">
            <Card className="w-full max-w-3xl rounded-[16px]">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardList className="h-6 w-6 text-[#4E81BD]" />
                        <h1 className="text-[20px] font-bold text-[#333333]">Crear nuevo estudio</h1>
                    </div>

                    <div className="space-y-4 mb-6">
                        <Label htmlFor="title" className="text-[14px] text-[#333333]">
                            Título del estudio
                        </Label>
                        <Textarea
                            id="title"
                            placeholder="Define el título de tu estudio..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="min-h-[50px] text-[14px] border-[#A0A0A0] rounded-[8px] placeholder:text-[#A0A0A0]"
                        />
                    </div>

                    <div className="space-y-4 mb-6">
                        <Label htmlFor="date" className="text-[14px] text-[#333333]">
                            Fecha del estudio
                        </Label>
                        <div className="relative">
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full h-[42px] text-[14px] border border-[#A0A0A0] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4E81BD] focus:border-transparent"
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#A0A0A0]" />
                        </div>
                    </div>

                
                    <div className="space-y-4 mb-6">
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

                    <div className="bg-blue-50 border border-blue-100 rounded-[8px] p-4 mb-6">
                        <p className="text-[14px] text-blue-700 flex items-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 shrink-0 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>
                                Este formulario solo crea el estudio. Podrás subir los archivos de ultrasonido después de crear el
                                estudio.
                            </span>
                        </p>
                    </div>

                    {isCreating && (
                        <div className="space-y-2 mt-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-[14px] text-[#333333]">Creando estudio...</span>
                                <span className="text-[14px] text-[#333333]">{createProgress}%</span>
                            </div>
                            <Progress value={createProgress} className="h-2" />
                        </div>
                    )}

                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            className="flex-1 border-[#A0A0A0] text-[#333333] text-[14px] font-medium py-[12px] rounded-[8px] mt-6"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="flex-1 bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-[12px] rounded-[8px] mt-6"
                        >
                            Crear estudio
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
