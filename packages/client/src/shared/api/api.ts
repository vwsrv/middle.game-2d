import axios, { type AxiosInstance } from 'axios';
import { successInterceptor, errorInterceptor } from './interceptors';

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(successInterceptor, errorInterceptor);
