import axios from 'axios';
import { LoginFormData } from '../types/login';
import { RegisterFormData } from '../types/register';

const API_URL = "http://localhost:3000";


const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const authService = {
  async login(credentials: LoginFormData) {
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials);
      
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
      const response = await axios.post(`${API_URL}/users/register`, userData);
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
  }
};