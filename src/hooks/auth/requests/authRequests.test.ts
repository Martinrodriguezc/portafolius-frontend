import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../config/config', () => ({
    config: { SERVER_URL: 'http://testserver' }
}));

import {
    loginRequest,
    registerRequest,
    initiateGoogleLoginRequest,
    handleGoogleCallbackRequest,
    updateUserRoleRequest,
    updateUserProfileRequest,
} from './authRequests';
import { AuthResponse } from '../../../types/User';

describe('authApi (axios)', () => {
    let mock: AxiosMockAdapter;

    beforeAll(() => {
        mock = new AxiosMockAdapter(axios);
    });
    afterEach(() => mock.reset());
    afterAll(() => mock.restore());

    const fakeAuth: AuthResponse = {
        token: 'abc123',
        user: { id: 'u1', first_name: 'Foo', last_name: 'Bar', email: 'foo@bar.com', role: 'USER' }
    };

    it('loginRequest() POST /auth/login', async () => {
        const creds = { email: 'a@b.com', password: 'pass' };
        mock.onPost('http://testserver/auth/login', creds).reply(200, fakeAuth);

        const res = await loginRequest(creds);
        expect(res.status).toBe(200);
        expect(res.data).toEqual(fakeAuth);
    });

    it('registerRequest() POST /auth/register', async () => {
        const userData = { firstName: 'A', lastName: 'B', email: 'a@b.com', password: '1234', role: 'user' };
        mock.onPost('http://testserver/auth/register', userData).reply(201, fakeAuth);

        const res = await registerRequest(userData);
        expect(res.status).toBe(201);
        expect(res.data).toEqual(fakeAuth);
    });

    it('initiateGoogleLoginRequest() devuelve URL correcta', () => {
        expect(initiateGoogleLoginRequest()).toBe(
            'http://testserver/auth/google'
        );
    });

    it('handleGoogleCallbackRequest() GET /auth/google/callback', async () => {
        const code = 'CODE123';
        mock
            .onGet(`http://testserver/auth/google/callback?code=${code}`)
            .reply(200, fakeAuth);

        const res = await handleGoogleCallbackRequest(code);
        expect(res.status).toBe(200);
        expect(res.data).toEqual(fakeAuth);
    });

    it('updateUserRoleRequest() PUT /users/:id con header Authorization', async () => {
        const userId = 'u1';
        const payload = { firstName: 'X', lastName: 'Y', role: 'ADMIN' };
        const token = 'tok123';
        const fakeUser = { user: { ...fakeAuth.user, role: 'ADMIN' } };

        mock
            .onPut(`http://testserver/users/${userId}`, payload)
            .reply(config => {
                expect(config.headers!['Authorization']).toBe(`Bearer ${token}`);
                return [200, fakeUser];
            });

        const res = await updateUserRoleRequest(userId, payload, token);
        expect(res.status).toBe(200);
        expect(res.data).toEqual(fakeUser);
    });

    it('updateUserProfileRequest() PUT /users/:id con header Authorization', async () => {
        const userId = 'u2';
        const payload = { firstName: 'New', email: 'new@x.com' };
        const token = 'tokXYZ';
        const fakeUser = { user: { ...fakeAuth.user, firstName: 'New', email: 'new@x.com' } };

        mock
            .onPut(`http://testserver/users/${userId}`, payload)
            .reply(config => {
                expect(config.headers!['Authorization']).toBe(`Bearer ${token}`);
                return [200, fakeUser];
            });

        const res = await updateUserProfileRequest(userId, payload, token);
        expect(res.status).toBe(200);
        expect(res.data).toEqual(fakeUser);
    });
});
