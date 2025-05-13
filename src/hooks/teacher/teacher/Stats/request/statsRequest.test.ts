import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../../config/config', () => ({
    config: { SERVER_URL: 'http://testserver' }
}));

jest.mock('../../../../auth/authServices', () => ({
    authService: { getToken: jest.fn() }
}));

import { fetchTeacherStats } from './statsRequest';
import { TeacherStats } from '../../../../../types/Teacher';
import { authService } from '../../../../auth/authServices';

describe('fetchTeacherStats (axios)', () => {
    let mock: AxiosMockAdapter;
    const teacherId = 10;
    const url = `http://testserver/teacher/${teacherId}/stats`;

    const fakeStats: TeacherStats = {
        pendingCount: 5,
        evaluatedToday: 12,
        studentCount: 10,
    };

    beforeAll(() => {
        mock = new AxiosMockAdapter(axios);
    });
    afterEach(() => {
        mock.reset();
        jest.clearAllMocks();
    });
    afterAll(() => mock.restore());

    it('lanza "No autorizado" si no hay token', async () => {
        (authService.getToken as jest.Mock).mockReturnValueOnce(null);
        await expect(fetchTeacherStats(teacherId)).rejects.toThrow('No autorizado');
    });

    it('lanza error si status != 200', async () => {
        (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
        mock.onGet(url).reply(403);
        await expect(fetchTeacherStats(teacherId)).rejects.toThrow(
            'Error 403 al obtener estadísticas'
        );
    });

    it('resuelve con datos de estadísticas cuando status 200', async () => {
        (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
        mock.onGet(url).reply(200, fakeStats);

        const result = await fetchTeacherStats(teacherId);
        expect(result).toEqual(fakeStats);
    });


    it('propaga errores de red', async () => {
        (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
        mock.onGet(url).networkError();
        await expect(fetchTeacherStats(teacherId)).rejects.toThrow();
    });
});
