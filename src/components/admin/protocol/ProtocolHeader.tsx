import { ClipboardList, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  updatedAt?: string;
}

export default function ProtocolHeader({ title, updatedAt }: Props) {
  return (
    <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-full mt-1">
          <ClipboardList className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1 line-clamp-1">
            {title || "Editar Protocolo"}
          </h1>
          {updatedAt && (
            <p className="text-gray-500 text-sm">
              Última actualización: {new Date(updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <Link to="/admin/protocols">
        <button className="border border-slate-300 px-3 py-2 rounded-lg text-gray-700 hover:bg-slate-100 transition-colors flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a protocolos
        </button>
      </Link>
    </header>
  );
}
