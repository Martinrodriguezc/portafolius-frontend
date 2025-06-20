import axios, { AxiosResponse } from 'axios';
import { Interaction, StudentInteractionPayload, ProfessorInteractionPayload } from '../../../types/interaction';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const postStudentInteraction = async (
  clipId: number,
  payload: StudentInteractionPayload
): Promise<Interaction> => {
  const token = localStorage.getItem("auth_token");
  const res: AxiosResponse<Interaction> = await api.post(
    `/interactions/${clipId}/interaction`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const postProfessorInteraction = async (
  clipId: number,
  payload: ProfessorInteractionPayload
): Promise<Interaction> => {
  const token = localStorage.getItem("auth_token");
  const res: AxiosResponse<Interaction> = await api.post(
    `/interactions/${clipId}/interaction/review`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const fetchInteractions = async (
  clipId: number
): Promise<Interaction[]> => {
  const token = localStorage.getItem("auth_token");
  const res: AxiosResponse<Interaction[]> = await api.get(
    `/interactions/${clipId}/interaction`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};