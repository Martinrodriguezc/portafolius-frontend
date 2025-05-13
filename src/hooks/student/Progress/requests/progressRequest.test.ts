import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../config/config', () => ({
  config: { SERVER_URL: 'http://testserver' }
}));

jest.mock('../../../auth/authServices', () => ({
  authService: { getToken: jest.fn() }
}));

import { fetchStudies, fetchEvaluations } from './progressRequests';
import { RawStudy } from '../../../../types/Study';
import { EvaluationForm } from '../../../../types/evaluation';
import { authService } from '../../../auth/authServices';

describe('studiesApi (axios)', () => {
  let mock: AxiosMockAdapter;

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('fetchStudies', () => {
    const userId = 42;
    const url = `http://testserver/study/${userId}`;

    it('lanza "No autorizado" si no hay token', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce(null);
      await expect(fetchStudies(userId)).rejects.toThrow('No autorizado');
      expect(authService.getToken).toHaveBeenCalled();
    });

    it('lanza "No autorizado" si el servidor responde 401', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(url).reply(401);
      await expect(fetchStudies(userId)).rejects.toThrow('No autorizado');
    });

    it('lanza error custom si status != 200 && !=401', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(url).reply(500);
      await expect(fetchStudies(userId)).rejects.toThrow(
        'Error 500 al obtener estudios'
      );
    });

    it('resuelve con array de RawStudy cuando status 200', async () => {
      const fakeStudies: RawStudy[] = [
        {
          id: '1',
          title: 'Estudio de prueba',
          description: 'Descripción del estudio',
          status: 'PENDIENTE',
          created_at: '2025-05-01T08:00:00Z',
          has_evaluation: false,
          score: null
        }
      ];
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(url).reply(200, { studies: fakeStudies });

      const result = await fetchStudies(userId);
      expect(result).toEqual(fakeStudies);
    });
  });

  describe('fetchEvaluations', () => {
    const userId = 99;
    const url = `http://testserver/evaluations?studentId=${userId}`;

    it('lanza "No autorizado" si no hay token', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce(undefined);
      await expect(fetchEvaluations(userId)).rejects.toThrow('No autorizado');
    });

    it('lanza "No autorizado" si status 401', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(url).reply(401);
      await expect(fetchEvaluations(userId)).rejects.toThrow('No autorizado');
    });

    it('resuelve [] si status 204', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(url).reply(204);
      await expect(fetchEvaluations(userId)).resolves.toEqual([]);
    });

    it('resuelve array si JSON es array de EvaluationForm', async () => {
      const fakeEvals: EvaluationForm[] = [
        {
          id: 1,
          study_id: 1,
          teacher_id: 2,
          submitted_at: '2025-05-02T10:30:00Z',
          score: 5,
          feedback_summary: 'Muy buen trabajo'
        }
      ];
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(url).reply(200, fakeEvals);

      const result = await fetchEvaluations(userId);
      expect(result).toEqual(fakeEvals);
    });

    it('resuelve array desde campo evaluations en objeto JSON', async () => {
      const fakeEvals: EvaluationForm[] = [
        {
          id: 2,
          study_id: 3,
          teacher_id: 4,
          submitted_at: '2025-05-03T14:15:00Z',
          score: 4,
          feedback_summary: 'Buenísimo'
        }
      ];
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(url).reply(200, { evaluations: fakeEvals });

      const result = await fetchEvaluations(userId);
      expect(result).toEqual(fakeEvals);
    });

    it('lanza error custom si status != 200,401,204', async () => {
      (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
      mock.onGet(url).reply(500);
      await expect(fetchEvaluations(userId)).rejects.toThrow(
        'Error 500 al obtener evaluaciones'
      );
    });
  });
});
