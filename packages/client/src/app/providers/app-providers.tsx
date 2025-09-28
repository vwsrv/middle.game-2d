import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '@/shared/ui/error-boundary/error-boundary';
import AppAi18NextProvider from '@/app/providers/app-ai18-next/app-ai-18-next.provider';
import { ServiceWorkerProvider } from '@/app/providers/servce-worker';
import { ThemeProvider } from './theme-provider/theme-provider';
import global_store from '@/shared/global-store/global-store';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ServiceWorkerProvider>
        <ThemeProvider>
          <Provider store={global_store}>
            <AppAi18NextProvider>{children}</AppAi18NextProvider>
          </Provider>
        </ThemeProvider>
      </ServiceWorkerProvider>
    </ErrorBoundary>
  );
};
