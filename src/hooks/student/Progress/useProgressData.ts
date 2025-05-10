import { useEffect, useState } from "react";
import { fetchStudies, fetchEvaluations } from "./requests/progressRequests";
import { ProgressData } from "../../../types/ProgressData";
import { EvaluationForm } from "../../../types/evaluation";
import { RawStudy, Study } from "../../../types/Study";

const initialProgressData: ProgressData = {
  totalStudies: 0,
  evaluatedStudies: 0,
  pendingStudies: 0,
  averageScore: 0,
  monthlyProgress: [],
  protocolPerformance: [],
  recentFeedback: [],
};

export function useProgressData(userId: number) {
  const [data, setData] = useState<ProgressData>(initialProgressData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const rawStudies: RawStudy[] = await fetchStudies(userId);
        const studies: Study[] = rawStudies.map((s) => ({
          id: Number(s.id),
          title: s.title,
          description: s.description,
          created_at: s.created_at,
          status: s.has_evaluation ? "EVALUADO" : "PENDIENTE",
          score: s.score ?? null,
        }));

        const evalForms: EvaluationForm[] = await fetchEvaluations(userId);

        const scored = studies.filter(
          (s): s is Study & { score: number } => s.score !== null
        );

        const totalStudies = studies.length;
        const evaluatedStudies = scored.length;
        const pendingStudies = totalStudies - evaluatedStudies;
        const averageScore =
          evaluatedStudies > 0
            ? Number(
              (
                scored.reduce((sum, s) => sum + s.score, 0) /
                evaluatedStudies
              ).toFixed(1)
            )
            : 0;

        const monthMap = new Map<string, { sum: number; count: number }>();
        scored.forEach((s) => {
          const month = new Date(s.created_at).toLocaleString("es", {
            month: "long",
          });
          const agg = monthMap.get(month) || { sum: 0, count: 0 };
          agg.sum += s.score;
          agg.count++;
          monthMap.set(month, agg);
        });
        const monthlyProgress = [...monthMap.entries()].map(
          ([month, { sum, count }]) => ({
            month,
            studies: count,
            score: Number((sum / count).toFixed(1)),
          })
        );

        const protoMap = new Map<string, { sum: number; count: number }>();
        scored.forEach((s) => {
          const agg = protoMap.get(s.description) || { sum: 0, count: 0 };
          agg.sum += s.score;
          agg.count++;
          protoMap.set(s.description, agg);
        });
        const protocolPerformance = [...protoMap.entries()].map(
          ([protocol, { sum, count }]) => ({
            protocol,
            studies: count,
            score: Number((sum / count).toFixed(1)),
          })
        );

        const recentFeedback = [...evalForms]
          .sort(
            (a, b) => Date.parse(b.submitted_at) - Date.parse(a.submitted_at)
          )
          .slice(0, 5)
          .map((e) => {
            const st = studies.find((st) => st.id === e.study_id);
            return {
              id: e.id,
              date: new Date(e.submitted_at).toLocaleDateString("es", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
              protocol: st?.description ?? "",
              score: e.score,
              comment: e.feedback_summary,
            };
          });

        setData({
          totalStudies,
          evaluatedStudies,
          pendingStudies,
          averageScore,
          monthlyProgress,
          protocolPerformance,
          recentFeedback,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [userId]);

  return { data, loading, error };
}