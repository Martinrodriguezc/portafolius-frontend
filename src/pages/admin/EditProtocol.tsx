import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button/Button";
import { Protocol } from "../../types/seeds";
import { Pencil, Trash2 } from "lucide-react";



const EditProtocols: React.FC = () => {
  const [protocols, setProtocols] = useState<Protocol[]>([]);

  useEffect(() => {
    fetchProtocols();
  }, []);

  const fetchProtocols = async () => {
    try {
      const res = await fetch("/api/protocols");
      const data = await res.json();
      setProtocols(data);
    } catch (error) {
      console.error("Error al cargar protocolos:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("¿Estás segura de que quieres eliminar este protocolo?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/protocols/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      setProtocols((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar protocolo:", error);
    }
  };

  const handleEdit = (id: string) => {
    // Más adelante puedes usar navigate(`/admin/protocol/edit/${id}`)
    alert(`Editar protocolo con id: ${id}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Protocolos existentes</h3>
      <table className="w-full text-sm text-left border border-slate-200">
        <thead className="bg-slate-50 text-gray-600">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2 w-32">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {protocols.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2 uppercase">{p.type}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button variant="ghost" onClick={() => handleEdit(p.id!)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => handleDelete(p.id!)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditProtocols;
