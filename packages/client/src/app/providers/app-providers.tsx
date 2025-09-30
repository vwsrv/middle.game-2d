import { FC, ReactNode } from 'react';
import ErrorBoundary from '@/shared/ui/error-boundary/error-boundary';
import AppAi18NextProvider from '@/app/providers/app-ai18-next/app-ai-18-next.provider';
import { ServiceWorkerProvider } from '@/app/providers/servce-worker';
import { ThemeProvider } from './theme-provider/theme-provider';
import { SSRProvider } from '@/shared/contexts/ssr-context';
import { SSRConfig } from '@/shared/contexts/ssr-context';

interface AppProvidersProps {
  children: ReactNode;
  config?: SSRConfig;
}

export const AppProviders: FC<AppProvidersProps> = ({ children, config }) => {
  return (
    <ErrorBoundary>
      <ServiceWorkerProvider>
        <SSRProvider
          config={
            config || {
              isServer: false,
              isDarkMode: false,
              isMobile: false,
              language: 'ru',
              currentYear: new Date().getFullYear(),
            }
          }>
          <ThemeProvider>
            <AppAi18NextProvider>{children}</AppAi18NextProvider>
          </ThemeProvider>
        </SSRProvider>
      </ServiceWorkerProvider>
    </ErrorBoundary>
  );
};
