import { ClipboardList, ArrowLeft, Info, CheckCircle } from "lucide-react"
import Card from "../../components/common/Card/Card"
import { Label } from "../../components/common/Label/Label"
import { Textarea } from "../../components/common/Textarea/Textarea"
import { Progress } from "../../components/common/Progress/Progress"
import Button from "../../components/common/Button/Button"
import { useCreateStudy } from "../../hooks/student/Studies/useCreateStudy"
import { Link } from "react-router-dom"

export default function StudentCreateStudyPage() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    isCreating,
    createProgress,
    handleSubmit,
    handleCancel,
    error,
  } = useCreateStudy()

  // Page header component
  const PageHeader = () => (
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-[#4E81BD]/10 p-2 rounded-full">
        <ClipboardList className="h-6 w-6 text-[#4E81BD]" />
      </div>
      <div>
        <h1 className="text-[24px] font-bold text-[#333333]">Crear nuevo estudio</h1>
        <p className="text-[#666666] text-[14px] mt-1">
          Crea un estudio para organizar tus videos de ultrasonido por protocolo
        </p>
      </div>
    </div>
  )

  return (
    <div className="p-8 md:p-10 max-w-3xl mx-auto">
      <PageHeader />

      <Card className="w-full rounded-[16px] shadow-sm border border-slate-200 animate-fadeIn">
        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[12px] p-5 mb-6">
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-md mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-red-700 mb-1">Error al crear el estudio</h3>
                  <p className="text-[13px] text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <Label htmlFor="title" className="text-[15px] font-medium text-[#333333]">
              Título del estudio <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="title"
              placeholder="Define el título de tu estudio..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="min-h-[50px] text-[14px] border-slate-300 rounded-[8px] placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
            />
            {title.length > 0 && title.length < 5 && (
              <p className="text-[13px] text-amber-600">El título debe tener al menos 5 caracteres.</p>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <Label
              htmlFor="description"
              className="text-[15px] font-medium text-[#333333] flex items-center justify-between"
            >
              <span>Descripción</span>
              <span className="text-[13px] text-[#666666] font-normal">Opcional</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Añade cualquier información relevante sobre el estudio..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] text-[14px] border-slate-300 rounded-[8px] placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-[12px] p-5 mb-8 shadow-sm">
            <div className="flex items-start">
              <div className="bg-white p-2 rounded-md mr-3 shadow-sm">
                <Info className="h-5 w-5 text-[#4E81BD]" />
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-[#333333] mb-1">¿Qué es un estudio?</h3>
                <p className="text-[13px] text-[#666666]">
                  Un estudio es una colección de videos de ultrasonido organizados por protocolo. Después de crear el
                  estudio, podrás subir tus videos y recibir retroalimentación de tus profesores.
                </p>
              </div>
            </div>
          </div>

          {isCreating && (
            <div className="space-y-3 mt-8 bg-slate-50 p-5 rounded-[12px] border border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-[15px] font-medium text-[#333333]">Creando estudio...</span>
                <span className="text-[15px] font-medium text-[#4E81BD]">{createProgress}%</span>
              </div>
              <Progress value={createProgress} className="h-2.5 bg-slate-200" />
              <p className="text-[13px] text-[#666666] italic">
                Por favor, espera mientras creamos tu estudio. Serás redirigido automáticamente.
              </p>
            </div>
          )}

          {createProgress === 100 && (
            <div className="bg-green-50 border border-green-100 rounded-[12px] p-5 mb-6 mt-8">
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-md mr-3 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-green-700 mb-1">¡Estudio creado con éxito!</h3>
                  <p className="text-[13px] text-green-600">
                    Tu estudio ha sido creado correctamente. Ahora puedes subir videos a este estudio.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <Link to="/student/studies" className="flex-1">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="w-full border-slate-300 text-[#333333] text-[15px] font-medium py-[14px] rounded-[8px] hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                disabled={isCreating}
              >
                <ArrowLeft className="h-4 w-4" />
                Cancelar
              </Button>
            </Link>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[15px] font-medium py-[14px] rounded-[8px] shadow-sm hover:shadow transition-all"
              disabled={!title || title.length < 5 || isCreating}
            >
              Crear estudio
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
