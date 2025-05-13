class MockFile extends Blob implements File {
  readonly name: string;
  readonly lastModified: number;
  readonly webkitRelativePath = "";

  constructor(
    chunks: BlobPart[],
    filename: string,
    options: FilePropertyBag = {}
  ) {
    super(chunks, options);
    this.name = filename;
    this.lastModified = options.lastModified ?? Date.now();
  }
}

declare global {
  namespace NodeJS {
    interface Global {
      File: typeof MockFile;
    }
  }
}

global.File = MockFile;

import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../config/logger', () => ({
  debug: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../../../config/config', () => ({
  config: { SERVER_URL: 'http://testserver' }
}));

jest.mock('../../auth/authServices', () => ({
  authService: { getCurrentUser: jest.fn() }
}));

import {
  generateUploadUrl,
  uploadVideo,
  assignTagsToClip,
} from './requests';
import { authService } from '../../auth/authServices';

describe('videoServiceRequests (axios)', () => {
  let mock: AxiosMockAdapter;
  const dummyFile = new File(['content'], 'video.mp4', {
    type: 'video/mp4',
  });

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
    (authService.getCurrentUser as jest.Mock).mockReturnValue({ id: 'u1' });
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('generateUploadUrl', () => {
    const endpoint = 'http://testserver/video/generate_upload_url';

    it('resuelve correctamente el uploadUrl y clipId', async () => {
      mock
        .onPost(endpoint, {
          userId: 'u1',
          fileName: dummyFile.name,
          contentType: dummyFile.type,
          studyId: 's1',
          sizeBytes: dummyFile.size,
          protocol: 'p1',
          tagsIds: [1, 2],
        })
        .reply(200, { uploadUrl: 'http://s3/upload', clipId: 99 });

      const result = await generateUploadUrl(dummyFile, 's1', 'p1', [1, 2]);
      expect(result).toEqual({ uploadUrl: 'http://s3/upload', clipId: 99 });
    });

    it('lanza error con message del backend en status !=200', async () => {
      mock.onPost(endpoint).reply(400, { message: 'Bad request' });
      await expect(generateUploadUrl(dummyFile, 's1', 'p1', [1])).rejects.toThrow(
        'Bad request'
      );
    });

    it('lanza error genérico si no hay message', async () => {
      mock.onPost(endpoint).reply(500, {});
      await expect(generateUploadUrl(dummyFile, 's1', 'p1', [1])).rejects.toThrow(
        'Error al obtener la URL prefirmada'
      );
    });

    it('propaga error de red', async () => {
      mock.onPost(endpoint).networkError();
      await expect(generateUploadUrl(dummyFile, 's1', 'p1', [])).rejects.toThrow();
    });
  });

  describe('uploadVideo', () => {
    const uploadUrl = 'http://s3/upload';

    it('resuelve success=true en 2xx', async () => {
      mock.onPut(uploadUrl).reply(204);
      const res = await uploadVideo(uploadUrl, dummyFile);
      expect(res).toEqual({
        success: true,
        message: 'Archivo subido correctamente',
      });
    });

    it('lanza error con message del backend en fallo', async () => {
      mock.onPut(uploadUrl).reply(400, { message: 'S3 error' });
      await expect(uploadVideo(uploadUrl, dummyFile)).rejects.toThrow('S3 error');
    });

    it('propaga error de red', async () => {
      mock.onPut(uploadUrl).networkError();
      await expect(uploadVideo(uploadUrl, dummyFile)).rejects.toThrow();
    });
  });

  describe('assignTagsToClip', () => {
    const endpoint = 'http://testserver/video/123/tags';

    it('no lanza en 200', async () => {
      mock.onPost(endpoint, { tagIds: [1, 2], userId: 'u1' }).reply(200);
      await expect(assignTagsToClip(123, [1, 2], 'u1')).resolves.toBeUndefined();
    });

    it('lanza error si status !=200', async () => {
      mock.onPost(endpoint).reply(403);
      await expect(assignTagsToClip(123, [], 'u1')).rejects.toThrow(
        'Error 403 al asignar etiquetas al clip'
      );
    });

    it('propaga error de red', async () => {
      mock.onPost(endpoint).networkError();
      await expect(assignTagsToClip(123, [], 'u1')).rejects.toThrow();
    });
  });
});
