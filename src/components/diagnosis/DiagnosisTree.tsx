import React from "react";

interface DiagnosisTreeProps {
  tree: any;
  selections: string[];
  onSelect: (level: number, value: string) => void;
}

const DiagnosisTree: React.FC<DiagnosisTreeProps> = ({ tree, selections, onSelect }) => {
  const [organ, structure] = selections;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Diagnóstico paso a paso</h3>

      {/* Nivel 1: Órgano */}
      <div>
        <p className="text-sm text-gray-600 mb-1">Selecciona un órgano:</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(tree).map((key) => (
            <button
              key={key}
              onClick={() => onSelect(0, key)}
              className={`px-4 py-2 rounded-lg border ${
                organ === key ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Nivel 2: Estructura */}
      {organ && (
        <div>
          <p className="text-sm text-gray-600 mb-1">Selecciona una estructura:</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(tree[organ]).map((key) => (
              <button
                key={key}
                onClick={() => onSelect(1, key)}
                className={`px-4 py-2 rounded-lg border ${
                  structure === key ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nivel 3: Condición */}
      {organ && structure && (
        <div>
          <p className="text-sm text-gray-600 mb-1">Selecciona una condición:</p>
          <div className="flex flex-wrap gap-2">
            {tree[organ][structure].map((option: string) => (
              <button
                key={option}
                onClick={() => onSelect(2, option)}
                className={`px-4 py-2 rounded-lg border ${
                  selections[2] === option ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisTree;
