import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export interface Protocol {
  id: number;
  title: string;
  description: string;
  steps: string[];
  created_by: number;
  created_at: string;
  updated_at?: string;
}

export function useAdminProtocol() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchProtocol = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/protocols/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProtocol(res.data);
      } catch (err: unknown) {
        setError("Error al cargar el protocolo");
      } finally {
        setLoading(false);
      }
    };
    fetchProtocol();
  }, [id]);

  const updateProtocol = async (data: { title: string; description: string; steps: string[] }) => {
    if (!id) return;
    setSubmitting(true);
    try {
      const res = await axios.put(
        `http://localhost:3000/api/protocols/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProtocol(res.data);
      alert("Protocolo actualizado correctamente");
      navigate("/admin/protocols");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el protocolo");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    protocol,
    loading,
    error,
    submitting,
    updateProtocol,
  };
}
