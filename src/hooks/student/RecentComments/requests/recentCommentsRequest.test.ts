import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../config/config', () => ({
    config: { SERVER_URL: 'http://testserver' }
}));

import { fetchRecentComments } from './recentCommentsRequest';
import { RecentComment } from '../../../../types/RecentComment';

describe('fetchRecentComments (axios)', () => {
    let mock: AxiosMockAdapter;
    const userId = 123;
    const url = `http://testserver/study/${userId}/comments`;

    beforeAll(() => {
        mock = new AxiosMockAdapter(axios);
    });
    afterEach(() => mock.reset());
    afterAll(() => mock.restore());

    it('resuelve con array de comentarios cuando status 200', async () => {
        const fakeComments: RecentComment[] = [
            { id: 1, studyId: '1', text: 'Buen trabajo', author: 'profesor', date: '2025-05-11T08:30:00Z', videoId: '1' },
            { id: 2, studyId: '1', text: '¡Excelente!', author: 'profesor', date: '2025-05-11T08:30:00Z', videoId: '1' }
        ];
        mock.onGet(url).reply(200, { comments: fakeComments });

        const result = await fetchRecentComments(userId);
        expect(result).toEqual(fakeComments);
    });

    it('lanza error con mensaje personalizado cuando status != 2xx', async () => {
        mock.onGet(url).reply(500);
        await expect(fetchRecentComments(userId)).rejects.toThrow(
            'Error 500 al cargar comentarios'
        );
    });

    it('propaga errores de red u otros si no hay respuesta', async () => {
        mock.onGet(url).networkError();
        await expect(fetchRecentComments(userId)).rejects.toThrow();
    });
});
