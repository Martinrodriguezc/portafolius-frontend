import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { config } from "../../../config/config";
import { Student } from "../../../types/student";
import { authService } from "../../authServices";
import { useFetchStudentStudies } from "./useStudentForm";

/* ------------------------------------------------------------ */
/* helpers y tipos                                              */
/* ------------------------------------------------------------ */

interface FormState {
  firstName: string;
  lastName:  string;
  email:     string;
  password:  string;
}

const BACKEND_URL = config.SERVER_URL;           // mismo origen del resto
const MIN_PW_LEN  = 8;

/* ------------------------------------------------------------ */
/* hook principal                                               */
/* ------------------------------------------------------------ */

export function useStudentProfileTeacherPage(mode: "create" | "view") {
  /* -------- context / navegación ---------------------------- */
  const navigate  = useNavigate();
  const teacher   = authService.getCurrentUser();
  const teacherId = teacher?.id;

  /* -------- parámetro :id (solo modo view) ------------------ */
  const { id: paramId } = useParams();
  const studentId = Number(paramId);

  /* -------- estado estudiante (view) ------------------------ */
  const [student, setStudent]    = useState<Student | null>(null);
  const [stLoad, setStLoad]      = useState(false);
  const [stErr,  setStErr]       = useState<string>("");

  /* -------- formulario (create) ---------------------------- */
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName:  "",
    email:     "",
    password:  "",
  });
  const [formErr,      setFormErr]      = useState("");
  const [showPwReq,    setShowPwReq]    = useState(false);

  /* -------- estudios (view) -------------------------------- */
  const {
    studies,
    loading: studiesLoading,
    error:   studiesError,
  } = useFetchStudentStudies(mode === "view" ? studentId : NaN);

  /* ---------------------------------------------------------- */
  /* cargar estudiante (modo view)                              */
  /* ---------------------------------------------------------- */
  useEffect(() => {
    if (mode !== "view" || isNaN(studentId)) return;

    const load = async () => {
      setStLoad(true);
      try {
        const { data } = await axios.get<{ user: Student }>(
          `${BACKEND_URL}/users/${studentId}`,
          { headers: { Authorization: `Bearer ${authService.getToken()}` } }
        );
        setStudent(data.user);
      } catch (err: unknown) {
        setStErr(err instanceof Error ? err.message : "Error");
      } finally {
        setStLoad(false);
      }
    };

    void load();
  }, [mode, studentId]);

  /* ---------------------------------------------------------- */
  /* handlers form (create)                                     */
  /* ---------------------------------------------------------- */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormErr("");

    if (form.password.length < MIN_PW_LEN) {
      setShowPwReq(true);
      return;
    }

    try {
      await authService.register({
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        password:  form.password,
        role:      "estudiante",
      });

      /* éxito -> retroceder a lista de alumnos */
      navigate(-1);
    } catch (err: any) {
      setFormErr(err?.msg ?? "Error");
    }
  };

  /* ---------------------------------------------------------- */
  /* resultado del hook                                         */
  /* ---------------------------------------------------------- */
  return {
    /* contexto */
    teacherId,

    /* datos estudiante (view) */
    student,
    studentsLoading: stLoad,
    studentsError:   stErr,

    /* form (create) */
    form,
    handleChange,
    handleSubmit,
    showPasswordRequirements: showPwReq,
    formError: formErr,

    /* estudios (view) */
    studies,
    studiesLoading,
    studiesError,
  };
}