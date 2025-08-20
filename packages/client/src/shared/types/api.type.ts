import { AxiosRequestConfig } from 'axios';

export type TRequestConfig = AxiosRequestConfig & {
  ignoreXHeaders?: boolean;
  ignoreErrorStatuses?: number[];
  ignoreAllErrors?: boolean;
};
