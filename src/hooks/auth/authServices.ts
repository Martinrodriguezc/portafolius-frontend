import {
  loginRequest,
  registerRequest,
  initiateGoogleLoginRequest,
  handleGoogleCallbackRequest,
  updateUserRoleRequest,
  updateUserProfileRequest,
} from "./requests/authRequests";
import { LoginFormData } from "../../types/login";
import { RegisterFormData } from "../../types/register";
import { AuthResponse, UserProps } from "../../types/UserProps";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

export const authService = {
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    const { data } = await loginRequest(credentials);
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    return data;
  },

  async register(userData: RegisterFormData): Promise<AuthResponse> {
    const { data } = await registerRequest(userData);
    return data;
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser(): UserProps | null {
    const str = localStorage.getItem(USER_KEY);
    return str ? (JSON.parse(str) as UserProps) : null;
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  initiateGoogleLogin(): void {
    window.location.href = initiateGoogleLoginRequest();
  },

  async handleGoogleCallback(code: string): Promise<AuthResponse> {
    const { data } = await handleGoogleCallbackRequest(code);
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    return data;
  },

  async updateUserRole(role: string): Promise<{ user: UserProps }> {
    const user = this.getCurrentUser();
    if (!user) throw new Error("Usuario no encontrado");
    const token = this.getToken()!;
    const { data } = await updateUserRoleRequest(
      user.id,
      {
        firstName: user.first_name,
        lastName: user.last_name,
        role: role.toLowerCase(),
      },
      token
    );
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data;
  },

  async updateUserProfile(payload: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }): Promise<UserProps> {
    const user = this.getCurrentUser();
    if (!user) throw new Error("Sesión vencida");
    const token = this.getToken()!;
    const { data } = await updateUserProfileRequest(user.id, payload, token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    window.dispatchEvent(new CustomEvent("userUpdated", { detail: data.user }));
    return data.user;
  },
};
