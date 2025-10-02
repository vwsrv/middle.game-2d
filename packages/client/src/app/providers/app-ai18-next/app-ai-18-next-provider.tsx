import { I18nextProvider } from 'react-i18next';
import i18n from '@/shared/i18n/i18n';
import { PropsWithChildren, useEffect } from 'react';
import { useSSRConfig } from '@/shared/contexts/ssr-context';

const AppAi18NextProvider = ({ children }: PropsWithChildren) => {
  const { language } = useSSRConfig();

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    } else {
      console.error('i18n keepLanguage', { language });
    }
  }, [language]);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default AppAi18NextProvider;
