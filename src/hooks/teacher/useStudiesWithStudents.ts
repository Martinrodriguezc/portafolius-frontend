// src/hooks/useStudiesWithStudent.ts
import { useState, useEffect } from 'react';
import { config } from '../../config/config';

export interface Study {
  id: number;
  student_id: number;
  title: string;
  protocol: string;
  status: string;
  created_at: string;
}

export interface StudyWithStudent {
  student_name: string;
  study: Study;
}

export function useStudiesWithStudent() {
  const [data, setData] = useState<StudyWithStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const resp = await fetch(`${config.SERVER_URL}/teacher/study-with-student`);
        if (!resp.ok) throw new Error(`Error ${resp.status}`);
        const json = await resp.json();
        setData(json.studies as StudyWithStudent[]);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  return { studiesWithStudent: data, loading, error };
}
