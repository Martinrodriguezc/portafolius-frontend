import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { Protocol, ProtocolItem } from "../../../types/protocol";

interface Props {
  protocol: Protocol;
  responses: { itemKey: string; score: number }[];
  updateScore: (itemKey: string, score: number) => void;
  onSubmit: () => void;
}

export default function ProtocolEvaluationForm({
  protocol,
  responses,
  updateScore,
  onSubmit,
}: Props) {
  return (
    <Card className="w-full lg:w-1/3 rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
        <h3 className="text-[16px] font-semibold text-[#333333]">
          Evaluación detallada: {protocol.name}
        </h3>
      </div>
      <div className="p-6 space-y-6">
        {protocol.sections.map(section => (
          <div key={section.key}>
            <h4 className="text-[15px] font-medium text-[#333333] mb-2">
              {section.name}
            </h4>
            {section.items.map((item: ProtocolItem) => {
              const resp = responses.find(r => r.itemKey === item.key)!;
              return (
                <div
                  key={item.key}
                  className="flex items-center gap-4 mb-2"
                >
                  <label className="w-3/4">{item.label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={item.max_score}
                      value={resp.score}
                      onChange={e =>
                        updateScore(item.key, Number(e.target.value))
                      }
                      className="w-16 px-2 py-1 border rounded"
                    />
                    <span>/ {item.max_score}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <Button
          onClick={onSubmit}
          className="w-full flex justify-center px-6 py-3"
        >
          Enviar evaluación
        </Button>
      </div>
    </Card>
  );
}
