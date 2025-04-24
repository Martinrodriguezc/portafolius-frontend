import { useState } from "react";

export const useDiagnosis = () => {
  const [selections, setSelections] = useState<string[]>([]); // [órgano, estructura, condición]
  const [isConfirmed, setIsConfirmed] = useState(false);

  const selectAtLevel = (level: number, value: string) => {
    const updated = [...selections.slice(0, level), value];
    setSelections(updated);
    setIsConfirmed(false);
  };

  const confirmDiagnosis = () => {
    if (selections.length === 3) {
      setIsConfirmed(true);
      // Aquí podrías enviar a backend
    }
  };

  return {
    selections,
    isConfirmed,
    selectAtLevel,
    confirmDiagnosis,
  };
};
