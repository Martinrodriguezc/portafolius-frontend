import { Material, ErrorResponse, Interaction, VideoDetails, Protocol } from '../../../types/aiMaterial';
import { authService } from '../../auth/authServices';
import { config } from '../../../config/config';


const extractJsonFromMarkdown = (text: string): Material => {
    try {
        return JSON.parse(text);
    } catch {
        const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[1]);
            } catch (parseError) {
                console.error('Failed to parse JSON from markdown:', parseError);
                throw new Error('Respuesta del AI no tiene un formato JSON válido');
            }
        }
        
        
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
            try {
                return JSON.parse(text.substring(jsonStart, jsonEnd + 1));
            } catch (parseError) {
                console.error('Failed to parse JSON from text:', parseError);
                throw new Error('Respuesta del AI no tiene un formato JSON válido');
            }
        }
        
        throw new Error('No se encontró JSON válido en la respuesta del AI');
    }
};

export const generateAIMaterial = async (
    clipId: number,
    feedback: string,
    additionalInfo: string
): Promise<Material> => {
    if (!config.IA_SERVICE_URL) {
        throw new Error('IA Service URL no está configurado. Por favor, verifica la configuración.');
    }

    const response = await fetch(`${config.IA_SERVICE_URL}/generate-material`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            feedback: feedback,
            additionalInfo: additionalInfo,
            clipId: clipId
        }),
    });

    if (!response.ok) {
        if (response.status === 0) {
            throw new Error('No se puede conectar al servicio de IA. Verifica que el servidor esté ejecutándose.');
        }
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.detail || `Error del servidor: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('AI Service Response:', responseText);
    
    const material = extractJsonFromMarkdown(responseText);
    
    if (!material.summary || !material.objectives || !material.resources || !material.quiz) {
        console.error('Invalid material structure:', material);
        throw new Error('La respuesta del AI no contiene todos los campos requeridos');
    }

    return material;
};

export const getVideoInteractions = async (clipId: number): Promise<Interaction[]> => {
    const token = authService.getToken();
    if (!token) throw new Error("No autorizado");

    const response = await fetch(`${config.SERVER_URL}/interactions/${clipId}/interaction`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if (!response.ok) {
        if (response.status === 401) throw new Error("No autorizado");
        throw new Error('Error fetching video interactions');
    }

    return await response.json();
};

export const getVideoDetails = async (clipId: number): Promise<VideoDetails> => {
    const token = authService.getToken();
    if (!token) throw new Error("No autorizado");

    const response = await fetch(`${config.SERVER_URL}/video/${clipId}/evaluation/details`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if (!response.ok) {
        if (response.status === 401) throw new Error("No autorizado");
        throw new Error('Error fetching video details');
    }

    return await response.json();
};

export const getProtocol = async (protocolKey: string): Promise<Protocol> => {
    const token = authService.getToken();
    if (!token) throw new Error("No autorizado");

    const response = await fetch(`${config.SERVER_URL}/protocols/${protocolKey}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if (!response.ok) {
        if (response.status === 401) throw new Error("No autorizado");
        throw new Error('Error fetching protocol');
    }

    return await response.json();
}; 