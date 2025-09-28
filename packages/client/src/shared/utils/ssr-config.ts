import { SSRConfig } from '../contexts/ssr-context';

export const createServerConfig = (): SSRConfig => {
  const year = new Date().getFullYear();

  return {
    isServer: true,
    isDarkMode: false,
    isMobile: false,
    language: 'ru',
    currentYear: year,
  };
};

/**
 * Создает конфиг для клиентского рендеринга
 * На первом рендере значения должны совпадать с SSR.
 */
export const createClientConfig = (): SSRConfig => {
  const year = new Date().getFullYear();

  return {
    isServer: false,
    isDarkMode: false,
    isMobile: false,
    language: 'ru',
    currentYear: year,
  };
};
