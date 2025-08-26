import {
  type AxiosError,
  type AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { GLOBAL_STORE_KEY } from '@/shared/constants/store/store-key.constant';
import { getItem } from '@/utils/local-storage';
import { IGlobalStore } from '@/shared/global-store/global-store.interface';
import { TRequestConfig } from '@/shared/types/api.type';

export interface IConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const storeData = getItem<{
    state: IGlobalStore;
  }>(GLOBAL_STORE_KEY);
  const state = storeData?.state;

  if (state?.accessToken) {
    config.headers?.set('X-Token', state.accessToken);
  }

  if ((config as TRequestConfig).ignoreXHeaders) {
    config.headers?.set('X-Token', undefined);
    config.headers?.set('X-App-Version', undefined);
    config.headers?.set('X-App-Type', undefined);
  }

  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response?.status === 401) {
    await Promise.reject(error);
  } else {
    if (error.response) {
      const errorMessage: IConsoleError = {
        status: error.response.status,
        data: error.response.data,
      };
      console.error(errorMessage);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    await Promise.reject(error);
  }
};
