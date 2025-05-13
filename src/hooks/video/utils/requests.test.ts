import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../config/config', () => ({
    config: { SERVER_URL: 'http://testserver' }
}));

import { fetchVideoUrl, fetchVideoMeta, postComment } from './requests';
import { Video } from '../../../types/VideoTypes';

describe('videoRequests (axios)', () => {
    let mock: AxiosMockAdapter;
    const videoId = 'vid123';
    const baseUrl = 'http://testserver/video';

    const makeVideo = (): Video => ({
        id: 1,
        study_id: 10,
        object_key: 'key.mp4',
        original_filename: 'video.mp4',
        mime_type: 'video/mp4',
        size_bytes: 2048,
        duration_seconds: 120,
        upload_date: '2025-05-12T08:00:00Z',
        order_index: 0,
        status: 'READY',
        protocol: 'HLS'
    });

    beforeAll(() => {
        mock = new AxiosMockAdapter(axios);
    });
    afterEach(() => mock.reset());
    afterAll(() => mock.restore());

    describe('fetchVideoUrl', () => {
        it('resolves downloadUrl on 200', async () => {
            mock
                .onGet(`${baseUrl}/generate_download_url/${videoId}`)
                .reply(200, { downloadUrl: 'http://cdn/video.mp4' });

            await expect(fetchVideoUrl(videoId)).resolves.toBe('http://cdn/video.mp4');
        });

        it('throws custom error on non-200', async () => {
            mock.onGet(`${baseUrl}/generate_download_url/${videoId}`).reply(404);
            await expect(fetchVideoUrl(videoId)).rejects.toThrow(
                'Error 404 al obtener la URL de descarga'
            );
        });
    });

    describe('fetchVideoMeta', () => {
        it('resolves Video object on 200', async () => {
            const fakeVideo = makeVideo();
            mock.onGet(`${baseUrl}/${videoId}/meta`).reply(200, { video: fakeVideo });

            await expect(fetchVideoMeta(videoId)).resolves.toEqual(fakeVideo);
        });

        it('throws custom error on non-200', async () => {
            mock.onGet(`${baseUrl}/${videoId}/meta`).reply(500);
            await expect(fetchVideoMeta(videoId)).rejects.toThrow(
                'Error 500 obteniendo metadatos'
            );
        });
    });

    describe('postComment', () => {
        const commentText = 'Great video!';
        it('resolves on 201 status', async () => {
            mock
                .onPost(`${baseUrl}/${videoId}/comments`, { text: commentText })
                .reply(201);

            await expect(postComment(videoId, commentText)).resolves.toBeUndefined();
        });

        it('throws custom error on non-200/201', async () => {
            mock
                .onPost(`${baseUrl}/${videoId}/comments`, { text: commentText })
                .reply(400);
            await expect(postComment(videoId, commentText)).rejects.toThrow(
                'Error 400 al enviar el comentario'
            );
        });

        it('propagates network errors', async () => {
            mock
                .onPost(`${baseUrl}/${videoId}/comments`, { text: commentText })
                .networkError();
            await expect(postComment(videoId, commentText)).rejects.toThrow();
        });
    });
});
