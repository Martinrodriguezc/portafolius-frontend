import { useEffect, useState } from "react";
import { fetchStudies, fetchEvaluations } from "./requests/progressRequests";
import { ProgressData } from "../../../types/ProgressData";
import { EvaluationForm } from "../../../types/evaluation";

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
        const studies = await fetchStudies(userId) || [];
        const evalRaw = await fetchEvaluations(userId);
        const evalForms: EvaluationForm[] = Array.isArray(evalRaw)
          ? evalRaw
          : [];

        const totalStudies = studies.length;
        const evaluatedStudies = evalForms.length;
        const pendingStudies = totalStudies - evaluatedStudies;
        const averageScore = evaluatedStudies > 0
          ? parseFloat(
              (
                evalForms.reduce((sum, e) => sum + e.score, 0) /
                evaluatedStudies
              ).toFixed(1)
            )
          : 0;

        const mapM = new Map<string, { sum: number; count: number }>();
        evalForms.forEach((e) => {
          const month = new Date(e.submitted_at).toLocaleString("es", { month: "long" });
          const prev = mapM.get(month) || { sum: 0, count: 0 };
          prev.sum += e.score;
          prev.count++;
          mapM.set(month, prev);
        });
        const monthlyProgress = Array.from(mapM.entries()).map(
          ([month, { sum, count }]) => ({
            month,
            studies: count,
            score: count > 0 ? parseFloat((sum / count).toFixed(1)) : 0,
          })
        );

        const mapP = new Map<string, { sum: number; count: number }>();
        studies.forEach((s) => {
          const entry = mapP.get(s.protocol) || { sum: 0, count: 0 };
          const ev = evalForms.find((ev) => ev.study_id === s.id); 
          if (ev) {
            entry.sum += ev.score;
            entry.count++;
          }
          mapP.set(s.protocol, entry);
        });
        const protocolPerformance = Array.from(mapP.entries()).map(
          ([protocol, { sum, count }]) => ({
            protocol,
            studies: count,
            score: count > 0 ? parseFloat((sum / count).toFixed(1)) : 0,
          })
        );

        const recentFeedback = evalForms
          .sort((a, b) => Date.parse(b.submitted_at) - Date.parse(a.submitted_at))
          .slice(0, 5)
          .map((e) => {
            const st = studies.find((st) => st.id === e.study_id);
            return {
              id: e.id,
              date: new Date(e.submitted_at).toLocaleDateString("es", {
                day: "numeric", month: "long", year: "numeric",
              }),
              protocol: st?.protocol || "",
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
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [userId]);

  return { data, loading, error };
}