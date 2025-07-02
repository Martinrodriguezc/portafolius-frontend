import { useState } from "react";
import { ProtocolRubric, RubricSection, RubricItem, RubricLevel } from '../../../utils/rubrics/rubrics';
import { ChevronDown, ChevronUp, CheckCircle2, Circle, Save, ArrowLeft } from 'lucide-react';

interface GraderPanelProps {
  rubric: ProtocolRubric;
  responses: Record<string, number>;
  onChange(itemKey: string, value: number): void;
  comment: string;
  onCommentChange: (v: string) => void;
  onSave: () => void;
}

export default function GraderPanel({
  rubric,
  responses,
  onChange,
  comment,
  onCommentChange,
  onSave,
}: GraderPanelProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(rubric.sections.map((s) => [s.key, true]))
  );

  const toggleSection = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalScore = Object.values(responses).reduce((a, b) => a + b, 0);
  const percentage = Math.round(
    (totalScore / rubric.totalStudyMaxScore) * 100
  );

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Evaluación</h2>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Puntuación Total
            </span>
            <span className="text-sm text-gray-500">{percentage}%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {totalScore}
            </span>
            <span className="text-lg text-gray-500">
              / {rubric.totalStudyMaxScore}
            </span>
          </div>
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {rubric.sections.map((section: RubricSection) => (
            <div
              key={section.key}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <h3 className="font-semibold text-gray-900">{section.name}</h3>
                {openSections[section.key] ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openSections[section.key] && (
                <div className="p-4">
                  <div className="space-y-4">
                    {section.items.map((item: RubricItem) => (
                      <div
                        key={item.key}
                        className="border border-gray-100 rounded-lg p-4"
                      >
                        <h4 className="font-medium text-gray-900 mb-3">
                          {item.label}
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {item.levels.map((level: RubricLevel) => {
                            const selected =
                              responses[item.key] === level.value;
                            return (
                              <button
                                key={level.value}
                                onClick={() =>
                                  onChange(item.key, level.value)
                                }
                                className={`p-3 rounded-lg border-2 transition-all text-left ${selected
                                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                  }`}
                              >
                                <div className="flex items-center gap-3">
                                  {selected ? (
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span
                                        className={`font-semibold ${selected
                                            ? 'text-blue-900'
                                            : 'text-gray-900'
                                          }`}
                                      >
                                        {level.value} puntos
                                      </span>
                                    </div>
                                    <p
                                      className={`text-sm ${selected
                                          ? 'text-blue-700'
                                          : 'text-gray-600'
                                        }`}
                                    >
                                      {level.longDescription}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4 px-6">
        <h3 className="font-medium text-gray-700 mb-1">
          Comentarios para este intento
        </h3>
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Escribe tus comentarios para el estudiante…"
          className="w-full border border-gray-300 rounded p-2 h-24 resize-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <button
          onClick={onSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Guardar Evaluación
        </button>
      </div>
    </div>
  );
}
