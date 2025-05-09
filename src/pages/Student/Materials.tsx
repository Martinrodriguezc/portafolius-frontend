import { useStudentMaterials } from "../../hooks/student/Materials/useStudentMaterials"
import { authService } from "../../hooks/auth/authServices"

import DocumentsTab from "../../components/student/materials/DocumentsTab"
import { VideosTab } from "../../components/student/materials/VideosTab"
import { LinksTab } from "../../components/student/materials/LinksTab"

import TabsContainer from "../../components/common/Tabs/TabsContainer"
import TabsList from "../../components/common/Tabs/TabsList"
import TabsButton from "../../components/common/Tabs/TabsButton"
import TabsPanel from "../../components/common/Tabs/TabsPanel"
import {
  AlertCircle,
  BookOpen,
  ExternalLink,
  FileText,
  RefreshCw,
  Search,
  Video,
  BookOpenCheck,
  Filter,
} from "lucide-react"

export default function MaterialsPage() {
  const user = authService.getCurrentUser()
  const studentId = user?.id
  const { isLoading, error } = useStudentMaterials(Number(studentId))

  // Page header component - extracted for reuse in all states
  const PageHeader = () => (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full">
          <BookOpen className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <h1 className="text-[24px] font-bold text-[#333333]">Material de Estudio</h1>
      </div>
      <p className="text-[#666666] ml-12">Recursos educativos para mejorar tus habilidades en ultrasonido</p>
    </header>
  )

  if (!studentId) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0 self-center md:self-start">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">Sesión expirada</h2>
              <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                Tu sesión ha expirado o no has iniciado sesión. Por favor, inicia sesión nuevamente para acceder a los
                materiales de estudio.
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-center md:justify-start">
            <button
              onClick={() => {
                window.location.href = "/login"
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[8px] flex items-center shadow-sm hover:shadow transition-all"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
            <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin mb-6"></div>
          </div>
          <p className="text-[18px] font-medium text-[#333333] mb-2">Cargando materiales</p>
          <p className="text-[#666666] text-center max-w-md">
            Estamos recuperando los materiales de estudio disponibles para ti. Esto tomará solo un momento.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 md:p-10 max-w-7xl mx-auto">
        <PageHeader />

        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full shrink-0 self-center md:self-start">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[20px] font-semibold text-red-700 mb-3">No se pudieron cargar los materiales</h2>
              <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                {error.toString() || "Ha ocurrido un error al obtener los materiales de estudio."}
              </p>
              <div className="space-y-2 text-[15px] text-red-600 bg-red-100/50 p-4 rounded-lg inline-block md:block">
                <p className="font-medium">Esto puede deberse a:</p>
                <ul className="list-disc pl-5 space-y-2 text-left">
                  <li>Problemas de conexión a internet</li>
                  <li>El servidor no está disponible en este momento</li>
                  <li>Tu sesión ha expirado</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center md:justify-start">
            <button
              onClick={() => {
                window.location.reload()
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[8px] flex items-center shadow-sm hover:shadow transition-all"
            >
              <RefreshCw className="h-5 w-5 mr-2 animate-spin-slow" />
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <PageHeader />

      {/* Materials Summary Card */}
      <div className="mb-8 bg-gradient-to-r from-[#4E81BD]/5 to-[#4E81BD]/10 rounded-[16px] shadow-sm border border-[#4E81BD]/20 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#4E81BD]/20 p-3 rounded-full">
              <BookOpenCheck className="h-8 w-8 text-[#4E81BD]" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#333333]">Biblioteca de recursos</h2>
              <p className="text-[#666666]">
                Tienes acceso a{" "}
                <span className="font-medium text-[#4E81BD]">
                </span>{" "}
                educativos
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-[#4E81BD]/20 text-center">
              <div className="flex items-center justify-center mb-1">
                <FileText className="h-5 w-5 text-[#4E81BD]" />
              </div>
              <p className="text-xs text-[#666666]">Documentos</p>
              <p className="text-sm font-medium text-[#333333]"></p>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-[#4E81BD]/20 text-center">
              <div className="flex items-center justify-center mb-1">
                <Video className="h-5 w-5 text-[#4E81BD]" />
              </div>
              <p className="text-xs text-[#666666]">Videos</p>
              <p className="text-sm font-medium text-[#333333]"></p>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-[#4E81BD]/20 text-center">
              <div className="flex items-center justify-center mb-1">
                <ExternalLink className="h-5 w-5 text-[#4E81BD]" />
              </div>
              <p className="text-xs text-[#666666]">Enlaces</p>
              <p className="text-sm font-medium text-[#333333]"></p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar materiales..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700">Filtrar</span>
          </button>
          <select className="px-4 py-2 border border-slate-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD] bg-white">
            <option value="recent">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-6 animate-fadeIn">
        <TabsContainer defaultValue="documents" className="w-full">
          <TabsList className="mb-8 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-hide">
            <TabsButton value="documents" >
              <FileText className="h-4 w-4" />
              Documentos 
            </TabsButton>
            <TabsButton value="videos" >
              <Video className="h-4 w-4" />
              Videos 
            </TabsButton>
            <TabsButton value="links">
              <ExternalLink className="h-4 w-4" />
              Enlaces 
            </TabsButton>
          </TabsList>

          <TabsPanel value="documents">
            <DocumentsTab documents={[]} />
          </TabsPanel>
          <TabsPanel value="videos">
            <VideosTab videos={[]} />
          </TabsPanel>
          <TabsPanel value="links">
            <LinksTab links={[]} />
          </TabsPanel>
        </TabsContainer>
      </div>
    </div>
  )
}
