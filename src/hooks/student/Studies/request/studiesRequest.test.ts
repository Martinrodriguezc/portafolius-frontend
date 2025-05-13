import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../config/config', () => ({
  config: { SERVER_URL: 'http://testserver' }
}));

jest.mock('../../../auth/authServices', () => ({
  authService: { getToken: jest.fn() }
}));

import { createNewStudy, fetchStudentStudies } from './studiesRequest';
import { RawStudy } from '../../../../types/Study';
import { authService } from '../../../auth/authServices';

describe('studyRequests (axios)', () => {
  let mock: AxiosMockAdapter;
  const userId = 'u123';

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
  });
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });
  afterAll(() => mock.restore());

  describe('createNewStudy', () => {
    const endpoint = `http://testserver/study/${userId}/studies`;

    it('resuelve con el id devuelto por el backend', async () => {
      mock.onPost(endpoint).reply(201, { study: { id: 's456' } });
      const id = await createNewStudy(userId, 'Título', 'Desc');
      expect(id).toBe('s456');
    });

    it('lanza error con el message del backend si hay status ≥400', async () => {
      mock
        .onPost(endpoint)
        .reply(400, { message: 'Título duplicado' }, { 'Content-Type': 'application/json' });
      await expect(createNewStudy(userId, 'Título', 'Desc')).rejects.toThrow(
        'Título duplicado'
      );
    });

    it('lanza error genérico si no hay campo message', async () => {
      mock.onPost(endpoint).reply(500, {}, { 'Content-Type': 'application/json' });
      await expect(createNewStudy(userId, 'T', 'D')).rejects.toThrow(
        'Error 500 al crear el estudio'
      );
    });

    it('propaga errores de red', async () => {
      mock.onPost(endpoint).networkError();
      await expect(createNewStudy(userId, 'T', 'D')).rejects.toThrow();
    });
  });

  describe('fetchStudentStudies', () => {
    const endpoint = `http://testserver/study/${userId}`;
    const fakeStudies: RawStudy[] = [
      {
        id: '1',
        title: 'X',
        description: 'Y',
        status: 'PENDIENTE',
        created_at: '2025-05-01T00:00:00Z',
        has_evaluation: false,
        score: null
      }
    ];

    it('lanza "No autorizado" si no hay token', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce(null);
      await expect(fetchStudentStudies(userId)).rejects.toThrow('No autorizado');
    });

    it('lanza error si status != 200', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(endpoint).reply(403);
      await expect(fetchStudentStudies(userId)).rejects.toThrow(
        'Error 403 al obtener estudios'
      );
    });

    it('resuelve con el array de RawStudy cuando status 200', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(endpoint).reply(200, { studies: fakeStudies });
      const result = await fetchStudentStudies(userId);
      expect(result).toEqual(fakeStudies);
    });

    it('propaga errores de red', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(endpoint).networkError();
      await expect(fetchStudentStudies(userId)).rejects.toThrow();
    });
  });
});
