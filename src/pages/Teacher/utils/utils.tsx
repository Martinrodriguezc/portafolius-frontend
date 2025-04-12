import { Video } from "../../../types/video";

export const filterVideosByStatus = (
  status: string,
  pendingVideos: Video[]
) => {
  return pendingVideos.filter((video) => video.status === status);
};

//Remove when fetched data from database
export const sampleVideoData: Video[] = [
  {
    id: 1,
    title: "Ecografía abdominal",
    date: "12 mayo, 2023",
    student: "Carlos Rodríguez",
    diagnosis: "Normal",
    status: "pendiente",
  },
  {
    id: 2,
    title: "Ecografía cardíaca",
    date: "5 mayo, 2023",
    student: "Ana Martínez",
    diagnosis: "Anormal",
    status: "pendiente",
  },
  {
    id: 3,
    title: "Ecografía obstétrica",
    date: "28 abril, 2023",
    student: "Laura Sánchez",
    diagnosis: "No concluyente",
    status: "evaluado",
  },
];
