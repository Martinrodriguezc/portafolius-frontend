import { useState } from "react";
import { createNewStudy } from "./request/studiesRequest";
import { authService } from "../../auth/authServices";
import { useNavigate } from "react-router-dom";

export function useCreateStudy() {
    const userId = authService.getCurrentUser()?.id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [createProgress, setCreateProgress] = useState(0);
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (!title || !description) {
            alert("Por favor completa los campos requeridos (título y fecha).");
            return;
        }

        setIsCreating(true);
        setCreateProgress(0);

        try {
            const studyId = await createNewStudy(userId!, title, description);

            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setCreateProgress(progress);

                if (progress >= 100) {
                    clearInterval(interval);
                    setIsCreating(false);
                    alert(`Estudio creado exitosamente (ID: ${studyId})`);
                    setTitle("");
                    setDescription("");
                    navigate('/student/studies')
                }
            }, 200);
        } catch (err) {
            console.error(err);
            alert("Ocurrió un error al crear el estudio.");
            setIsCreating(false);
        }
    };

    const handleCancel = () => {
        setTitle("");
        setDescription("");
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        isCreating,
        createProgress,
        handleSubmit,
        handleCancel
    };
}
