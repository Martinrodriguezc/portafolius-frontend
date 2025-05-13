import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { fetchTagOptions, fetchTags } from './requests';
import { Tag, TagResponse } from '../../../types/tag';

jest.mock('../../../config/config', () => ({
    config: { SERVER_URL: 'http://testserver' }
}));

describe('fetchTagOptions', () => {
    let mock: AxiosMockAdapter;
    beforeAll(() => {
        mock = new AxiosMockAdapter(axios);
    });
    afterEach(() => mock.reset());
    afterAll(() => mock.restore());

    it('devuelve datos cuando status 200', async () => {
        const fake = {
            organs: [{ id: 1, name: 'O1' }],
            structures: [{ id: 2, name: 'S1' }],
            conditions: [{ id: 3, name: 'C1' }],
        };
        mock.onGet('http://testserver/video/tag_utils').reply(200, fake);
        await expect(fetchTagOptions()).resolves.toEqual(fake);
    });

    it('lanza el mensaje customizado cuando status != 200', async () => {
        mock.onGet('http://testserver/video/tag_utils').reply(500);
        await expect(fetchTagOptions()).rejects.toThrow(
            'Error 500 al cargar opciones de tags'
        );
    });
});

describe('fetchTags', () => {
    let mock: AxiosMockAdapter;
    const url = 'http://testserver/video/tags';

    beforeAll(() => {
        mock = new AxiosMockAdapter(axios);
    });
    afterEach(() => mock.reset());
    afterAll(() => mock.restore());

    it('resuelve con la lista de tags cuando success es true', async () => {
        const fakeTags: Tag[] = [
            {
                id: 't1',
                name: 'Tag1',
                organ: 'Heart',
                structure: 'Valve',
                condition: 'Healthy',
                created_by: 'user123'
            },
            {
                id: 't2',
                name: 'Tag2',
                organ: 'Lung',
                structure: 'Bronchiole',
                condition: 'Inflamed'
            }
        ];
        const resp: TagResponse = { success: true, tags: fakeTags, msg: '' };
        mock.onGet(url).reply(200, resp);

        await expect(fetchTags()).resolves.toEqual(fakeTags);
    });

    it('lanza error con el mensaje devuelto cuando success es false', async () => {
        const resp: TagResponse = { success: false, tags: [], msg: 'Algo falló' };
        mock.onGet(url).reply(200, resp);

        await expect(fetchTags()).rejects.toThrow('Algo falló');
    });

    it('lanza error genérico si no hay msg', async () => {
        const resp: TagResponse = { success: false, tags: [], msg: '' };
        mock.onGet(url).reply(200, resp);

        await expect(fetchTags()).rejects.toThrow('Error al obtener tags');
    });

    it('propaga errores de red', async () => {
        mock.onGet(url).networkError();

        await expect(fetchTags()).rejects.toThrow();
    });
});