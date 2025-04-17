export const generateUploadUrl = async (file: File) => {
  const response = await fetch("http://localhost:4000/video/generate_upload_url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
    }),
  });

  if (!response.ok) {
    console.log(response)
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener la URL prefirmada");
  }

  const data = await response.json();
  const uploadUrl = data;
  return uploadUrl;
};

export const uploadVideo = async (uploadUrl: string, file: File) => {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
  console.log(response)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al subir el archivo a S3");
  }

  console.log("Archivo subido exitosamente");
  return { success: true, message: "Archivo subido correctamente" };
};
