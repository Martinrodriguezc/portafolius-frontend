import axios, { AxiosResponse } from 'axios';
import { config } from '../../../config/config';
import { Condition, Organ, Structure, Tag, TagResponse } from '../../../types/tag';

interface TagUtilsResponse {
    organs: Organ[];
    structures: Structure[];
    conditions: Condition[];
}

export async function fetchTagOptions(): Promise<TagUtilsResponse> {
    const response: AxiosResponse<TagUtilsResponse> = await axios.get(
        `${config.SERVER_URL}/video/tag_utils`,
        { validateStatus: () => true }
    );

    if (response.status !== 200) {
        throw new Error(`Error ${response.status} al cargar opciones de tags`);
    }
    return response.data;
}

export async function fetchTags(): Promise<Tag[]> {
    const response: AxiosResponse<TagResponse> = await axios.get(
        `${config.SERVER_URL}/video/tags`
    );
    if (response.data.success) {
        return response.data.tags;
    } else {
        throw new Error(response.data.msg || 'Error al obtener tags');
    }
}
