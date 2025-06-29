import { ReactNode } from "react"
import Card from "../Card/Card"

interface LoadingProps {
  title?: string
  description?: string
  className?: string
  cardClassName?: string
  showCard?: boolean
  children?: ReactNode
}

export default function Loading({
  title = "Cargando...",
  description = "Estamos procesando tu solicitud. Esto tomará solo un momento.",
  className = "",
  cardClassName = "",
  showCard = true,
  children
}: LoadingProps) {
  const loadingContent = (
    <div className={`flex flex-col items-center justify-center min-h-[300px] ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-[#4E81BD]/5 rounded-full animate-ping"></div>
        <div className="relative inline-block w-16 h-16 border-4 border-[#4E81BD]/20 border-t-[#4E81BD] rounded-full animate-spin mb-6"></div>
      </div>
      <p className="text-[18px] font-medium text-[#333333] mb-2">{title}</p>
      <p className="text-[#666666] text-center max-w-md">{description}</p>
      {children}
    </div>
  )

  if (showCard) {
    return (
      <Card className={`rounded-[16px] shadow-sm border border-slate-200 ${cardClassName}`}>
        <div className="p-8">
          {loadingContent}
        </div>
      </Card>
    )
  }

  return loadingContent
}
