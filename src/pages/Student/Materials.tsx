import { Card, CardContent }  from "../../components/common/Card/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/common/Tabs/Tabs";
import Button from "../../components/common/Button/Button";
import { FileText, Video, Download, ExternalLink } from "lucide-react";

export default function MaterialsPage() {
  // Datos de ejemplo para los materiales de estudio
  const documents = [
    {
      id: 1,
      title: "Guía de Ecografía Abdominal",
      description: "Manual completo sobre técnicas y hallazgos en ecografía abdominal",
      type: "pdf",
      date: "15 marzo, 2023",
      size: "4.2 MB",
    },
    {
      id: 2,
      title: "Anatomía del Corazón",
      description: "Documento detallado sobre estructuras cardíacas y su visualización ecográfica",
      type: "pdf",
      date: "10 febrero, 2023",
      size: "3.8 MB",
    },
    {
      id: 3,
      title: "Protocolo FAST",
      description: "Guía paso a paso para realizar el protocolo FAST en trauma",
      type: "pdf",
      date: "5 enero, 2023",
      size: "2.1 MB",
    },
  ]

  const videos = [
    {
      id: 1,
      title: "Ecografía de la Vena Aorta",
      description: "Video tutorial sobre la correcta visualización de la vena aorta",
      duration: "12:45",
      date: "20 abril, 2023",
    },
    {
      id: 2,
      title: "Identificación de Patologías Cardíacas",
      description: "Casos clínicos con diferentes patologías cardíacas",
      duration: "18:30",
      date: "15 marzo, 2023",
    },
    {
      id: 3,
      title: "Técnica de Barrido Abdominal",
      description: "Demostración de la técnica correcta para el barrido abdominal",
      duration: "09:15",
      date: "10 febrero, 2023",
    },
  ]

  const links = [
    {
      id: 1,
      title: "Sociedad Española de Ultrasonografía",
      description: "Recursos y guías clínicas actualizadas",
      url: "https://www.example.com/seu",
    },
    {
      id: 2,
      title: "Atlas de Anatomía Ecográfica",
      description: "Recurso interactivo para identificar estructuras anatómicas",
      url: "https://www.example.com/atlas",
    },
    {
      id: 3,
      title: "Revista Internacional de Ultrasonido",
      description: "Artículos científicos y casos clínicos",
      url: "https://www.example.com/journal",
    },
  ]

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Material de Estudio</h1>
        <p className="text-[#A0A0A0]">Recursos educativos para mejorar tus habilidades en ultrasonido</p>
      </header>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Documentos
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center">
            <Video className="mr-2 h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="links" className="flex items-center">
            <ExternalLink className="mr-2 h-4 w-4" />
            Enlaces
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="border-none shadow-sm rounded-[16px]">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-[#4E81BD]/10 p-3 rounded-lg mr-4">
                    <FileText className="h-6 w-6 text-[#4E81BD]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-medium text-[#333333]">{doc.title}</h3>
                    <p className="text-[14px] text-[#A0A0A0] mt-1">{doc.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-[13px] text-[#A0A0A0]">
                        <span className="mr-4">Fecha: {doc.date}</span>
                        <span>Tamaño: {doc.size}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#4E81BD] border-[#4E81BD] hover:bg-[#4E81BD]/10"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          {videos.map((video) => (
            <Card key={video.id} className="border-none shadow-sm rounded-[16px]">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-[#F4F4F4] w-full md:w-48 h-32 flex items-center justify-center rounded-lg mb-4 md:mb-0 md:mr-4">
                    <Video className="h-8 w-8 text-[#A0A0A0]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-medium text-[#333333]">{video.title}</h3>
                    <p className="text-[14px] text-[#A0A0A0] mt-1">{video.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-[13px] text-[#A0A0A0]">
                        <span className="mr-4">Fecha: {video.date}</span>
                        <span>Duración: {video.duration}</span>
                      </div>
                      <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white">Ver Video</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          {links.map((link) => (
            <Card key={link.id} className="border-none shadow-sm rounded-[16px]">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-[#4E81BD]/10 p-3 rounded-lg mr-4">
                    <ExternalLink className="h-6 w-6 text-[#4E81BD]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-medium text-[#333333]">{link.title}</h3>
                    <p className="text-[14px] text-[#A0A0A0] mt-1">{link.description}</p>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" className="text-[#4E81BD] border-[#4E81BD] hover:bg-[#4E81BD]/10">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visitar Sitio
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
