import { notification } from 'antd';

export const isSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

export const register = (
  path = './sw.js',
  scope = '/',
): Promise<ServiceWorkerRegistration | null> => {
  if (!isSupported()) {
    notification.error({
      message: 'Предупреждение',
      description: 'Оффлайн-работа приложения невозможна',
    });
    return Promise.resolve(null);
  }

  return navigator.serviceWorker
    .register(path, { scope })
    .then(reg => {
      notification.success({
        message: 'ServiceWorker запущен успешно',
      });
      return reg;
    })
    .catch(error => {
      console.error('Ошибка регистрации Service Worker:', error);
      notification.error({
        message: 'Ошибка',
        description: 'Не удалось запустить ServiceWorker',
      });
      return null;
    });
};

export const get = (): Promise<{
  active: boolean;
  registration: ServiceWorkerRegistration | null;
}> => {
  if (!isSupported()) {
    return Promise.resolve({ active: false, registration: null });
  }

  return navigator.serviceWorker.ready
    .then(registration => ({
      active: registration.active?.state === 'activated',
      registration,
    }))
    .catch(() => ({
      active: false,
      registration: null,
    }));
};

export const unregister = (): Promise<boolean> => {
  if (!isSupported()) return Promise.resolve(false);

  return navigator.serviceWorker.ready
    .then(reg => reg.unregister())
    .then(res => res)
    .catch(error => {
      console.error('Ошибка удаления Service Worker:', error);
      return false;
    });
};

export const send = (message: unknown): Promise<void> => {
  if (!navigator.serviceWorker.controller) {
    return Promise.resolve();
  }

  navigator.serviceWorker.controller.postMessage(message);
  return Promise.resolve();
};
