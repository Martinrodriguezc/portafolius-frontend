import { useState } from "react";
import { RubricLevel, RubricItem, RubricSection, ProtocolRubric } from "../../../utils/rubrics/rubrics";
import { ChevronDown, ChevronUp, ArrowRightCircle } from "lucide-react";

interface Props {
  rubric: ProtocolRubric;
  responses: Record<string, number>;
  onChange(itemKey: string, value: number): void;
}

export default function GraderPanel({ rubric, responses, onChange }: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(rubric.sections.map((s) => [s.key, true]))
  );

  const toggleSection = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalScore = Object.values(responses).reduce((a, b) => a + b, 0);

  return (
    <aside className="w-1/3 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-auto bg-white shadow-lg p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2">Score de entrega</h2>
        <input
          type="number"
          className="w-full border px-2 py-1 rounded"
          min={0}
          max={rubric.totalStudyMaxScore}
          value={totalScore}
          readOnly
        />
        <p className="text-sm text-gray-500 mt-1">
          / {rubric.totalStudyMaxScore} pts
        </p>
      </div>

      {/* Sections */}
      {rubric.sections.map((sec: RubricSection) => (
        <div key={sec.key} className="mb-6">
          <button
            onClick={() => toggleSection(sec.key)}
            className="w-full flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
          >
            <span className="font-medium">{sec.name}</span>
            {openSections[sec.key] ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {openSections[sec.key] && (
            <table className="w-full mt-2 text-sm">
              <thead>
                <tr>
                  <th className="text-left pb-1">Ítem</th>
                  {sec.items[0].levels.map((lvl: RubricLevel) => (
                    <th key={lvl.value} className="text-center px-1 pb-1">
                      {lvl.value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sec.items.map((item: RubricItem) => (
                  <tr key={item.key} className="border-t">
                    <td className="py-1">{item.label}</td>
                    {item.levels.map((lvl: RubricLevel) => {
                      const selected = responses[item.key] === lvl.value;
                      return (
                        <td key={lvl.value} className="py-1 text-center">
                          <button
                            title={lvl.longDescription}
                            onClick={() => onChange(item.key, lvl.value)}
                            className="relative inline-block w-6 h-6"
                          >
                            {selected && (
                              <ArrowRightCircle className="text-green-500 absolute inset-0 mx-auto" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </aside>
  );
}
