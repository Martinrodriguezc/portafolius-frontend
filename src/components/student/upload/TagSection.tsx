import React from "react";
import Button from "../../common/Button/Button";
import { Label } from "../../common/Label/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../common/Select/Select";
import { Badge } from "../../common/Badge/Badge";
import { Plus, X } from "lucide-react";

interface TagSectionProps {
  selectedOrgan: string;
  setSelectedOrgan: (val: string) => void;
  selectedStructure: string;
  setSelectedStructure: (val: string) => void;
  selectedCondition: string;
  setSelectedCondition: (val: string) => void;
  organOptions: string[];
  structureOptions: Record<string, string[]>;
  conditionOptions: Record<string, string[]>;
  addTag: () => void;
  removeTag: (id: number) => void;
  tags: { id: number; text: string }[];
}

export function TagSection({
  selectedOrgan,
  setSelectedOrgan,
  selectedStructure,
  setSelectedStructure,
  selectedCondition,
  setSelectedCondition,
  organOptions,
  structureOptions,
  conditionOptions,
  addTag,
  removeTag,
  tags,
}: TagSectionProps) {
  return (
    <div className="space-y-4 border border-[#A0A0A0]/30 rounded-[16px] p-6">
      <h3 className="text-[16px] font-medium text-[#333333]">Etiquetas de diagnóstico</h3>
      <p className="text-[14px] text-[#A0A0A0]">
        Añade etiquetas para indicar qué estructuras y condiciones se muestran en tus videos
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="organ" className="text-[14px] text-[#333333]">
            Órgano
          </Label>
          <Select value={selectedOrgan} onValueChange={setSelectedOrgan}>
            <SelectTrigger id="organ" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
              <SelectValue placeholder="Selecciona órgano" />
            </SelectTrigger>
            <SelectContent>
              {organOptions.map((organ) => (
                <SelectItem key={organ} value={organ}>
                  {organ}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="structure" className="text-[14px] text-[#333333]">
            Estructura
          </Label>
          <Select value={selectedStructure} onValueChange={setSelectedStructure} disabled={!selectedOrgan}>
            <SelectTrigger id="structure" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
              <SelectValue placeholder="Selecciona estructura" />
            </SelectTrigger>
            <SelectContent>
              {selectedOrgan &&
                structureOptions[selectedOrgan]?.map((structure) => (
                  <SelectItem key={structure} value={structure}>
                    {structure}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition" className="text-[14px] text-[#333333]">
            Condición
          </Label>
          <Select value={selectedCondition} onValueChange={setSelectedCondition} disabled={!selectedStructure}>
            <SelectTrigger id="condition" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
              <SelectValue placeholder="Selecciona condición" />
            </SelectTrigger>
            <SelectContent>
              {selectedStructure &&
                conditionOptions[selectedStructure]?.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="button"
        onClick={addTag}
        disabled={!selectedOrgan || !selectedStructure || !selectedCondition}
        variant="outline"
        className="mt-2"
      >
        <Plus className="mr-2 h-4 w-4" />
        Añadir etiqueta
      </Button>

      {tags.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id} className="bg-[#4E81BD]/10 text-[#4E81BD] hover:bg-[#4E81BD]/20 px-3 py-1">
                {tag.text}
                <button onClick={() => removeTag(tag.id)} className="ml-2 text-[#4E81BD] hover:text-[#333333]">
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}