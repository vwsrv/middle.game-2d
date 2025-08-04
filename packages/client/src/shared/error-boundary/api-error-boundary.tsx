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
    (error: Error) => {
      if (error instanceof AxiosError) {
        const config = error.config as TRequestConfig;

        if (config?.ignoreAllErrors) {
          throw error;
        }

        if (config.ignoreErrorStatuses?.length) {
          if (config.ignoreErrorStatuses.includes(error.status as number)) {
            throw error;
          }
        }

        let description: string = error.message;

        if (typeof error.response?.data?.error?.message === 'string') {
          description = error.response.data.error.message;
        } else if (typeof error.response?.data?.error === 'string') {
          description = error.response.data.error;
        } else {
          description = error.message || `Request failed ${error.config?.url}`;
        }

        console.log(description);
        notification.error({
          message: t('error.api.title'),
          description,
        });

        throw error;
      }
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
