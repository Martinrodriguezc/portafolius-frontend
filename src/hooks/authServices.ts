import axios from "axios";
import { LoginFormData } from "../types/form/Login";
import { RegisterFormData } from "../types/form/Register";

const BACKEND_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

export const authService = {
  async login(credentials: LoginFormData) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/login`,
        credentials
      );

      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        const userData = { ...response.data };
        delete userData.token;
        delete userData.password;
        localStorage.setItem(USER_KEY, JSON.stringify(userData.user));
      }

      return response.data;
    } catch (error: unknown) {
      throw { msg: (error as Error).message };
    }
  },

  async register(userData: RegisterFormData) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/register`,
        userData
      );
      return response.data;
    } catch (error: unknown) {
      throw { msg: (error as Error).message };
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser() {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  initiateGoogleLogin() {
    window.location.href = `${BACKEND_URL}/auth/google`;
  },

  async handleGoogleCallback(code: string) {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/auth/google/callback?code=${code}`
      );

      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user.user));
      }

      return response.data;
    } catch (error: unknown) {
      throw { msg: (error as Error).message };
    }
  },

  async updateUserRole(role: string) {
    try {
      const currentUser = this.getCurrentUser();
      console.log("currentUser", currentUser);
      if (!currentUser) throw new Error("Usuario no encontrado");

      const response = await axios.put(
        `${BACKEND_URL}/users/${currentUser.id}`,
        {
          firstName: currentUser.first_name,
          lastName: currentUser.last_name,
          role: role.toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      if (response.data.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error: unknown) {
      console.error("Error al actualizar rol:", error);
      throw { msg: (error as Error).message };
    }
  },
};
