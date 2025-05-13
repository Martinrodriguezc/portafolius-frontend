import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../../config/config', () => ({
  config: { SERVER_URL: 'http://testserver' }
}));

import {
  fetchPendingEvaluations,
  fetchCompletedEvaluations,
} from './evaluationRequest';
import { Evaluation } from '../../../../../types/evaluation';

describe('evaluationServiceRequest (axios)', () => {
  let mock: AxiosMockAdapter;
  const teacherId = 7;

  const fakePending: Evaluation[] = [
    {
      id: 1,
      student: 'Alice',
      protocol: 'P1',
      videos: 2,
      tags: ['intro'],
      date: '2025-05-11',
      score: undefined,
    },
  ];
  const fakeCompleted: Evaluation[] = [
    {
      id: 2,
      student: 'Bob',
      protocol: 'P2',
      videos: 3,
      tags: ['adv','test'],
      date: '2025-05-10',
      score: 95,
    },
  ];

  beforeAll(() => {
    mock = new AxiosMockAdapter(axios);
  });
  afterEach(() => mock.reset());
  afterAll(() => mock.restore());

  it('fetchPendingEvaluations() resuelve el array pending', async () => {
    mock
      .onGet(`http://testserver/teacher/${teacherId}/evaluations/pending`)
      .reply(200, { pending: fakePending });

    const result = await fetchPendingEvaluations(teacherId);
    expect(result).toEqual(fakePending);
  });

  it('fetchPendingEvaluations() lanza error si status != 200', async () => {
    mock
      .onGet(`http://testserver/teacher/${teacherId}/evaluations/pending`)
      .reply(404);

    await expect(fetchPendingEvaluations(teacherId)).rejects.toThrow(
      `Error 404 al obtener pendientes`
    );
  });

  it('fetchCompletedEvaluations() resuelve el array completed', async () => {
    mock
      .onGet(`http://testserver/teacher/${teacherId}/evaluations/completed`)
      .reply(200, { completed: fakeCompleted });

    const result = await fetchCompletedEvaluations(teacherId);
    expect(result).toEqual(fakeCompleted);
  });

  it('fetchCompletedEvaluations() lanza error si status != 200', async () => {
    mock
      .onGet(`http://testserver/teacher/${teacherId}/evaluations/completed`)
      .reply(500);

    await expect(fetchCompletedEvaluations(teacherId)).rejects.toThrow(
      `Error 500 al obtener completadas`
    );
  });
});
