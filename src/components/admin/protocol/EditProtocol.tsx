import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Protocol, ProtocolType } from "../../../types/seeds";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { Label } from "../../common/Label/Label";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";

const EditProtocol: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Protocol, "createdAt" | "updatedAt">>({
    id: "",
    name: "",
    description: "",
    type: "fate",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) fetchProtocol(id);
  }, [id]);

  const fetchProtocol = async (id: string) => {
    try {
      const res = await fetch(`/api/protocols/${id}`);
      const data = await res.json();
      setForm(data);
    } catch (err) {
      console.error("Error al cargar el protocolo:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: ProtocolType) => {
    setForm((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/protocols/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al actualizar protocolo");
      navigate("/admin/protocol");
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al guardar los cambios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-xl font-semibold mb-6 text-[#333333]">Editar protocolo</h2>
      <div className="space-y-4">

        <div>
          <Label htmlFor="type">Tipo de protocolo</Label>
          <Select value={form.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fate">FATE</SelectItem>
              <SelectItem value="fast">FAST</SelectItem>
              <SelectItem value="rush">RUSH</SelectItem>
              <SelectItem value="blue">BLUE</SelectItem>
              <SelectItem value="focus">FOCUS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="name">Nombre Nuevo</Label>
          <Input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <textarea
            id="description"
            name="description"
            className="w-full border border-[#A0A0A0] rounded-[8px] p-2"
            rows={4}
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
};

export default EditProtocol;
