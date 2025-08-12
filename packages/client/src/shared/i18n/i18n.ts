import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enJSON from '../constants/locales/en.json';
import ruJSON from '../constants/locales/ru.json';

const resources = {
  en: { translation: enJSON },
  ru: { translation: ruJSON },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
