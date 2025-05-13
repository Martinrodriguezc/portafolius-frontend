jest.mock('../../../../config/config', () => ({
    config: {
      SERVER_URL: 'http://testserver'
    }
  }));
  
  import axios from 'axios';
  import AxiosMockAdapter from 'axios-mock-adapter';
  import { fetchStudentMaterials } from './materialsRequest';
  import { Material } from '../../../../types/material';
  
  describe('fetchStudentMaterials', () => {
    let mock: AxiosMockAdapter;
  
    beforeAll(() => {
      mock = new AxiosMockAdapter(axios);
    });
  
    afterEach(() => mock.reset());
    afterAll(() => mock.restore());
  
    it('resuelve con array de Material cuando el servidor responde 200', async () => {
      const fakeMaterials: Material[] = [
        {
          id: 1,
          student_id: 42,
          type: 'document',
          title: 'Anatomía Básica',
          description: 'PDF con conceptos básicos',
          url: 'http://example.com/anatomia.pdf',
          size_bytes: 123456,
          mime_type: 'application/pdf',
          uploaded_at: '2025-05-01T12:00:00Z',
          documents: [], videos: null, links: null
        }
      ];
  
      const url = `http://testserver/materials/student/42/`;
      mock.onGet(url).reply(200, fakeMaterials);
  
      const result = await fetchStudentMaterials(42);
      expect(result).toEqual(fakeMaterials);
      expect(mock.history.get[0].url).toBe(url);
    });
  
    it('lanza si el servidor responde error', async () => {
      const url = `http://testserver/materials/student/99/`;
      mock.onGet(url).reply(500);
      await expect(fetchStudentMaterials(99)).rejects.toThrow();
    });
  });
  