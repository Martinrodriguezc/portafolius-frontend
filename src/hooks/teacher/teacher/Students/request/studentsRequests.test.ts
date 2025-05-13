import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../../config/config', () => ({
  config: { SERVER_URL: 'http://testserver' }
}));

import { fetchTeacherStudents } from './studentsRequests';
import { TeacherStudent } from '../../../../../types/student';

describe('fetchTeacherStudents (axios)', () => {
  let mock: AxiosMockAdapter;
  const teacherId = 42;
  const url = `http://testserver/teacher/${teacherId}/students`;

  const fakeStudents: TeacherStudent[] = [
    {
      id: 1,
      first_name: 'Ana',
      last_name: 'Pérez',
      email: 'ana.perez@example.com',
      created_at: '2025-05-01T09:00:00Z',
      studies: 3,
      average_score: 92.5,
      last_activity: '2025-05-10T12:00:00Z',
    },
    {
      id: 2,
      first_name: 'Luis',
      last_name: 'Gómez',
      email: 'luis.gomez@example.com',
      created_at: '2025-05-02T10:30:00Z',
      studies: 5,
      average_score: 85.0,
      last_activity: '2025-05-11T14:15:00Z',
    },
  ];

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
  });

  afterEach(() => mock.reset());
  afterAll(() => mock.restore());

  it('resuelve con el array de estudiantes cuando status 200', async () => {
    mock.onGet(url).reply(200, { students: fakeStudents });

    const result = await fetchTeacherStudents(teacherId);
    expect(result).toEqual(fakeStudents);
  });

  it('lanza error cuando status != 200', async () => {
    mock.onGet(url).reply(403);

    await expect(fetchTeacherStudents(teacherId)).rejects.toThrow(
      'Error 403 al obtener estudiantes'
    );
  });

  it('propaga errores de red', async () => {
    mock.onGet(url).networkError();

    await expect(fetchTeacherStudents(teacherId)).rejects.toThrow();
  });
});
