import { I18nextProvider } from 'react-i18next';
import i18n from '@/shared/i18n/i18n';
import { PropsWithChildren } from 'react';

const AppAI18NextProvider = ({ children }: PropsWithChildren) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default AppAI18NextProvider;
