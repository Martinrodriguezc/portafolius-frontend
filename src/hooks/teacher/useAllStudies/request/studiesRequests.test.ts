import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../config/config', () => ({
  config: { SERVER_URL: 'http://testserver' }
}));

import { fetchAllStudiesRequest } from './studiesRequest';
import { StudyWithStatus } from '../../../../types/Study';

describe('fetchAllStudiesRequest (axios)', () => {
  let mock: AxiosMockAdapter;
  const url = `http://testserver/study/teacher/study-with-status`;

  const fakeStudies: StudyWithStatus[] = [
    {
      study_id: 101,
      title: 'Estudio A',
      description: 'Descripción A',
      status: 'PENDIENTE',
      created_at: '2025-05-01T09:00:00Z',
      has_evaluation: false,
      first_name: 'Ana',
      last_name: 'Pérez',
      email: 'ana.perez@uni.cl',
      score: 0,
    },
    {
      study_id: 102,
      title: 'Estudio B',
      description: 'Descripción B',
      status: 'EVALUADO',
      created_at: '2025-05-02T10:30:00Z',
      has_evaluation: true,
      first_name: 'Luis',
      last_name: 'Gómez',
      email: 'luis.gomez@uni.cl',
      score: 88,
    },
  ];

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
  });
  afterEach(() => mock.reset());
  afterAll(() => mock.restore());

  it('resuelve el array de estudios cuando status 200', async () => {
    mock.onGet(url).reply(200, { studies: fakeStudies });
    const result = await fetchAllStudiesRequest();
    expect(result).toEqual(fakeStudies);
  });

  it('lanza error cuando status != 200', async () => {
    mock.onGet(url).reply(503);
    await expect(fetchAllStudiesRequest()).rejects.toThrow(
      'Error 503 al obtener estudios'
    );
  });

  it('propaga errores de red', async () => {
    mock.onGet(url).networkError();
    await expect(fetchAllStudiesRequest()).rejects.toThrow();
  });
});
