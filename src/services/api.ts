import axios from 'axios';
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from '../types';

const BASE_URL = 'https://api.escuelajs.co/api/v1/auth';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    console.log("credentials........",credentials)
    const response = await api.post<LoginResponse>('/login', credentials);
    console.log("response......",response.data)
    return response.data;
  },

  signUp: async (userData: SignUpRequest): Promise<SignUpResponse> => {
    const response = await api.post<SignUpResponse>('/register', userData);
    return response.data;
  },
};
