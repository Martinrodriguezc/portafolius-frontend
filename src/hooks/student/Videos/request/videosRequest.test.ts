import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../config/config', () => ({
  config: { SERVER_URL: 'http://testserver' }
}));

import { fetchStudyVideos } from './videosRequest';
import { Video } from '../../../../types/VideoTypes';

describe('fetchStudyVideos (axios)', () => {
  let mock: AxiosMockAdapter;
  const studyId = '123';
  const url = `http://testserver/study/${studyId}/videos`;

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
  });
  afterEach(() => mock.reset());
  afterAll(() => mock.restore());

  const makeVideo = (id: number): Video => ({
    id,
    study_id: Number(studyId),          
    object_key: `key${id}`,
    original_filename: `file${id}.mp4`,
    mime_type: 'video/mp4',
    size_bytes: 1024 * id,
    duration_seconds: 30 * id,
    upload_date: `2025-05-0${id}T0${id}:00:00Z`,
    order_index: id,
    status: 'READY',
    protocol: `protocol${id}`,
  });

  it('resuelve con clips si vienen en el campo clips', async () => {
    const fakeClips = [makeVideo(1), makeVideo(2)];
    mock.onGet(url).reply(200, { clips: fakeClips });

    const result = await fetchStudyVideos(studyId);
    expect(result).toEqual(fakeClips);
  });

  it('resuelve con videos si clips undefined', async () => {
    const fakeVideos = [makeVideo(3)];
    mock.onGet(url).reply(200, { videos: fakeVideos });

    const result = await fetchStudyVideos(studyId);
    expect(result).toEqual(fakeVideos);
  });

  it('resuelve [] si ni clips ni videos', async () => {
    mock.onGet(url).reply(200, {});
    const result = await fetchStudyVideos(studyId);
    expect(result).toEqual([]);
  });

  it('lanza error custom si status != 200', async () => {
    mock.onGet(url).reply(404);
    await expect(fetchStudyVideos(studyId)).rejects.toThrow(
      'Error 404 al obtener vídeos'
    );
  });

  it('propaga error de red si ocurre networkError', async () => {
    mock.onGet(url).networkError();
    await expect(fetchStudyVideos(studyId)).rejects.toThrow();
  });
});
