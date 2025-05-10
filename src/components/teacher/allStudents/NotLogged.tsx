import { AlertCircle } from "lucide-react"

export const NotLoggedAlert = () => {
    return (

        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="bg-red-100 p-3 rounded-full shrink-0 self-center md:self-start">
                    <AlertCircle className="h-7 w-7 text-red-600" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-[20px] font-semibold text-red-700 mb-3">Sesión expirada</h2>
                    <p className="text-[15px] text-red-600 mb-4 max-w-3xl">
                        Tu sesión ha expirado o no has iniciado sesión. Por favor, inicia sesión nuevamente para acceder a la
                        gestión de estudiantes.
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
        </div>)
}