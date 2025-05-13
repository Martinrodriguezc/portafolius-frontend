import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../../config/config', () => ({
  config: { SERVER_URL: 'http://testserver' }
}));

jest.mock('../../../../auth/authServices', () => ({
  authService: { getToken: jest.fn() }
}));

import { fetchTeacherVideos } from './videoRequests';
import { TeacherVideo } from '../../../../../types/VideoTypes';
import { authService } from '../../../../auth/authServices';

describe('fetchTeacherVideos (axios)', () => {
  let mock: AxiosMockAdapter;
  const teacherId = 7;
  const url = `http://testserver/teacher/${teacherId}/videos`;

  const makeVideo = (id: number): TeacherVideo => ({
    id,
    study_id: id * 10,
    original_filename: `video${id}.mp4`,
    upload_date: `2025-05-0${id}T0${id}:00:00Z`,
    duration_seconds: id * 15,
    evaluated_at: id % 2 === 0 ? `2025-05-1${id}T0${id}:00:00Z` : undefined,
    score: id % 2 === 0 ? id * 10 : undefined,
  });

  const fakePending = [makeVideo(1), makeVideo(3)];
  const fakeEvaluated = [makeVideo(2), makeVideo(4)];

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
    await expect(fetchTeacherVideos(teacherId)).rejects.toThrow('No autorizado');
  });

  it('lanza error si status != 200', async () => {
    (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
    mock.onGet(url).reply(404);
    await expect(fetchTeacherVideos(teacherId)).rejects.toThrow(
      'Error 404 al obtener vídeos'
    );
  });

  it('resuelve con objetos pending y evaluated cuando status 200', async () => {
    (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
    mock.onGet(url).reply(200, { pending: fakePending, evaluated: fakeEvaluated });

    const result = await fetchTeacherVideos(teacherId);
    expect(result.pending).toEqual(fakePending);
    expect(result.evaluated).toEqual(fakeEvaluated);
  });

  it('propaga errores de red', async () => {
    (authService.getToken as jest.Mock).mockReturnValueOnce('tok');
    mock.onGet(url).networkError();
    await expect(fetchTeacherVideos(teacherId)).rejects.toThrow();
  });
});
