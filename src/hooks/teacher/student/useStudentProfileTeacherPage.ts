import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { config }        from "../../../config/config";
import { Student }       from "../../../types/student";
import { authService }   from "../../authServices";
import { useFetchStudentStudies } from "./useStudentForm";

interface FormState {
  firstName: string;
  lastName:  string;
  email:     string;
  password:  string;
}

const BACKEND_URL = config.SERVER_URL;
const MIN_PW_LEN  = 8;


export function useStudentProfileTeacherPage(mode: "create" | "view") {

  const navigate   = useNavigate();
  const teacher    = authService.getCurrentUser();
  const teacherId  = teacher?.id;

  const { id: paramId } = useParams();
  const studentId = Number(paramId);

  const [student,  setStudent]  = useState<Student | null>(null);
  const [stLoad,   setStLoad]   = useState(false);
  const [stErr,    setStErr]    = useState("");

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName:  "",
    email:     "",
    password:  "",
  });
  const [formErr,      setFormErr]   = useState("");
  const [showPwReq,    setShowPwReq] = useState(false);

  const {
    studies,
    loading: studiesLoading,
    error:   studiesError,
  } = useFetchStudentStudies(mode === "view" ? studentId : NaN);

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
        const msg =
          (err as AxiosError<{ msg: string }>).response?.data?.msg ??
          (err instanceof Error ? err.message : "Error");
        setStErr(msg);
      } finally {
        setStLoad(false);
      }
    };

    void load();
  }, [mode, studentId]);

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

      navigate(-1);
    } catch (err: unknown) {
      const msg =
        (err as { msg?: string }).msg ??
        (err instanceof Error ? err.message : "Error");
      setFormErr(msg);
    }
  };

  return {
    teacherId,

    student,
    studentsLoading: stLoad,
    studentsError:   stErr,

    form,
    handleChange,
    handleSubmit,
    showPasswordRequirements: showPwReq,
    formError: formErr,

    studies,
    studiesLoading,
    studiesError,
  };
}