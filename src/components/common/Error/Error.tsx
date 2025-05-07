import { AlertCircle, RefreshCw } from "lucide-react"
import Button from "../Button/Button"

interface Props {
    error: string;
}

export const ErrorDisplay = ({ error }: Props) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-[12px] p-6 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="bg-red-100 p-3 rounded-full shrink-0 self-center md:self-start">
                    <AlertCircle className="h-7 w-7 text-red-600" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-[20px] font-semibold text-red-700 mb-3">No se pudo cargar tu progreso</h2>
                    <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                        {error.toString() || "Ha ocurrido un error al obtener los datos de progreso."}
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
                <Button
                    onClick={() => {
                        window.location.reload()
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[8px] flex items-center shadow-sm hover:shadow transition-all"
                >
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin-slow" />
                    Intentar nuevamente
                </Button>
            </div>
        </div>
    )
}

