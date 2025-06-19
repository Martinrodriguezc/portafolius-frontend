import { FC } from "react";
import { useAttempts } from "../../../hooks/teacher/evaluations/useAttempts/useAttempts";
import { Props } from "../../../types/Props/Teacher/AttemptListProps";

const AttemptList: FC<Props> = ({ clipId }) => {
  const { attempts, loading, error } = useAttempts(clipId);

  if (loading) return <div>Cargando intentos…</div>;
  if (error)   return <div className="text-red-600">Error: {error}</div>;
  if (attempts.length === 0)
    return <div>No hay intentos previos.</div>;

  return (
    <div className="mt-6 p-4 border rounded">
      <h4 className="font-medium">Intentos previos</h4>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        {attempts.map(a => (
          <li key={a.id}>
            {new Date(a.submitted_at).toLocaleString()} —{" "}
            <span className="font-semibold">{a.total_score} puntos</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttemptList;
