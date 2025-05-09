import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { config }       from "../../../config/config";
import { authService }  from "../../auth/authServices";
import { Student }      from "../../../types/student";
import { Study }        from "../../../types/Study";

const BASE = config.SERVER_URL;

export function useStudentProfile(enabled = true) {
  const { id } = useParams();
  const studentId = Number(id);

  const [student,        setStudent]        = useState<Student | null>(null);
  const [studentLoading, setStudentLoading] = useState(true);
  const [studentError,   setStudentError]   = useState("");

  const [studies,        setStudies]        = useState<Study[]>([]);
  const [studiesLoading, setStudiesLoading] = useState(true);
  const [studiesError,   setStudiesError]   = useState("");

  useEffect(() => {
    if (!enabled || isNaN(studentId)) return;

    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(`${BASE}/users/${studentId}`, {
          headers: { Authorization: `Bearer ${authService.getToken()}` },
        });

        setStudent(
          (data.user  as Student) ??
          (data.data  as Student) ??
          (data       as Student)
        );
      } catch (err: unknown) {
        const msg =
          (err as AxiosError<{ msg: string }>)?.response?.data?.msg ?? "No encontrado";
        setStudentError(msg);
      } finally {
        setStudentLoading(false);
      }
    };

    fetchStudent();
  }, [enabled, studentId]);

  useEffect(() => {
    if (!enabled || isNaN(studentId)) return;

    const fetchStudies = async () => {
      try {
        const { data } = await axios.get<{ studies: Study[] }>(
          `${BASE}/study/${studentId}`
        );
        setStudies(data.studies);
      } catch (err: unknown) {
        const msg =
          (err as AxiosError<{ msg: string }>)?.response?.data?.msg ?? "Error";
        setStudiesError(msg);
      } finally {
        setStudiesLoading(false);
      }
    };

    fetchStudies();
  }, [enabled, studentId]);

  return {
    student, studentLoading, studentError,
    studies, studiesLoading, studiesError,
  };
}