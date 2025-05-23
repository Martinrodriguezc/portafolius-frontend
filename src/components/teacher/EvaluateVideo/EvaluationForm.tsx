import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { Textarea } from "../../common/Textarea/Textarea";
import { RefreshCw, CheckCircle, Star } from "lucide-react";

interface Props {
  score: number;
  feedback: string;
  setScore(n: number): void;
  setFeedback(s: string): void;
  onSubmit(): void;
  submitting: boolean;
  existing: boolean;
}

export default function EvaluationForm({
  score,
  feedback,
  setScore,
  setFeedback,
  onSubmit,
  submitting,
  existing,
}: Props) {
  return (
    <div className="w-full lg:w-1/3 space-y-6">
      <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
          <h3 className="text-[16px] font-semibold text-[#333333]">
            {existing ? "Actualizar evaluación" : "Nueva evaluación"}
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-[15px] font-medium text-[#333333]">
              Calificación (1–10):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={10}
                value={score === 0 ? "" : score}
                onChange={(e) => {
                  const val = e.target.value;
                  const num = Number(val);
                  if (val === "") setScore(0);
                  else if (!isNaN(num) && num >= 1 && num <= 10) setScore(num);
                }}
                placeholder="Ingresa una nota"
                className="w-full px-3 py-2 border rounded-[8px]"
              />
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <span>/10</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[15px] font-medium text-[#333333]">
              Retroalimentación:
            </label>
            <Textarea
              placeholder="Proporciona retroalimentación..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full min-h-[200px]"
            />
          </div>

          <Button
            onClick={onSubmit}
            disabled={submitting || score < 1 || !feedback.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3"
          >
            {submitting ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                {existing ? "Actualizando..." : "Enviando..."}
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                {existing ? "Actualizar evaluación" : "Enviar evaluación"}
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
