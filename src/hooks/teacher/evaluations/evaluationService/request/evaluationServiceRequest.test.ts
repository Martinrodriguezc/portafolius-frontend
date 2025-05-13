import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

jest.mock('../../../../../config/config', () => ({
  config: { SERVER_URL: 'http://testserver' }
}));

import {
  fetchAllEvaluations,
  createEvaluationRequest,
  fetchEvaluationByStudyId,
  updateEvaluationRequest,
} from './evaluationServiceRequest';
import { EvaluationForm } from '../../../../../types/evaluation';

describe('evaluationRequests (axios)', () => {
  let mock: AxiosMockAdapter;
  const fakeEval: EvaluationForm = {
    id: 1,
    study_id: 2,
    teacher_id: 3,
    submitted_at: '2025-05-12T10:00:00Z',
    score: 5,
    feedback_summary: '¡Perfecto!',
  };

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
    // Ahora existe global.localStorage.setItem
    localStorage.setItem('auth_token', 'tok123');
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  afterAll(() => {
    mock.restore();
    localStorage.clear();
  });

  it('fetchAllEvaluations() resuelve el array', async () => {
    mock.onGet('http://testserver/evaluations').reply(200, {
      evaluations: [fakeEval],
    });
    const res = await fetchAllEvaluations();
    expect(res).toEqual([fakeEval]);
  });

  it('fetchAllEvaluations() lanza HTTP 500', async () => {
    mock.onGet('http://testserver/evaluations').reply(500);
    await expect(fetchAllEvaluations()).rejects.toThrow('HTTP 500');
  });

  it('createEvaluationRequest() POST /evaluations/:id', async () => {
    const studyId = fakeEval.study_id;
    mock
      .onPost(`http://testserver/evaluations/${studyId}`, {
        score: fakeEval.score,
        feedback_summary: fakeEval.feedback_summary,
      })
      .reply(201, fakeEval);

    const res = await createEvaluationRequest(
      studyId,
      fakeEval.score,
      fakeEval.feedback_summary
    );
    expect(res).toEqual(fakeEval);
  });

  it('createEvaluationRequest() lanza HTTP 400', async () => {
    mock.onPost(/\/evaluations\/\d+/).reply(400);
    await expect(
      createEvaluationRequest(99, 1, 'malo')
    ).rejects.toThrow('HTTP 400');
  });

  it('fetchEvaluationByStudyId() GET /evaluations/by-study/:id', async () => {
    const studyId = fakeEval.study_id;
    mock
      .onGet(`http://testserver/evaluations/by-study/${studyId}`)
      .reply(200, { evaluation: fakeEval });

    const res = await fetchEvaluationByStudyId(studyId);
    expect(res).toEqual(fakeEval);
  });

  it('fetchEvaluationByStudyId() lanza HTTP 404', async () => {
    mock.onGet(/\/by-study\/\d+/).reply(404);
    await expect(fetchEvaluationByStudyId(123)).rejects.toThrow('HTTP 404');
  });

  it('updateEvaluationRequest() PUT /:id', async () => {
    const id = fakeEval.id;
    mock
      .onPut(`http://testserver/${id}`, {
        score: fakeEval.score,
        feedback_summary: fakeEval.feedback_summary,
      })
      .reply(200, fakeEval);

    const res = await updateEvaluationRequest(
      id,
      fakeEval.score,
      fakeEval.feedback_summary
    );
    expect(res).toEqual(fakeEval);
  });

  it('updateEvaluationRequest() lanza HTTP 403', async () => {
    mock.onPut(/\/\d+/).reply(403);
    await expect(updateEvaluationRequest(5, 2, 'x')).rejects.toThrow(
      'HTTP 403'
    );
  });
});
