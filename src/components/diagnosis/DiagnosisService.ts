export const sendDiagnosis = async ({
  videoId,
  diagnosis,
}: {
  videoId: string;
  diagnosis: string;
}) => {
  const response = await fetch(`/api/evaluation/diagnosis/${videoId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ diagnosis }),
  });

  if (!response.ok) {
    throw new Error("Error al guardar el diagnóstico");
  }

  return response.json();
};

export const getDiagnosedVideos = async (): Promise<string[]> => {
  const response = await fetch("/api/evaluation/diagnosis", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener videos diagnosticados");
  }

  const data = await response.json();
  return data.diagnosedVideoIds;
};
