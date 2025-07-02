import { useState } from "react";
import { Interaction, ProfessorInteractionPayload } from '../../../types/interaction';
import { fetchInteractions, postProfessorInteraction } from '../../../hooks/upload/interactionsRequests/interactionRequest';

export type InteractionPayload = ProfessorInteractionPayload;

export function useInteractions(clipId: number) {
    const [interactions, setInteractions] = useState<Interaction[]>([]);

    async function load() {
        const data = await fetchInteractions(clipId);
        setInteractions(data);
    }

    async function send(payload: InteractionPayload) {
        await postProfessorInteraction(clipId, payload);
        await load();
    }

    return { interactions, load, send };
} 