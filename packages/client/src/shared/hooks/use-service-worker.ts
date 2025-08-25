import { useCallback, useEffect, useState } from 'react';
import {
  register,
  unregister,
  send as sendMessage,
} from '@/utils/service-worker.util';

interface IProps {
  supported: boolean;
  registration: ServiceWorkerRegistration | null;
  active: boolean;
  loading: boolean;
  error: Error | null;

  init: (path?: string, scope?: string) => Promise<void>;
  close: () => Promise<void>;
  send: (message: unknown) => Promise<void>;
}

export const useServiceWorker = (auto = true): IProps => {
  const [supported, setSupported] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkSupport = () => {
      const isSupportedResult = 'serviceWorker' in navigator;
      setSupported(isSupportedResult);

      if (isSupportedResult && auto) {
        initServiceWorker();
      }
    };

    checkSupport();
  }, [auto]);

  const initServiceWorker = useCallback(
    (path = './sw.js', scope = '/') => {
      if (!supported) {
        return Promise.resolve();
      }

      setLoading(true);
      setError(null);

      return register(path, scope)
        .then(reg => {
          setRegistration(reg);

          if (reg) {
            const checkActive = () => {
              setActive(reg.active?.state === 'activated');
            };

            checkActive();

            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', checkActive);
              }
            });
          }
        })
        .catch(err => {
          setError(err as Error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [supported],
  );

  const close = useCallback(() => {
    if (!supported) {
      return Promise.resolve();
    }

    return unregister()
      .then(success => {
        if (success) {
          setRegistration(null);
          setActive(false);
        }
      })
      .catch(err => {
        setError(err as Error);
      });
  }, [supported]);

  const send = useCallback(
    (message: unknown) => {
      if (!supported || !registration) {
        return Promise.resolve();
      }

      return sendMessage(message).catch(err => {
        setError(err as Error);
      });
    },
    [supported, registration],
  );

  return {
    supported,
    registration,
    active,
    loading,
    error,
    init: initServiceWorker,
    close,
    send,
  };
};
