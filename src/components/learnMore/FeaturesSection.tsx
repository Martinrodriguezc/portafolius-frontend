import { CheckCircle, Upload, Video, LineChart, MessageSquare } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Upload,
      title: 'Gestión de Estudios',
      items: [
        'Soporte para múltiples formatos de video (.mp4, .mov, .mpeg)',
        'Organización automática por protocolo y fecha de realización',
      ],
      desc: 'Suba y organice estudios de ultrasonido (videos de 3-5 segundos) por protocolo, manteniendo un orden cronológico.',
    },
    {
      icon: Video,
      title: 'Anotación de Videos',
      items: [
        'Herramientas de anotación en tiempo real',
        'Marcadores visuales para destacar estructuras anatómicas',
      ],
      desc: 'Los profesores pueden interactuar directamente con los videos, añadiendo anotaciones y proporcionando retroalimentación específica.',
    },
    {
      icon: LineChart,
      title: 'Seguimiento del Progreso',
      items: [
        'Gráficos de progreso por protocolo',
        'Estadísticas detalladas sobre desempeño a lo largo del tiempo',
      ],
      desc: 'Visualice su curva de aprendizaje para identificar áreas de mejora y celebrar avances.',
    },
    {
      icon: MessageSquare,
      title: 'Comunicación Efectiva',
      items: [
        'Sistema de mensajería directa',
        'Notificaciones sobre nuevos comentarios y evaluaciones',
      ],
      desc: 'Facilite la comunicación entre estudiantes y profesores a través de mensajería integrada.',
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-6 sm:mb-8 md:mb-10">
          Funcionalidades Principales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {features.map((feat, i) => (
            <div 
              key={i} 
              className="bg-white p-5 sm:p-6 md:p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4 bg-[#4E81BD]/10 rounded-lg">
                <feat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#4E81BD]" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2">{feat.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 mb-4">{feat.desc}</p>
              <ul className="space-y-2">
                {feat.items.map((item, j) => (
                  <li key={j} className="flex items-start">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#4E81BD] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
