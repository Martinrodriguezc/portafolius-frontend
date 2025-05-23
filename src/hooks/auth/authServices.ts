import {
  loginRequest,
  registerRequest,
  initiateGoogleLoginRequest,
  handleGoogleCallbackRequest,
  updateUserRoleRequest,
  updateUserProfileRequest,
} from "./requests/authRequests";
import { LoginFormData } from "../../types/form/Login";
import { RegisterFormData } from "../../types/form/Register";
import { AuthResponse, UserProps } from "../../types/User";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

export const authService = {
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    const { data } = await loginRequest(credentials);
    if (data.token) {
      try {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      } catch {
      }
    }
    return data;
  },

  async register(userData: RegisterFormData): Promise<AuthResponse> {
    const { data } = await registerRequest(userData);
    return data;
  },

  logout(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
    }
  },

  getCurrentUser(): UserProps | null {
    try {
      const str = localStorage.getItem(USER_KEY);
      return str ? (JSON.parse(str) as UserProps) : null;
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  initiateGoogleLogin(): void {
    window.location.href = initiateGoogleLoginRequest();
  },

  async handleGoogleCallback(code: string): Promise<AuthResponse> {
    const { data } = await handleGoogleCallbackRequest(code);
    if (data.token) {
      try {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      } catch {
      }
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
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    } catch {
    }
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
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    } catch {
    }
    window.dispatchEvent(new CustomEvent("userUpdated", { detail: data.user }));
    return data.user;
  },
};