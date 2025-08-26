import { useCallback, useEffect, useState } from 'react';
import {
  register,
  unregister,
  send as sendMessage,
  isSupported,
  get,
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
    setSupported(isSupported());
  }, []);

  const refresh = useCallback((): Promise<void> => {
    if (!supported) {
      return Promise.resolve();
    }

    setLoading(true);
    return get()
      .then(({ active: isActive, registration: reg }) => {
        setActive(isActive);
        setRegistration(reg);
        setError(null);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [supported]);

  const init = useCallback(
    async (path?: string, scope?: string): Promise<void> => {
      if (!supported) return;

      setLoading(true);
      try {
        const reg = await register(path, scope);
        setRegistration(reg);

        if (reg) {
          await navigator.serviceWorker.ready;
          const status = await get();
          setActive(status.active);
        }

        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
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

  useEffect(() => {
    if (auto && supported) {
      void refresh();
    }
  }, []);

  return {
    supported,
    registration,
    active,
    loading,
    error,
    init: init,
    close,
    send,
  };
};
