import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../../config/config', () => ({
  config: { SERVER_URL: 'http://testserver' }
}));

import { fetchStudentStudies } from './studentStudiesRequest';
import { Study } from '../../../../../types/Study';

describe('fetchStudentStudies (axios)', () => {
  let mock: AxiosMockAdapter;
  const studentId = 55;
  const url = `http://testserver/study/${studentId}`;
  const fakeStudies: Study[] = [
    {
      id: 1,
      title: 'Estudio 1',
      description: 'Descripción 1',
      status: 'PENDIENTE',
      created_at: '2025-05-12T09:00:00Z',
      score: 85
    },
    {
      id: 2,
      title: 'Estudio 2',
      description: 'Descripción 2',
      status: 'EVALUADO',
      created_at: '2025-05-10T14:30:00Z',
      score: null
    }
  ];

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
  });
  afterEach(() => mock.reset());
  afterAll(() => mock.restore());

  it('resuelve con el array de estudios cuando status 200', async () => {
    mock.onGet(url).reply(200, { studies: fakeStudies });
    const result = await fetchStudentStudies(studentId);
    expect(result).toEqual(fakeStudies);
  });

  it('lanza error cuando status != 200', async () => {
    mock.onGet(url).reply(403);
    await expect(fetchStudentStudies(studentId)).rejects.toThrow(
      'Error 403 al obtener estudios'
    );
  });

  it('propaga errores de red', async () => {
    mock.onGet(url).networkError();
    await expect(fetchStudentStudies(studentId)).rejects.toThrow();
  });
});
