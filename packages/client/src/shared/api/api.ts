import axios, { type AxiosInstance } from 'axios';
import {
  requestInterceptor,
  successInterceptor,
  errorInterceptor,
} from './interceptors';

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);
