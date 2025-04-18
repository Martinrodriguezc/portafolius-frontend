export interface RecentComment {
  id: number;
  text: string;
  author: string;
  date: string;
  videoId: string;
}

export const dashboardConstants = {
  recentComments: [
    {
      id: 1,
      text:
        "Buen trabajo identificando la estructura hepática. Presta más atención a la orientación del transductor.",
      author: "Dr. García",
      date: "12 mayo, 2023",
      videoId: "1",
    },
    {
      id: 2,
      text:
        "Has mejorado notablemente en la visualización de las estructuras cardíacas. Sigue practicando las vistas apicales.",
      author: "Dra. Martínez",
      date: "5 mayo, 2023",
      videoId: "2",
    },
  ],
};