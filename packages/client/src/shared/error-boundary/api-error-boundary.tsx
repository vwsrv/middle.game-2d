import { PropsWithChildren, ReactNode, useCallback, useEffect } from 'react';
import { useTranslation } from '@/shared/i18n';
import { TRequestConfig } from '@/shared/types/api.type';
import { AxiosError } from 'axios';
import { api } from '../api';
import { notification } from 'antd';

export const ApiErrorBoundary = ({
  children,
}: PropsWithChildren): ReactNode => {
  const { t } = useTranslation();

  const errorHandler = useCallback(
    (error: AxiosError) => {
      const config = error.config as TRequestConfig;

      if (config?.ignoreAllErrors) {
        throw error;
      }

      if (config.ignoreErrorStatuses?.length) {
        if (
          config.ignoreErrorStatuses.includes(error.response?.status as number)
        ) {
          throw error;
        }
      }

      let description: string = error.message;

      if (error.response?.data && typeof error.response.data === 'object') {
        const responseData = error.response.data as any;
        if (typeof responseData.error?.message === 'string') {
          description = responseData.error.message;
        } else if (typeof responseData.error === 'string') {
          description = responseData.error;
        } else {
          description = error.message || `Request failed ${error.config?.url}`;
        }
      } else {
        description = error.message || `Request failed ${error.config?.url}`;
      }

      console.log(description);
      notification.error({
        message: t('error.api.title'),
        description,
      });

      throw error;
    },
    [t],
  );

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      undefined,
      errorHandler,
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [errorHandler]);

  return children;
};
