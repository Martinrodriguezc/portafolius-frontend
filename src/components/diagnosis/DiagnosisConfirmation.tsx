import React from "react";

interface Props {
  selectedDiagnosis: string | null;
  onConfirm: () => void;
  isConfirmed: boolean;
}

const DiagnosisConfirmation: React.FC<Props> = ({ selectedDiagnosis, onConfirm, isConfirmed }) => {
  if (!selectedDiagnosis) return null;

  return (
    <div className="mt-4 p-4 bg-[#F4F4F4] rounded-[8px]">
      <p className="text-[14px] text-[#333] mb-2">
        Diagnóstico seleccionado: <strong>{selectedDiagnosis}</strong>
      </p>
      {!isConfirmed ? (
        <button
          onClick={onConfirm}
          className="bg-[#4E81BD] text-white py-2 px-4 rounded-[8px] hover:bg-[#4E81BD]/90"
        >
          Confirmar diagnóstico
        </button>
      ) : (
        <p className="text-green-600 font-medium">¡Diagnóstico confirmado!</p>
      )}
    </div>
  );
};

export default DiagnosisConfirmation;
