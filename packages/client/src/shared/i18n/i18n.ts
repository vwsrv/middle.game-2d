import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enJSON from '../constants/locales/en.json';
import ruJSON from '../constants/locales/ru.json';

const resources = {
  en: { translation: enJSON },
  ru: { translation: ruJSON },
};

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  i18n.use(LanguageDetector);
}

i18n.use(initReactI18next).init({
  fallbackLng: 'ru',
  lng: 'ru',
  debug: true,
  resources,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  initImmediate: false,
});

export default i18n;
