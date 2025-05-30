import axios from "axios";
import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { Label } from "../../common/Label/Label";

export default function CreateProtocolPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);

  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const addStep = () => setSteps([...steps, ""]);

  const removeStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/admin/protocols", 
        {
          title,
          description,
          steps,
          createdBy: 1, // temporal: esto debe venir del token JWT decodificado
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Protocolo creado correctamente");
      setTitle("");
      setDescription("");
      setSteps([""]);
    } catch (error) {
      alert("Error al crear protocolo");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-xl font-semibold mb-6 text-[#333333]">Crear protocolo</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Nombre</Label>
          <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <textarea
            id="description"
            name="description"
            className="w-full border border-[#A0A0A0] rounded-[8px] p-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Pasos</Label>
          {steps.map((step, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Paso ${index + 1}`}
              />
              {steps.length > 1 && (
                <Button type="button" variant="ghost" onClick={() => removeStep(index)}>
                  🗑
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addStep}>
            ➕ Agregar paso
          </Button>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar protocolo"}
        </Button>
      </form>
    </div>
  );
}
