import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('../../../../config/config', () => ({
    config: { SERVER_URL: 'http://testserver' }
}));

jest.mock('../../../auth/authServices', () => ({
    authService: {
        getToken: jest.fn(),
        updateUserProfile: jest.fn(),
    }
}));

import {
    fetchUserProfileRequest,
    updateUserProfileRequest,
} from './profileRequest';
import { authService } from '../../../auth/authServices';
import { UserProfile } from '../../../../types/User';

describe('userProfileRequests (axios)', () => {
    let mock: AxiosMockAdapter;
    const userId = 33;
    const profileUrl = `http://testserver/users/${userId}`;

    const rawProfile: any = {
        id: '33',
        first_name: 'María',
        last_name: 'González',
        email: 'maria@ejemplo.cl',
        role: 'estudiante',
    };
    const parsedProfile: UserProfile = {
        id: 33,
        first_name: 'María',
        last_name: 'González',
        email: 'maria@ejemplo.cl',
        role: 'estudiante',
    };

    beforeAll(() => {
        mock = new AxiosMockAdapter(axios);
    });
    afterEach(() => {
        mock.reset();
        jest.clearAllMocks();
    });
    afterAll(() => mock.restore());

    describe('fetchUserProfileRequest', () => {
        it('resuelve perfil con id numérico cuando status 200', async () => {
            (authService.getToken as jest.Mock).mockReturnValue('tok123');
            mock.onGet(profileUrl).reply(200, rawProfile);

            const result = await fetchUserProfileRequest(userId);
            expect(result).toEqual(parsedProfile);
            expect(mock.history.get[0].headers!['Authorization']).toBe(
                'Bearer tok123'
            );
        });

        it('lanza error si status != 200', async () => {
            (authService.getToken as jest.Mock).mockReturnValue('tok123');
            mock.onGet(profileUrl).reply(404);
            await expect(fetchUserProfileRequest(userId)).rejects.toThrow(
                'Error 404 al cargar perfil'
            );
        });
    });

    describe('updateUserProfileRequest', () => {
        const updates = { first_name: 'Ana', email: 'ana@nueva.cl' };
        const returnedProfile: any = {
            id: '33',
            ...updates,
            last_name: 'González',
            email: 'ana@nueva.cl',
            role: 'admin',
        };
        const expectedProfile: UserProfile = {
            id: 33,
            first_name: 'Ana',
            last_name: 'González',
            email: 'ana@nueva.cl',
            role: 'admin',
        };

        it('resuelve con perfil actualizado y convierte id', async () => {
            (authService.updateUserProfile as jest.Mock).mockResolvedValueOnce(
                returnedProfile
            );

            const result = await updateUserProfileRequest(updates);
            expect(result).toEqual(expectedProfile);
            expect(authService.updateUserProfile).toHaveBeenCalledWith(updates);
        });

        it('lanza error si no viene role en la respuesta', async () => {
            const badProfile = { id: '33', firstName: 'X' };
            (authService.updateUserProfile as jest.Mock).mockResolvedValueOnce(
                badProfile
            );
            await expect(updateUserProfileRequest(updates)).rejects.toThrow(
                'Role no recibido al actualizar perfil'
            );
        });
    });
});
