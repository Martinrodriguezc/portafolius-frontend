import { Material, ErrorResponse, Interaction, VideoDetails, Protocol } from '../types/aiMaterial';
import { authService } from '../hooks/auth/authServices';
import { config } from '../config/config';

const API_BASE_URL = 'http://localhost:3000';

export const generateAIMaterial = async (
    clipId: number,
    feedback: string,
    additionalInfo: string
): Promise<Material> => {
    try {
        const response = await fetch(`${config.IA_SERVICE_URL}/generate-material`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                feedback: feedback,
            }),
        });

        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new Error(errorData.detail || 'Error generating AI material');
        }

        return await response.json();
    } catch (error) {
        console.error('Error generating AI material:', error);
        throw error;
    }
};

// New functions for detailed video information
export const getVideoInteractions = async (clipId: number): Promise<Interaction[]> => {
    try {
        const token = authService.getToken();
        if (!token) throw new Error("No autorizado");

        const response = await fetch(`${API_BASE_URL}/interactions/${clipId}/interaction`, {
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
    } catch (error) {
        console.error('Error fetching video interactions:', error);
        throw error;
    }
};

export const getVideoDetails = async (clipId: number): Promise<VideoDetails> => {
    try {
        const token = authService.getToken();
        if (!token) throw new Error("No autorizado");

        const response = await fetch(`${API_BASE_URL}/video/${clipId}/evaluation/details`, {
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
    } catch (error) {
        console.error('Error fetching video details:', error);
        throw error;
    }
};

export const getProtocol = async (protocolKey: string): Promise<Protocol> => {
    try {
        const token = authService.getToken();
        if (!token) throw new Error("No autorizado");

        const response = await fetch(`${API_BASE_URL}/protocols/${protocolKey}`, {
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
    } catch (error) {
        console.error('Error fetching protocol:', error);
        throw error;
    }
}; 